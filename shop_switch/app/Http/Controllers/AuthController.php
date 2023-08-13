<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\PersonalAccessToken;

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

    public function verifyEmail(Request $request, $id, $hash)
    {
        $user_all = User::all();

        $user = $user_all->where('id', '=',$id)->first();
        if(!$user){
            return response()->json([
                'message' => 'URL Erronea'
            ], 400);
        }

        if ($hash != $user->hash) {
            return response()->json([
                'message' => 'URL Erronea'
            ], 400);
        }

        if (!$user->hasVerifiedEmail()){
            $user->markEmailAsVerified();
        }
        else{
            return response()->json([
                'message' => 'Este correo ya esta verificado.'
            ], 201);
        }

        return response()->json([
            'message' => 'Correo electrónico verificado con éxito.'
        ], 200);
    }


    public function login(Request $request ){
        $rules = [
            'email' => 'required',
            'password' => 'required',
        ];
        $validator = \Validator::make($request->input(),$rules);
        if ($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ],400);
        }
        $user = User::where('email', $request->email)->first();
        if(!$user){
            return response()->json([
                'status' => false,
                'msg' => 'Usuario o contrasenna incorrecta',
            ],401);
        }

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => false,
                'msg' => 'Usuario o contrasenna incorrecta',
            ],401);
        }

        $token = $user->createToken($request->email)->plainTextToken;
        return response()->json([
            'res' => true,
            'token' => $token,
            'data' => $user,
            'msg' => 'Usuario Logueado Correctamente'
        ],200);

    }

    public function verify_token(Request $request ){
        $token = $request->token;
        $record = PersonalAccessToken::findToken($token);
        if($record){
        return response()->json([
                'status' => false,
                'msg'=>'Token encontrado'
            ],200);
        }
        else{
            return response()->json([
                'status' => true,
                'msg'=>'Token no encontrado'
            ],400);
        }
    }


    public function logout(Request $request){
        $token = $request->bearerToken();
        $record = PersonalAccessToken::findToken($token);
        $record->delete();
        return response()->json([
            'res' => true,
            'msg' => 'Sesion cerrada',
        ],200);

    }




}
