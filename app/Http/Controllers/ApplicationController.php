<?php

namespace App\Http\Controllers;

use App\Mail\SimpleMail;
use App\Models\Application;
use App\Models\District;
use App\Models\Hamlet;
use App\Models\Menu;
use App\Support\MyUploadFile;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use mervick\aesEverywhere\AES256;

use function App\Support\kirimEmail;

class ApplicationController extends Controller
{
    private $up;

    public function __construct()
    {
        $this->up = new MyUploadFile();
    }

    public function downloadFile(Request $request)
    {
        $filename = $request->place;

        // dd($filename);
        if (!Storage::disk('public')->exists($filename)) {
            abort(404);
        }
        // return response()->download(storage_path('app/public/' . $filename));
        return response()->download(Storage::disk('public')->path($filename));
    }

    public function dashboard()
    {
        $user = Auth::user();
        $categories = DB::table('applications')
            ->when($user->role == 'desa', function ($query) {
                $user = Auth::user();
                $query->where('ward', $user->ddesa->name);
                $query->whereNotNull('hamlet');
                return $query->where('hamlet', '');
            })
            ->select('category')
            ->distinct()
            ->pluck('category')
            ->toArray();

        $query = DB::table('applications')
            ->when($user->role == 'desa', function ($query) {
                $user = Auth::user();
                $query->where('ward', $user->ddesa->name);
                $query->whereNotNull('hamlet');
                return $query->where('hamlet', '');
            })
            ->select('status', DB::raw('COUNT(*) as total'))
            ->groupBy('status');

        $aliasMap = [];

        foreach ($categories as $category) {
            $alias = str_replace([' ', '-', '/'], '_', strtolower($category)); // alias aman untuk kolom
            $aliasMap[$alias] = $category;
            $query->addSelect(DB::raw("SUM(CASE WHEN category = '$category' THEN 1 ELSE 0 END) as `$alias`"));
        }
        $byStatus = $query->get();

        $formatted = $byStatus->map(function ($item) use ($aliasMap) {
            $categoryData = [];

            foreach ($aliasMap as $alias => $originalName) {
                $categoryData[] = [
                    'name' => $originalName,
                    'total' => (int) ($item->$alias ?? 0),
                ];
            }

            return [
                'status' => $item->status,
                'total' => (int) $item->total,
                'category' => $categoryData,
            ];
        });
        // $byStatus = DB::table('applications')
        //     ->select('status', DB::raw('COUNT(*) as total'))
        //     ->when($user->role == 'desa', function ($query) {
        //         $user = Auth::user();
        //         return $query->where('ward', $user->ddesa->name);
        //     })
        //     ->groupBy('category')
        //     ->get();

        // $byStatus = DB::table('applications')
        //     ->select(
        //         'category',
        //         DB::raw("SUM(CASE WHEN status = 'PENDING' THEN 1 ELSE 0 END) AS pending"),
        //         DB::raw("SUM(CASE WHEN status = 'VERIFIED' THEN 1 ELSE 0 END) AS verified"),
        //         DB::raw("SUM(CASE WHEN status = 'DEFFICIENT' THEN 1 ELSE 0 END) AS defficient"),
        //         DB::raw("SUM(CASE WHEN status = 'CANCEL' THEN 1 ELSE 0 END) AS cancel"),
        //         DB::raw("SUM(CASE WHEN status = 'REVISED' THEN 1 ELSE 0 END) AS revised"),
        //         DB::raw("COUNT(*) as total")
        //     )
        //     ->groupBy('category')
        //     ->get();

        $byCategory = DB::table('applications')
            ->select('category', DB::raw('COUNT(*) as total'))
            ->when($user->role == 'desa', function ($query) {
                $user = Auth::user();
                $query->where('ward', $user->ddesa->name);
                $query->whereNotNull('hamlet');
                return $query->where('hamlet', '');
            })
            ->groupBy('category')
            ->get();

        $districts = District::with('wards.hamlets')->get();

        $hamlets = [];

        if ($user->role == 'desa') {
            $hamlets = $user->ddesa->hamlets;
        }


        return Inertia::render('dashboard', [
            'status' => $formatted,
            'category' => $byCategory,
            'districts' => $districts,
            'role' => $user->role,
            'hamlets' => $hamlets,
        ]);
    }

    public function dashboard_statistic(Request $request)
    {
        $byCategory = Application::select('category', DB::raw('COUNT(*) as total'))
            ->filterByRole($request, Auth::user()->role)
            ->groupBy('category')
            ->get();
        return response()->json([
            'summary' => $byCategory,
        ]);
    }

    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $user = Auth::user();

        $applications = Application::query()
            ->with('filess')
            ->filterByRole($request, $user->role)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->onEachSide(1)
            ->appends($request->all());

