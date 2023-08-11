<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function register(Request $request){
        $rules = [
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'password' => 'required',
            'confirm_password' => 'required'
        ];
        $validator = \Validator::make($request->input(),$rules);
        if ($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ],400);
        }
        if($request->password != $request->confirm_password){
            return response()->json([
                'status' => false,
                'errors' => 'La contraseña debe coincidir',
            ],400);
        }
        $user = new User();
        if($request->file('image')){
            $file = $request->file('image');
            $url = Storage::put('users',$file);
            $user->image = $url;
        }
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->save();
        $user->sendEmailVerification();


        return response()->json([
            'res' => true,
            'msg' => 'Se ha enviado Mensaje a su corre Revise para confirmar'
        ],200);


    }
}
