<?php

namespace App\Models;

use App\Policies\UserPolicy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
//    protected static function booted()
//    {
//        static::addGlobalScope('users', function (Builder $builder) {
//            $builder->with('users');
//        });
//
//    }
    use HasFactory;
    protected $fillable = ['name','description','image'];
    protected $policy = UserPolicy::class;


    public function users(){
        return $this->belongsToMany('App\Models\User','company_user','company','user');
    }
    public function products(){
        return $this->hasMany('App\Models\Product');
    }
    public function syncUsers($array){
        $this->users()->sync($array);
    }
    public static function all_atrributes($array_atributes){
        $companies =  Company::all();
        $companies->load($array_atributes);
        return $companies;
    }
    public  function id_atrributes($array_atributes){
        $this->load($array_atributes);
    }
    public function getIds_users(){
        $ids = [];
        foreach ($this->users as $user) {
            array_push($ids,$user->id);
        }
        return $ids;
    }

}
