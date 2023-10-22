<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['name','category','company','user'];
    public function labels() {
        return $this->belongsToMany('App\Models\Label','label_product','label','product');
    }

    public function category(){
        return $this->belongsTo('App\Models\Category');
    }
    public function company(){
        return $this->belongsTo('App\Models\Company');
    }

    public function productVariants() {
        return $this->hasMany('App\Models\ProductVariant');
    }

    public function syncLabels($array){
        $this->labels()->sync($array);
    }

    public static function all_atrributes($array_atributes){
        $products =  Product::all();
        $products->load($array_atributes);
        return $products;
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
