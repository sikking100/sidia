<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'family_card_number' => ['required', 'min:16', 'regex:/^\S*$/u', 'numeric'],
            'family_head_name' => 'required|string',
            'id_card_number' => ['required', 'min:16', 'regex:/^\S*$/u', 'numeric'],
            'name' => 'required|string',
            'phone' => ['required', 'min:12', 'regex:/^\S*$/u', 'numeric'],
            'email' => 'required|email',
            'district' => 'required|string',
            'ward' => 'required|string',
            'description' => 'required|string',
            'images' => 'required|image',
            'sex' => 'required',
            'religion' => 'required',
        ];
    }
}
