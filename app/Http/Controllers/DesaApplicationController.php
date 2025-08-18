<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\DesaApplication;
use App\Models\DesaFile;
use App\Models\File;
use App\Models\Hamlet;
use App\Models\Menu;
use App\Models\SupportFile;
use App\Support\MyUploadFile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

use function App\Support\kirimEmail;

class DesaApplicationController extends Controller
{
    private $upload;

    public function __construct()
    {
        $this->upload = new MyUploadFile();
    }

    public function buat()
    {
        return Inertia::render('Admin/DesaApplication/Buat');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $hamlets = Hamlet::with('ward')->get();
        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);

        $user = auth()->user();

        $desaApps = Application::with('filess')->where('ward_id', $user->ddesa->id)->orderBy('created_at', 'desc')->paginate($perPage, ['*'], 'page', $page);
        return Inertia::render('Admin/DesaApplication/Index', [
            'hamlets' => $hamlets,
            'desaApps' => $desaApps->items(),
            'meta' => [
                'current_page' => $desaApps->currentPage(),
                'last_page' => $desaApps->lastPage(),
                'per_page' => $desaApps->perPage(),
                'total' => $desaApps->total(),
            ]
        ]);
    }

    public function paging(Request $request)
    {

        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);

        $query = Application::query();

        if ($request->has('hamlet_id') && !empty($request->hamlet_id) && $request->hamlet_id != -1) {
            $query->where('hamlet_id', $request->hamlet_id);
        }

        if ($request->has('status') && !empty($request->status)) {
            $query->where('status', $request->status);
        }

        if ($request->has('q') && !empty($request->q)) {
            $query->where('name', 'like', '%' . $request->q . '%');
        }

        if ($request->has('tahun') && !empty($request->tahun) && $request->tahun != -1) {
            $query->whereYear('created_at', $request->tahun);
        }
        $application = $query->with('filess')->orderBy('created_at', 'desc')->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'data' => $application->items(),
            'meta' => [
                'current_page' => $application->currentPage(),
                'last_page' => $application->lastPage(),
                'per_page' => $application->perPage(),
                'total' => $application->total(),
            ],
        ]);
    }

    public function get_years()
    {
        $user = auth()->user();
        $years = Application::selectRaw('DISTINCT YEAR(created_at) as year')->where('ward_id', $user->ddesa->id)->groupBy('year')->orderBy('year')->pluck('year');
        return response()->json($years);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($category)
    {
        $user = auth()->user();
        $hamlets = $user->ddesa->hamlets;
        $menu = Menu::firstWhere('name', $category);
        $requirements = $menu->requirements;
        return Inertia::render('Admin/DesaApplication/Create', compact('menu', 'hamlets', 'category', 'requirements'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        // try {
        $user = auth()->user();
        $applicant = Application::make($request->all());
        $applicant->ticket = '-';
        $applicant->id_category = 0;
        $applicant->hamlet_id = $request->hamlet_id;
        $applicant->ward_id = $user->ddesa->id;
        $applicant->district_id = $user->ddesa->district_id;
        $applicant->ward = $user->ddesa->name;
        $applicant->district = $user->ddesa->district->name;
        $this->upload->uploadImages($request, 'images', $applicant);
        $applicant->status_description = "Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi";
        $applicant->save();
        // email ke pemohon
        kirimEmail(
            $request->email,
            'Permohonan telah diproses dan dikirim ke Dukcapil',
            'Permohonan ' . $request->cateogry . ' telah diproses dan dikirim ke Dukcapil. Mohon cek email dan website secara berkala untuk mengetahui status permohonan'
        );


        // email ke dukcapil
        kirimEmail(
            'disdukcapilkabmorut@gmail.com',
            'Permohonan baru',
            'Ada permohonan ' . $request->cateogry . ' dengan NIK : ' . $request->id_card_number . '. Mohon untuk segera ditindaklanjuti.'
        );
        foreach ($request->filessss as $key => $file) {
            $nameExt = $key . '-' . time() . '.' . $file['filenya']->extension();
            $file['filenya']->storeAs($request->category, $nameExt, 'public');
            $desaFile = new File();
            $desaFile->name = $file['name'];
            $desaFile->place = $request->category . '/' . $nameExt;
            $desaFile->status = '0';
            $desaFile->requirement_id = $file['requirement_id'] ?? 0;
            $applicant->filess()->save($desaFile);
        }

        if ($request->pendukung != null) {
            foreach ($request->pendukung as $key => $file) {
                $nameExt =  $key . '-' . time() . '.' . $file['filenya']->extension();
                $file['filenya']->storeAs('pendukung', $nameExt, 'public');
                $desaFile = new SupportFile();
                $desaFile->name = $file['name'];
                $desaFile->place = 'pendukung' . '/' . $nameExt;
                $applicant->supports()->save($desaFile);
            }
        }
        // $desaApplication = DesaApplication::make($request->all());
        // $this->upload->uploadImages($request, 'images', $desaApplication);
        // $desaApplication->save();
        // foreach ($request->filessss as $key => $file) {
        //     $nameExt = time() . '.' . $file['filenya']->extension();
        //     $file['filenya']->storeAs($request->category, $nameExt, 'public');
        //     $desaFile = new DesaFile();
        //     $desaFile->name = $file['name'];
        //     $desaFile->place = $request->category . '/' . $nameExt;
        //     $desaApplication->files()->save($desaFile);
        // }
        // $menu = Menu::firstWhere('name', $request->category);
        // $syarat = $menu->requirements;

        session()->flash('message', 'Data berhasil dibuat');
        return redirect()->route('desa.index');
        // } catch (\Throwable $th) {
        //     session()->flash('message', 'Data gagal dibuat. Error : ' . $th);
        //     return back()->withErrors([
        //         'server' => 'Terjadi kesalahan: ' . $th->getMessage()
        //     ]);
        // }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DesaApplication  $desaApplication
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $desaApplication = Application::with(['filess', 'supports'])->find($request->id);
        $menu = Menu::firstWhere('name', $desaApplication->category);
        $requirements = $menu->requirements;
        $hamlet = Hamlet::find($desaApplication->hamlet_id);
        return Inertia::render('Admin/DesaApplication/Show', compact('desaApplication', 'requirements', 'menu', 'hamlet'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DesaApplication  $desaApplication
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $applicant = Application::find($id);
        $filess = $applicant->filess;
        $user = auth()->user();
        $hamlets = $user->ddesa->hamlets;
        $category = $applicant->category;
        $menu = Menu::firstWhere('name', $category);
        $requirements = $menu->requirements;
        return Inertia::render('Admin/DesaApplication/Edit', compact('filess', 'hamlets', 'menu', 'requirements', 'applicant', 'category'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DesaApplication  $desaApplication
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $desaApplication = Application::find($request->id);
        $files = $desaApplication->filess;
        $menu = Menu::firstWhere('name', $desaApplication->category);
        $requirements = $menu->requirements;

        if ($request->hasFile('images')) {
            $this->upload->deleteImages('images', $desaApplication);
            $this->upload->uploadImages($request, 'images', $desaApplication);
        }

        if ($request->filessss != null) {
            foreach ($request->filessss as $key => $file) {
                // hapus terlebih dahulu gambarnya
                LOG::info('perulangan ke = ' . $key);

                if ($file['place'] != null && $file['place'] !== "") {
                    $this->upload->deleteBerkas($file['place']);
                    File::where('place', $file['place'])->delete();
                }
                LOG::info('file place = ' . $file['place']);
                LOG::info('file filenya = ' . $file['filenya']);


                $nameExt = $key . '-' . time() . '.' . $file['filenya']->extension();
                $file['filenya']->storeAs($request->category, $nameExt, 'public');
                $desaFile = new File();
                $desaFile->name = $file['name'];
                $desaFile->place = $request->category . '/' . $nameExt;
                $desaFile->status = '0';
                $desaFile->comment = 'sudah direvisi';
                LOG::info('desafile name = ' . $desaFile->name);
                LOG::info('desafile place = ' . $desaFile->place);
                $desaApplication->filess()->save($desaFile);
            }
        }
        if ($request->pendukung != null) {
            foreach ($request->pendukung as $key => $file) {
                $nameExt =  $key . '-' . time() . '.' . $file['filenya']->extension();
                $file['filenya']->storeAs('pendukung', $nameExt, 'public');
                $desaFile = new SupportFile();
                $desaFile->name = $file['name'];
                $desaFile->place = 'pendukung' . '/' . $nameExt;
                $desaApplication->supports()->save($desaFile);
            }
        }
        $desaApplication->status = 'REVISED';
        $desaApplication->status_description = 'Berkas sudah direvisi';
        $desaApplication->save();

        $hamlet = Hamlet::find($desaApplication->hamlet_id);

        return Inertia::render('Admin/DesaApplication/Show', compact('desaApplication', 'files', 'requirements', 'menu', 'hamlet'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DesaApplication  $desaApplication
     * @return \Illuminate\Http\Response
     */
    public function destroy(DesaApplication $desaApplication)
    {
        $this->upload->deleteKK($desaApplication->category, $desaApplication);
        $this->upload->deleteKTP($desaApplication->category, $desaApplication);
        $this->upload->deleteSurat($desaApplication->category, $desaApplication);
        $this->upload->deleteImages('applicant', $desaApplication);
        $desaApplication->delete();
        return redirect()->route('desa.index');
    }

    public function ready(Request $request)
    {
        // get data desa application
        $desaApplication = DesaApplication::find($request->id);
        $applicant = Application::make($request->all());

        $this->upload->uploadImages($request, 'images', $applicant);
        $applicant->status_description = "Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi";
        $applicant->save();
        $desaApplication->update([
            'status' => 'SENDED',
        ]);
        return redirect()->route('desaApplications.show', $desaApplication);
    }

    public function update_status(Request $request)
    {
        $desaApplication = DesaApplication::find($request->id);
        $desaApplication->update([
            'status' => $request->status,
            'status_description' => $request->status_description,
        ]);
        return redirect()->route('desaApplications.show', $desaApplication);
    }
}
