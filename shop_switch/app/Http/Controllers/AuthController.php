<?php

namespace App\Http\Controllers;

use App\Models\PersonalAccessTokenInherit;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\PersonalAccessToken;
use UAParser\Parser;


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
        $user->assignRole('User');
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
        $agenteDeUsuario = $_SERVER["HTTP_USER_AGENT"];
        $parseador = Parser::create();
        $info = $parseador->parse($agenteDeUsuario);
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
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => false,
                'msg' => 'Usuario o contrasenna incorrecta',
            ],401);
        }

        $token = $user->createToken($request->email)->plainTextToken;
        $access = PersonalAccessToken::findToken($token);
        $access->info = $info->toString();
        $access->save();
//        $token->info = $info->toString();

//        $user->roles;
//        $user->get_permissions();

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

    public function forgot_password(Request $request){
        $rules = [
            'email' => 'required|email'
        ];
        $validator = \Validator::make($request->input(),$rules);
        if ($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ],400);
        }
        $user_all = User::all();
        $user = $user_all->where('email', '=', $request->email)->first();
        if(!$user){
            return response()->json([
                'status' => false,
                'msg' => 'Usuario no Encontrado',
            ],404);
        }

        $user->sendEmailForgotPassword();

        return response()->json([
            'status' => true,
            'msg' => 'Le enviamos el correo para que autentique su contrasenna',
        ],200);

    }

    public function reset_password(Request $request,$token){
        $rules = [
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
                'confirm_password' => 'La contraseña debe coincidir',
            ],400);
        }

        $search_reset = DB::table('password_reset_tokens')->where('token',$token)->first();
        if(!$search_reset){
            return response()->json([
                'status' => false,
                'msg' => 'Token No Valido',
            ],404);
        }
        else{
            $user_all = User::all();
            $user = $user_all->where('email','=',$search_reset->email)->first();
            $user->password = $request->password;
            $user->save();
            $search_delete = DB::table('password_reset_tokens')->where('token',$token)->delete();
            return response()->json([
                'status' => true,
                'msg' => 'Contrasenna correactamente modificada',
            ],200);

        }


    }
    public function profileGetDevices(User $user,Request $request){
        $token = $request->bearerToken();
        $access = PersonalAccessToken::findToken($token);
        $user_token = User::where('email', '=', $access->name)->first();
        if($user_token != $user ){
            return response()->json([
                'msg' => 'Forbidden'
            ], 403);
        }
        return response()->json([
            'devices'=>$user->tokens
        ]);

    }

    public function delete_session(PersonalAccessTokenInherit $token,Request $request){
        $user_logued = PersonalAccessTokenInherit::findUser($request->bearerToken());
        Auth::login($user_logued);
        $user_update = $token->tokenable;
        $this->authorize('update_user',$user_update);
        return $token->delete_token_user();
    }

    public function update(User $user, Request $request){
        $user_token = PersonalAccessTokenInherit::findUser($request->bearerToken());
        Auth::login($user_token);
        $this->authorize('update_user',$user);
        $rules = [
            'name' => 'required',
        ];
        $validator = \Validator::make($request->input(),$rules);
        if ($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ],400);
        }
        $user->name = $request->name;
        $user->save();
        return response()->json([
            'msg' => 'Usuario Actualizado correctamente',
            'user' => $user
        ], 200);


    }

    public function set_new_password(User $user, Request $request){
        $user_token = PersonalAccessTokenInherit::findUser($request->bearerToken());
        Auth::login($user_token);
        $this->authorize('update_user',$user);
        $rules = [
             "last_password"=>"required",
             "password"=>"required",
             "password_confirm"=>"required|same:password"
        ];
        $validator = \Validator::make($request->input(),$rules);
        if ($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ],400);
        }
        if (! Hash::check($request->last_password, $user->password)){
            return response()->json([
                'status' => false,
                'last_password' => 'Contrasenna Incorrecta'
            ],400);
        };

        $user->password = $request->password;
        $user->save();
        return response()->json([
            'status' => true,
            'last_password' => 'Contraseña cambiada exitosamente'
        ],200);
    }








}
