<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth-verify-role')->only('index','update','destroy','show');
    }
    public function index(Request $request){
        $users = User::all();
        for($i = 0; $i < count($users); $i++){
            $users[$i]->get_users();
        }
        return response()->json($users, 200);;

    }

    public function update(Request $request,User $user){
        if($request->has('active')){
            if($request->active == 1){
                $user->active = false;
                $user->tokens()->delete();
            }
            else{
                $user->active = true;
            }
            $user->save();
            return response()->json([
                'res' => true,
                'msg' => 'Usuario actualizado correctamente',
            ],200);
        }
        if($request->has('roles')){
            if(!$request->roles){
                return response()->json([
                    'res' => true,
                    'msg' => 'Debe seleccionar al menos un rol',
                ],400);
            }
            else{
                $user->roles()->sync($request->roles);
                return response()->json([
                    'res' => true,
                    'msg' => 'Usuario actualizado correctamente',
                ],200);
            }

        }

    }

    public function show(User $user){
        return response()->json($user);
    }

    public function destroy(User $user){
        $user->delete();
        return response()->json([
            'res' => true,
            'msg' => 'Usuario eliminado correctamente',
        ],200);
    }


}
