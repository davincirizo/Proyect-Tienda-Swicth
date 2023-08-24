<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create(['name' => 'Electronicos']);
        Category::create(['name' => 'Calzado']);
        Category::create(['name' => 'Utiles de Hogar']);
        Category::create(['name' => 'Ropa']);
        Category::create(['name' => 'Maquillaje']);
        Category::create(['name' => 'Diversion']);
        Category::create(['name' => 'Deporte']);
        Category::create(['name' => 'Luces']);
        Category::create(['name' => 'Musica']);
        Category::create(['name' => 'Micelanea']);
        Category::create(['name' => 'Cocina']);
        Category::create(['name' => 'Carpinteria']);
        Category::create(['name' => 'Comida']);
        Category::create(['name' => 'Herramientas']);
        Category::create(['name' => 'Piezas de Carros']);
    }
}
