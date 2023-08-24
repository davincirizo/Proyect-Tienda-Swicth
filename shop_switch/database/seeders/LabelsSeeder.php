<?php

namespace Database\Seeders;

use App\Models\Label;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LabelsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       Label::create(['name' => 'Games Pass','category_id' => 1]);
       Label::create(['name' => 'Ultimo','category_id' => 1]);
       Label::create(['name' => 'Zapatos','category_id' => 2]);
       Label::create(['name' => 'De Marca','category_id' => 2]);
       Label::create(['name' => 'lo ultimo','category_id' => 3]);
       Label::create(['name' => 'Retro','category_id' => 3]);
       Label::create(['name' => 'Ultimo Musica','category_id' => 4]);
       Label::create(['name' => 'Tendencias Ropa','category_id' => 4]);
       Label::create(['name' => 'Series Top','category_id' => 5]);
       Label::create(['name' => 'Estreno','category_id' => 5]);
       Label::create(['name' => 'PS5','category_id' => 6]);
       Label::create(['name' => 'Consolas','category_id' => 6]);
       Label::create(['name' => 'SuperDivertido','category_id' => 7]);
       Label::create(['name' => '2023','category_id' => 7]);
       Label::create(['name' => 'International','category_id' => 8]);
       Label::create(['name' => 'SuperEstreno','category_id' => 8]);
       Label::create(['name' => 'Beatiful','category_id' => 9]);
       Label::create(['name' => 'Hoga','category_id' => 9]);
       Label::create(['name' => 'Interiores','category_id' => 10]);
       Label::create(['name' => 'Herraminestas Construccion','category_id' => 10]);
       Label::create(['name' => 'Proteccion','category_id' => 11]);
       Label::create(['name' => 'Mecanico','category_id' => 11]);
       Label::create(['name' => 'Carro','category_id' => 12]);
       Label::create(['name' => 'Motores','category_id' => 12]);
       Label::create(['name' => 'Cablerio','category_id' => 13]);
       Label::create(['name' => 'Electrico','category_id' => 14]);
       Label::create(['name' => 'Sonido','category_id' => 15]);
       Label::create(['name' => 'Viajes','category_id' => 15]);
    }
}
