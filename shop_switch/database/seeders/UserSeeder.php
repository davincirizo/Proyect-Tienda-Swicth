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
            'email'=>'admin@gmail.com',
            'password'=>'admin',
        ])->assignRole('Admin');
        $user_admin->markEmailAsVerified();

        $user_user = User::create([
            'name'=>'User',
            'email'=>'user@gmail.com',
            'password'=>'admin',
        ])->assignRole('User');
        $user_user->markEmailAsVerified();

        $user_saler = User::create([
            'name'=>'Saler',
            'email'=>'saler@gmail.com',
            'password'=>'admin',
        ])->assignRole('Saler');
        $user_saler->markEmailAsVerified();
    }
}
