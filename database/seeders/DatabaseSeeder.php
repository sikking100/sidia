<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Ward;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Facades\Excel;

use function App\Support\generateStrongPassword;
use function App\Support\kirimEmail;

class DatabaseSeeder extends Seeder implements WithHeadingRow
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $path = base_path('database/seeders/files/emailbarulagi.xlsx');
        $rows = Excel::toCollection($this, $path)->first();

        foreach ($rows as $row) {
            $desa = Ward::where('name', $row['desa'])->first();

            if (!$desa) {
                continue;
            }

            if ($desa->user) {
                // user sudah ada → update
                $pass = generateStrongPassword(6);
                $desa->user->update([
                    'email' => $row['email'],
                    'phone' => $row['telepon'],
                    'name' => $row['nama'],
                    'password' => Hash::make($pass),
                ]);
                kirimEmail($row['email'], 'Password default', $pass);
                $this->command->info('Update user for Desa ' . $desa->name);
            }
        }

        // $wards = Ward::all();
        // foreach ($wards as $desa) {
        //     $username = strtolower(str_replace(' ', '_', 'desa_' . $desa->name));
        //     $existingUser = User::where('email', $username . '@example.com')->first();

        //     if (!$existingUser) {
        //         // Buat user baru
        //         $user = User::create([
        //             'name' => 'Admin Desa ' . $desa->name,
        //             'email' => $username . '@example.com',
        //             'password' => Hash::make(generateStrongPassword(6)), // Password default
        //             'role' => 'desa',
        //         ]);
        //         // Update desa dengan admin_id
        //         $desa->update(['user_id' => $user->id]);

        //         $this->command->info('Created user for Desa ' . $desa->nama_desa);
        //     }
        // }
    }
}
