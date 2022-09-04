<?php

namespace App\Support;

use File;

/**
 *
 */
class MyUploadFile
{

  public function uploadImages($request, $folder, $model)
  {
    $name = time().'.'.$request->images->extension();
    $request->images->storeAs($folder, $name, 'public');
    $model->images = $name;
    return;
  }

  public function deleteImages($folder,$model)
  {
    if (File::exists(public_path('storage/'.$folder.'/'.$model->images))) {
      File::delete(public_path('storage/'.$folder.'/'.$model->images));
    }
    return;
  }

  public function uploadKK($request, $folder, $model)
  {
    $name = time().'.'.$request->file_family_card->extension();
    $request->file_family_card->storeAs($folder, $name, 'public');
    $model->file_family_card = $name;
    return;
  }

  public function deleteKK($folder,$model)
  {
    if (File::exists(public_path('storage/'.$folder.'/'.$model->file_family_card))) {
      File::delete(public_path('storage/'.$folder.'/'.$model->file_family_card));
    }
    return;
  }

  public function uploadKTP($request, $folder, $model)
    {
      $name = time().'.'.$request->file_id_card->extension();
      $request->file_id_card->storeAs($folder, $name, 'public');
      $model->file_id_card = $name;
      return;
    }

    public function deleteKTP($folder,$model)
    {
      if (File::exists(public_path('storage/'.$folder.'/'.$model->file_id_card))) {
        File::delete(public_path('storage/'.$folder.'/'.$model->file_id_card));
      }
      return;
    }

    public function uploadSurat($request, $folder, $model)
    {
      $name = time().'.'.$request->file_lost_letter->extension();
      $request->file_lost_letter->storeAs($folder, $name, 'public');
      $model->file_lost_letter = $name;
      return;
    }

    public function deleteSurat($folder,$model)
    {
      if (File::exists(public_path('storage/'.$folder.'/'.$model->file_lost_letter))) {
        File::delete(public_path('storage/'.$folder.'/'.$model->file_lost_letter));
      }
      return;
    }
}
