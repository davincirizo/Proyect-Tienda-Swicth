<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['name','category_id'];
    public function labels() {
        return $this->belongsToMany('App\Models\Label');
    }

    public function category(){
        return $this->belongsTo('App\Models\Category');
    }

    public static function getProducts(){
        $products = Product::all();
        for($i = 0; $i < count($products); $i++) {
            $products[$i]->category;
            $products[$i]->labels;
        }
        return $products;
    }
}
