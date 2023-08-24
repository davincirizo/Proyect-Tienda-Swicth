<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\RoleInherit;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth-verify-role')->only('index','store','update','destroy','show');

    }
    public function index(){
        $roles = RoleInherit::getPermissions();
        return response()->json($roles,200);
    }

    public function show(Role $role){
        $role->permissions;
        return response()->json([
            'rol' => $role,
//            'permissions'=>$permission
        ],200);

    }

    public function store(Request $request ){
        $rules = [
            'name' => 'required',
            'permissions'=> 'required',
        ];
        $validator = \Validator::make($request->input(),$rules);
        if ($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ],400);
        }
        $role = Role::create(['name' => $request->name]);
        $role->syncPermissions($request->permissions);

        return response()->json([
            'status' => true,
            'msg'=>'Rol Creado Correctamente'
        ],200);

    }

    public function update(Role $role,Request $request){
        $rules = [
            'name' => 'required',
            'permissions'=> 'required',
        ];
        $validator = \Validator::make($request->input(),$rules);
        if ($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ],400);
        }
        $role->update($request->all());
        $role->syncPermissions($request->permissions);

        return response()->json([
            'status' => true,
            'msg'=>'Rol Actualizado Correctamente'
        ],200);

    }

    public function destroy(Role $role){
        $role->delete();
        return response()->json([
            'status' => true,
            'msg'=>'Rol Eliminado correctamente Correctamente'
        ],200);

    }

    public function get_permissions(){
        $permission = Permission::all();
        return response()->json($permission,200);
    }

}
