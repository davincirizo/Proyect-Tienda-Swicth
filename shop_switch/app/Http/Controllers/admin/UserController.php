<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(){
        $users = User::all();
        return response()->json($users);
    }

    public function update(Request $request,User $user){
        $rules = [
            'name' => 'required',
            'email' => 'required'
        ];
        $validator = \Validator::make($request->input(),$rules);
        if ($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ],400);
        }
        if($user) {
            $user->update($request->all());
            return response()->json([
                'res' => true,
                'msg' => 'Usuario actualizado correctamente',
            ],200);
        }
        else{
            return response()->json([
                'res' => true,
                'msg' => 'Usuario no encontarda',
            ],400);
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
