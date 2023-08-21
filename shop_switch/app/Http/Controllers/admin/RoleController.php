<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index(){
        $roles = Role::all();
        return response()->json($roles,200);
    }

    public function show(Role $role){
        $role->permissions;
        return response()->json([
            'rol' => $role,
//            'permissions'=>$permission
        ],200);

    }

    public function create(Request $request ){
        $rules = [
            'name' => 'required',
            'roles'=> 'required',
        ];
        $validator = \Validator::make($request->input(),$rules);
        if ($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ],400);
        }
        $role = Role::create(['name' => $request->name]);
        $role->syncPermissions($request->roles);

        return response()->json([
            'status' => true,
            'msg'=>'Rol Creado Correctamente'
        ],200);

    }

    public function update(Role $role,Request $request){
        $rules = [
            'name' => 'required',
            'roles'=> 'required',
        ];
        $validator = \Validator::make($request->input(),$rules);
        if ($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ],400);
        }
        $role->update($request->all());
        $role->syncPermissions($request->roles);

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
