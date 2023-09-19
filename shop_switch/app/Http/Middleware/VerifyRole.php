<?php

namespace App\Http\Middleware;

use App\Models\PersonalAccessTokenInherit;
use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class VerifyRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $route = $request->route()->getName();
        $token = $request->bearerToken();
        $user = PersonalAccessTokenInherit::findUser($token);
        foreach ($user->roles as $role) {
            foreach ($role->permissions as $permission) {
                if($permission->name == $route){
                    return $next($request);
                }
            }

        }
        return response()->json([
        'status' => false,
        'msg' => 'Forbidden',
    ],403);

    }
}
