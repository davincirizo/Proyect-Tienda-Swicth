<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Company::create(['name' => 'Mypime Quintero'])->syncUsers([2]);
        Company::create(['name' => 'Mypime Boniato'])->syncUsers([3,2]);
        Company::create(['name' => 'Mypime Cuabita'])->syncUsers([2]);


    }
}
