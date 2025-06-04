<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\StoreApplicationRequest;
use App\Http\Requests\UpdateApplicationRequest;
use App\Http\Requests\UpdateStatusRequest;

use App\Models\Application;
use App\Models\Menu;
use Inertia\Inertia;
use App\Support\MyUploadFile;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use mervick\aesEverywhere\AES256;

class ApplicationController extends Controller
{

    private $up;

    public function __construct()
    {
        $this->up = new MyUploadFile();
    }

    public function photo(Request $request)
    {
        $url = config('services.external_api.url');
        $sym = config('services.external_api.symmetric');
        $response = Http::withHeaders([
            'symetric' => $sym,
            'Accept' => 'image/jpeg',
        ])->get($url . "files-sym/" . $request->name);
        if ($response->successful()) {
            $contentType = $response->header('Content-Type', 'application/octet-stream');
            $filename = 'photo.jpg'; // atau ambil dari Content-Disposition kalau tersedia

            return response($response->body(), 200)
                ->header('Content-Type', $contentType)
                ->header('Content-Disposition', 'inline; filename="' . $filename . '"');
        }
        return abort(404, 'Image not found');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);

        $application = Application::query()->orderBy('created_at', 'desc')->paginate($perPage, ['*'], 'page', $page);

        return Inertia::render('Admin/Pemohon/Index', [
            'data' => $application->items(),
            'meta' => [
                'current_page' => $application->currentPage(),
                'last_page' => $application->lastPage(),
                'per_page' => $application->perPage(),
                'total' => $application->total(),
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreApplicationRequest  $request
     * @return \Illuminate\Http\Response
     */
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
                LOG::info('coba');

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
                    $status = "DEFFICIENT";
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

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function show(Application $application)
    {

        $files = $application->filess;
        return Inertia::render('Admin/Pemohon/Show', compact('application', 'files'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function edit(Application $application)
    {
        $pdf = app('dompdf.wrapper');
        $pdf->getDomPDF()->set_option("enable_php", true);
        $pdf->loadView('report', compact('application'));
        return $pdf->stream('applicant.pdf');
        // return view('report', compact('application'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateApplicationRequest  $request
     * @param  \App\Models\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateApplicationRequest $request, Application $application)
    {
        // dd($application);
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function destroy(Application $application)
    {
        $this->up->deleteKK($application->category, $application);
        $this->up->deleteKTP($application->category, $application);
        $this->up->deleteSurat($application->category, $application);
        $this->up->deleteImages('applicant', $application);
        $application->delete();
        return redirect()->route('application.index');
    }

    public function update_status(UpdateStatusRequest $request, $id)
    {
        $application = Application::where('id', $id)->first();

        try {
            if (($application->ticket != null && $application->ticket != '') && ($request->status == "VERIFIED" || $request->status == "DEFFICIENT" || $request->status == "COMPLETED")) {
                $key = config('services.external_api.symmetric');
                $status = 0;
                switch ($request->status) {
                    case "VERIFIED":
                        $status = 1;
                        break;
                    case "COMPLETED":
                        $status = 2;
                        break;
                    case "DEFFICIENT":
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
