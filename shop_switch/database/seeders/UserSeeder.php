<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user_admin = User::create([
            'name'=>'Admin',
            'email'=>'rizod3409@gmail.com',
            'password'=>'admin',
        ])->assignRole('Admin');
        $user_admin->markEmailAsVerified();
    }
}
