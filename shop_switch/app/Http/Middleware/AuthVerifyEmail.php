<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthVerifyEmail
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $user_all = User::all();

        $user = $user_all->where('email', '=',$request->email)->first();
        if($user){
            if(!$user->email_verified_at){
                return response()->json([
                    'msg' => 'Este usuario no esta confirmado'
                ], 401);
            }
            else{
                return $next($request);
            }
        }
        else{
            return $next($request);
        }

    }
}
