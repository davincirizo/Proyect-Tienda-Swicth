<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'Laptop Lenovo X100',
            'user' => 3,
            'category' => 2,
            'company' => 1,
        ])->syncLabels([1,2]);
        Product::create([
            'name' => 'PC Gaming Gama alta',
            'user' => 4,
            'category' => 3,
            'company' => 2,
        ])->syncLabels([3,4]);
        Product::create([
            'name' => 'Enchapadora Retractil',
            'user' => 1,
            'category' => 5,
            'company' => 3,
        ])->syncLabels([4,2,6]);
    }
}
