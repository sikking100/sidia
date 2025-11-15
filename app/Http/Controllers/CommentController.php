<?php

namespace App\Http\Controllers;

use App\Mail\SendAttachmentMail;
use App\Models\Application;
use App\Models\Comment;
use App\Models\File;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class CommentController extends Controller
{
    public function get($id)
    {
        $comments = Comment::where('application_id', $id)->get();
        return response()->json($comments);
    }

    public function store(Request $request)
    {
        // return response()->json($request->all());
        $comment = Comment::make($request->all());
        if ($request->has('file')) {
            // cek apakah desa atau bukan
            if ($request->has('hamlet')) {
                Log::info('ada hamletnya');
                $applicant = Application::find($request->application_id);

                $nameExt = $request->filename;
                $request->file->storeAs($request->category, $nameExt, 'public');
                $files = new File;
                $files->name = 'Hasil-' . $nameExt;
                $files->place = $request->category . '/' . $nameExt;
                $applicant->status = 'COMPLETED_FILE';
                $applicant->status_description = 'Berkas sudah diupload';
                $applicant->save();
                $applicant->filess()->save($files);
                $comment->content = 'Berkas berhasil diupload';
            } else {
                $file = $request->file;
                Mail::to($request->guest_email)->send(new SendAttachmentMail($file, $request->category));
                $comment->content = 'Berkas terkirim ke email ' . $request->guest_mail;
                $applicant = Application::find($request->application_id);
                $applicant->status = 'COMPLETED';
                $applicant->status_description = 'Berkas sudah terkirim ke email';
                $applicant->save();
            }
        }

        $user = User::find($request->user_id);
        if ($user->role == 'superadmin') {
            $comment->guest_email = null;
        }
        $comment->save();
        return response()->json($comment);
    }
}
