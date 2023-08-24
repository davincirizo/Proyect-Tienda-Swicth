<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Label extends Model
{
    use HasFactory;
    protected $fillable = ['name','category_id'];

    public function category(){
        return $this->belongsTo('App\Models\Category');
    }
    public function products(){
        $this->belongsToMany('App\Models\Product');
    }

    public static function getAllLabels(){
        $labels = Label::all();
        for($i = 0; $i < count($labels); $i++) {
            $labels[$i]->category;
        }
        return $labels;
    }
}
