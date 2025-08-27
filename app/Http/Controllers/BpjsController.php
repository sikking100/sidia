<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BpjsController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $user = Auth::user();
        $applications = Application::query()
            ->with(['filess', 'supports'])
            ->filterByRole($request, $user->role)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->onEachSide(1)
            ->appends($request->all());

        return Inertia::render('admin/bpjs/index', [
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

    public function show($id)
    {
        $application = Application::with(['filess', 'supports'])->find($id);
        return Inertia::render('admin/bpjs/show', [
            'application' => $application
        ]);
    }

    public function update(Request $request, $id)
    {
        $application = Application::find($id);
        $application->status = $request->status;
        $application->status_description = $request->status_description;
        $application->save();
    }
    public function update_file(Request $request, $id)
    {

        $file = File::findOrFail($id);
        $file->comment =  $request->status_description;
        $file->status = $request->status;
        $file->save();
        $application = $file->application;
        if ($request->status == '2' || $request->status == 2) {
            $application->status = 'DEFFICIENT';
            $application->status_description = 'Ada berkas yang kurang';
            $application->save();
        }
        return;
    }

    public function years()
    {
        $years = Application::selectRaw('DISTINCT YEAR(created_at) as year')->where('category', 'Klaim-JKM')->groupBy('year')->orderBy('year')->pluck('year');
        return response()->json($years);
    }
}
