<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\PersonalAccessTokenInherit;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Laravel\Sanctum\PersonalAccessToken;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth-verify-role')->only('index','update','destroy','show','delete_token','show_token','active_user');
    }

    public function index(){
        $roles = Role::all();
        $users = User::all();

        return response()->json([
            'users'=>$users,
            'roles'=>$roles
        ], 200);;

    }

    public function update(Request $request,User $user){
        if($request->has('roles')){
            if(!$request->roles){
                return response()->json([
                    'res' => true,
                    'msg' => 'Debe seleccionar al menos un rol',
                ],400);
            }
            else{
                $user->roles()->sync($request->roles);
                $user->refresh();
                return response()->json([
                    'res' => true,
                    'msg' => 'Usuario actualizado correctamente',
                    'user' => $user
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

    public function delete_token(PersonalAccessTokenInherit $token){
        return $token->delete_token_user();
    }

    public function show_token(User $user){
        $tokens = $user->tokens;
        return response()->json([
            'res' => true,
            'tokens' => $tokens,
        ], 200);
    }

    public function active_user(User $user,Request $request){
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
                'msg' => 'Usuario activado correctamente',
                'user'=>$user
            ],200);
    }

}
