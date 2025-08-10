<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\DesaApplication;
use App\Models\DesaFile;
use App\Models\File;
use App\Models\Menu;
use App\Support\MyUploadFile;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);

        $user = auth()->user();

        $desaApps = Application::with('filess')->where('ward_id', $user->ddesa->id)->orderBy('created_at', 'desc')->paginate($perPage, ['*'], 'page', $page);
        return Inertia::render('Admin/DesaApplication/Index', [
            'desaApps' => $desaApps->items(),
            'meta' => [
                'current_page' => $desaApps->currentPage(),
                'last_page' => $desaApps->lastPage(),
                'per_page' => $desaApps->perPage(),
                'total' => $desaApps->total(),
            ]
        ]);
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
        $applicant->hamlet_id = $request->hamlet_id;
        $applicant->ward_id = $user->ddesa->id;
        $applicant->district_id = $user->ddesa->district_id;
        $applicant->ward = $user->ddesa->name;
        $applicant->district = $user->ddesa->district->name;
        $this->upload->uploadImages($request, 'images', $applicant);
        $applicant->status_description = "Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi";
        $applicant->save();
        foreach ($request->filessss as $key => $file) {
            $nameExt = time() . '.' . $file['filenya']->extension();
            $file['filenya']->storeAs($request->category, $nameExt, 'public');
            $desaFile = new File();
            $desaFile->name = $file['name'];
            $desaFile->place = $request->category . '/' . $nameExt;
            $applicant->filess()->save($desaFile);
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
        $desaApplication = Application::find($request->id);
        $files = $desaApplication->filess;
        $menu = Menu::firstWhere('name', $desaApplication->category);
        $requirements = $menu->requirements;
        return Inertia::render('Admin/DesaApplication/Show', compact('desaApplication', 'files', 'requirements', 'menu'));
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

                if ($file['place'] != null && $file['place'] !== "") {
                    $this->upload->deleteBerkas($file['place']);
                    File::where('place', $file['place'])->delete();
                }

                $nameExt = time() . '.' . $file['filenya']->extension();
                $file['filenya']->storeAs($request->category, $nameExt, 'public');
                $desaFile = new File();
                $desaFile->name = $file['name'];
                $desaFile->place = $request->category . '/' . $nameExt;
                $desaApplication->filess()->save($desaFile);
            }
        }
        $desaApplication->status = 'REVISED';
        $desaApplication->status_description = 'Berkas sudah direvisi';
        $desaApplication->save();
        return Inertia::render('Admin/DesaApplication/Show', compact('desaApplication', 'files', 'requirements', 'menu'));
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
}