        return Inertia::render('admin/permohonan/index', [
            'applications' => $applications,
            'filters' => [
                'search' => $request->search,
                'per_page' => $perPage,
                'kecamatan' => $request->kecamatan,
                'desa' => $request->desa,
                'tahun' => $request->tahun,
                'hamlet' => $request->hamlet,
                'status' => $request->status,
            ],
        ]);
    }

    public function get_years()
    {

        $years = Application::selectRaw('DISTINCT YEAR(created_at) as year')->groupBy('year')->orderBy('year')->pluck('year');
        return response()->json($years);
    }

    public function store(Request $request)
    {
        // untuk api
        try {
            $jwtToken = $request->header('Authorization');
            if (!$jwtToken) {
                return response()->json(['error' => 'Token tidak valid'], 401);
            }
            $key = config('services.external_api.symmetric');
            $secret = config('services.external_api.secret');
            JWT::decode($jwtToken, new Key($key, 'HS256'));
            $encryptedData = $request->getContent();
            $decryptedData = AES256::decrypt($encryptedData, $secret);
            $jsonData = json_decode($decryptedData, true);

            $forms = $jsonData["Data"];
            try {
                Log::info('coba');

                $applicant = new Application();
                $applicant->status_description = "Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi";
                $applicant->status = "PENDING";
                $menu = Menu::firstWhere('id_citigov', $forms["TicketCategoryId"]);
                $applicant->category = $menu->name;
                $applicant->images = '';
                $applicant->ticket = $forms["TicketNumber"];
                $applicant->files = json_encode($forms["FileAttachment"]);

                foreach ($forms["FormResultData"] as $key => $value) {
                    switch ($value['Label']) {
                        case 'No. KK':
                            $applicant->family_card_number = $value["Value"];
                            LOG::info('kk');

                            break;
                        case 'Nama Kepala Keluarga':
                            $applicant->family_head_name = $value["Value"];
                            LOG::info('kepala');

                            break;
                        case 'Nama Pemohon':
                            $applicant->name = $value["Value"];
                            LOG::info('pemohon');

                            break;
                        case 'NIK Pemohon':
                            $applicant->id_card_number = $value["Value"];
                            LOG::info('nik');

                            break;
                        case 'Jenis Kelamin':
                            $applicant->sex = $value["Value"] == "Perempuan" ? "P" : "L";
                            LOG::info('jenkel');

                            break;
                        case 'Agama':
                            $applicant->religion = $value["Value"];
                            LOG::info('agama');

                            break;
                        case 'No. HP Pemohon':
                            $applicant->phone = $value["Value"];
                            LOG::info('hp');

                            break;
                        case 'Email Pemohon':
                            $applicant->email = $value["Value"];
                            LOG::info('email');

                            break;
                        case 'Kelurahan / Desa':
                            $element = json_decode($value["Value"], true)[0]["form"]["elements"];
                            foreach ($element as $k => $v) {
                                if ($v["label"] == "kecamatan") {
                                    $applicant->district = $v["elementResult"]["value"];
                                } else if ($v["label"] == "name") {
                                    $applicant->ward = $v["elementResult"]["value"];
                                }
                            }
                            LOG::info('kel des');

                            break;
                        case 'Keterangan / penjelasan keperluan':
                            $applicant->description = $value["Value"];
                            LOG::info('ket');

                            break;
                        default:
                            $applicant->problems = $value["Value"];
                            break;
                    }
                }
                $res = $applicant->save();

                // email ke pemohon
                kirimEmail(
                    $applicant->email,
                    'Permohonan telah diregister',
                    'Permohonan ' . $applicant->category . ' telah diregister. Mohon cek email dan website secara berkala untuk mengetahui status permohonan.'
                );
                // Mail::to($applicant->email)->queue(
                //     new SimpleMail('Permohonan ' . $applicant->category  . ' telah diregister. Mohon cek email dan website secara berkala untuk mengetahui status permohonan.', 'Permohonan telah diregister', false)
                // );

                // email ke dukcapil
                kirimEmail(
                    config('custom.email_dukcapil'),
                    'Permohonan baru',
                    'Ada permohonan ' . $request->cateogry . ' dengan NIK : ' . $request->id_card_number . '. Mohon untuk segera ditindaklanjuti.'
                );
                // Mail::to(config('custom.email_dukcapil'))->queue(
                //     new SimpleMail('Ada permohonan ' . $request->cateogry . ' dengan NIK : ' . $request->id_card_number . '. Mohon untuk segera ditindaklanjuti.', 'Permohonan baru', false)
                // );

                LOG::info('simpan data', [
                    'result' => $res,
                    'data' => $applicant
                ]);
            } catch (\Exception $e) {
                LOG::error('error menyimpan data', [
                    'errornya' => $e
                ]);
                return response()->json(['errors' => $e], 500);
            }

            return response()->json(201);
        } catch (\Throwable $th) {
            LOG::error('error menyimpan data', [
                'errornya' => $th
            ]);
            return response()->json(['errors' => $th], 500);
        }
    }

    public function updateApi(Request $request)
    {
        try {
            $jwtToken = $request->header('Authorization');
            if (!$jwtToken) {
                throw new \Exception('Token tidak valid');
            }
            $key = config('services.external_api.symmetric');

            $secret = config('services.external_api.secret');

            JWT::decode($jwtToken, new Key($key, 'HS256'));

            $encryptedData = $request->getContent();

            $decryptedData = AES256::decrypt($encryptedData, $secret);

            $jsonData = json_decode($decryptedData, true);

            $data = $jsonData["Data"];

            $applicant = Application::firstWhere('ticket', $data["TicketNumber"]);
            $applicant->status_description = $data["StatusDescription"];
            $status = "PENDING";
            switch ($data["Status"]) {
                case 1:
                    $status = "PENDING";
                    break;
                case 2:
                    $status = "COMPLETED";
                    break;
                case 3:
                    $status = "CANCEL";
                    break;
                default:
                    $status = "PENDING";
                    break;
            }
            $applicant->status = $status;
            error_log($decryptedData);
            LOG::info('update data', [
                'result' => $data,
                'applicant' => $applicant,
            ]);
            $applicant->save();



            return response()->json(['message' => 'Sukses'], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function show(Application $application)
    {

        $files = $application->filess;
        $hamlet = $application->hamlet;
        $menu = Menu::firstWhere('name', $application->category);
        $requirements = $menu->requirements;
        return Inertia::render('admin/permohonan/show', compact('application', 'files', 'menu', 'requirements', 'hamlet'));
    }

    public function edit(Application $application)
    {
        $pdf = app('dompdf.wrapper');
        $pdf->getDomPDF()->set_option("enable_php", true);
        $pdf->loadView('report', compact('application'));
        return $pdf->stream('applicant.pdf');
        // return view('report', compact('application'));
    }

    public function destroy(Application $application)
    {
        $this->up->deleteKK($application->category, $application);
        $this->up->deleteKTP($application->category, $application);
        $this->up->deleteSurat($application->category, $application);
        $this->up->deleteImages('applicant', $application);
        $application->delete();
        session()->flash('message', 'Berhasil menghapus data');

        // return redirect()->route('application.index');
        return response()->json(200);
    }

    public function update_status(Request $request, $id)
    {
        $application = Application::where('id', $id)->first();

        try {
            if (($application->ticket != null && $application->ticket != '' && $application->ticket != '-') && ($request->status == "VERIFIED" || $request->status == "DEFFICIENT" || $request->status == "COMPLETED")) {
                $key = config('services.external_api.symmetric');
                $status = 0;
                switch ($request->status) {
                    case "VERIFIED":
                        $status = 1;
                        break;
                    case "COMPLETED":
                        $status = 2;
                        break;
                    case "CANCEL":
                        $status = 3;
                        break;
                    default:
                        $status = 1;
                        break;
                }
                $data = [
                    "symetric_key" => $key,
                    "ticket_number" => $application->ticket,
                    "status" => $status,
                ];
                $ext_url = config('services.external_api.url');

                $result = Http::put($ext_url . "integration/client/ticket/change-status", $data);
                if ($result->failed()) {
                    $tes = [
                        'status' => $result->status(),
                        'body' => $result->body()
                    ];
                    error_log(json_encode($tes));
                    throw new \Exception("error ketika menyimpan ke citigov");
                }
            }
        } catch (\Throwable $th) {
            session()->flash('message', 'Gagal mengubah status ke citigov' . $th->getMessage());
            return redirect()->route('application.index');
        }

        $application->status = $request->status;
        $application->status_description = $request->status_description;
        $application->save();

        if ($request->status == 'REVISED' || $request->status == 'DEFFICIENT') {
            if ($application->hamlet != null || $application->hamlet != '') {
                $hamlet = Hamlet::where('name', $application->hamlet)->first();
                return response()->json($hamlet);
                // kirim ke desa
                // kirimEmail(
                //     $hamlet->ward->user->email,
                //     'Permohonan ditolak',
                //     'Permohonan ' . $application->category . 'dengan NIK : ' . $application->id_card_number . ' telah ditolak. Alasan penolakan : ' . $application->status_description,
                // );
                // Mail::to($hamlet->ward->user->email)->queue(
                //     new SimpleMail('Permohonan ' . $application->category  . 'dengan NIK : ' . $application->id_card_number . ' telah ditolak. Alasan penolakan : ' . $application->status_description, 'Permohonan ditolak', false)
                // );
            }
            kirimEmail(
                $application->email,
                'Permohonan ditolak',
                'Permohonan ' . $application->category . ' telah ditolak. Alasan penolakan : ' . $application->status_description,
            );
            Mail::to($application->email)->queue(
                new SimpleMail('Permohonan ' . $application->category . ' telah ditolak. Alasan penolakan : ' . $application->status_description, 'Permohonan ditolak', false)
            );
        }

        session()->flash('message', 'Sukses mengubah status');
        return redirect()->route('application.index');
    }

    public function count()
    {
        $c = Application::all()->whereIn('status', ['PENDING', 'DEFFICIENT', 'VERIFIED']);
        return response()->json([
            'count' => count($c)
        ]);
    }
}
