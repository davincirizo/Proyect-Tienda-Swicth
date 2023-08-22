<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;

class PermissionsController extends Controller
{
    public function index(){
        $permission = Permission::all();
        $models = $permission->pluck('models')->toArray();
        $uniqueModels = collect($models)->unique()->values()->all();
        return response()->json([
            'permission' =>  $permission,
            'models'=>$uniqueModels
            ],200);
    }
}
