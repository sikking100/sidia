<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'family_card_number' => ['min:16', 'required', 'regex:/^\S*$/u', 'numeric'],
            'family_head_name' => 'required|string',
            'id_card_number' => ['min:16', 'required', 'regex:/^\S*$/u', 'numeric'],
            'name' => 'required|string',
            'phone' => ['min:12', 'required', 'regex:/^\S*$/u', 'numeric'],
            'email' => 'nullable|email',
            'district' => 'required|string',
            'ward' => 'required|string',
            'description' => 'nullable|string',
            'images' => 'required|image',
            'sex' => 'required',
            'religion' => 'required',
        ];
    }
}
