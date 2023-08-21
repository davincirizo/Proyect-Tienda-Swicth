<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;

class PermissionsController extends Controller
{
    public function index(){
        $permission = Permission::all();
        return response()->json($permission,200);
    }
}
