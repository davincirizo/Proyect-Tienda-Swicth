<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role;

class RoleInherit extends Role
{
    public static function getPermissions(){
        $roles = Role::all();
        for($i = 0; $i < count($roles); $i++){
            $roles[$i]->permissions;
        }
        return $roles;
    }
}
