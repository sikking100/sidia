<?php

namespace App\Http\Controllers;

use App\Mail\SendAttachmentMail;
use App\Models\Application;
use App\Models\Comment;
use App\Models\File;
use Illuminate\Http\Request;
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
        $comment = Comment::make($request->all());
        if ($request->has('file')) {
            // cek apakah desa atau bukan
            if ($request->has('ward')) {
                $applicant = Application::find($request->id);
                $nameExt = time() . '.' . $request->file->extension();
                $request->file->storeAs($request->category, $nameExt, 'public');
                $files = new File;
                $files->name = 'Hasil-' . $request->id;
                $files->place = $nameExt;
                $applicant->filess()->save($files);
                $comment->content = 'Berkas berhasil diupload';
            } else {
                $file = $request->file;
                Mail::to($request->guest_email)->send(new SendAttachmentMail($file, $request->category));
                $comment->content = 'Berkas terkirim ke email ' . $request->guest_mail;
            }
        }
        if ($request->has('user_id')) {
            $comment->guest_email = null;
        }
        $comment->save();
        return response()->json($comment);
    }
}
