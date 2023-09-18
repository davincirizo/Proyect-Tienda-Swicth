<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role;

class RoleInherit extends Role

{
    protected static function booted()
    {
        static::addGlobalScope('permissions', function (Builder $builder) {
            $builder->with('permissions');
        });

    }
    public static function getPermissions(){
        $roles = Role::all();
        for($i = 0; $i < count($roles); $i++){
            $roles[$i]->permissions;
        }
        return $roles;
    }
}
