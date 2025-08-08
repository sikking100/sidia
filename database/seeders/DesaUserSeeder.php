<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Ward;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

use function App\Support\generateStrongPassword;

class DesaUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $wards = Ward::all();

        foreach ($wards as $desa) {
            $username = strtolower(str_replace(' ', '_', 'desa_' . $desa->name));
            $existingUser = User::where('email', $username . '@example.com')->first();

            if (!$existingUser) {
                // Buat user baru
                $user = User::create([
                    'name' => 'Admin Desa ' . $desa->name,
                    'email' => $username . '@example.com',
                    'password' => Hash::make(generateStrongPassword(6)), // Password default
                    'role' => 'desa',
                ]);

                // Update desa dengan admin_id
                $desa->update(['user_id' => $user->id]);

                $this->command->info('Created user for Desa ' . $desa->nama_desa);
            }
        }
    }
}
