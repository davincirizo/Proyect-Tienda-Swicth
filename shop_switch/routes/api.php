<?php

use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\UserController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register',[AuthController::class,'register']);
Route::get('email/verify/{id}/{hash}', [AuthController::class,'verifyEmail']);
Route::post('/reset-password/{token}',[AuthController::class,'reset_password']);
Route::post('verify_token',[AuthController::class,'verify_token']);


Route::group(['middleware' => ['auth-user']],function(){
    Route::post('logout',[AuthController::class,'logout']);
});

Route::group(['middleware' => ['auth-verify-email']],function(){
    Route::post('login',[AuthController::class,'login']);
    Route::post('/forgot-password', [AuthController::class,'forgot_password']);
});

Route::get('admin/categories',[CategoryController::class,'index']);
Route::post('admin/categories',[CategoryController::class,'store']);
Route::put('admin/categories/{category}/',[CategoryController::class,'update']);
Route::delete('admin/categories/{category}/',[CategoryController::class,'destroy']);
Route::get('admin/categories/{category}/',[CategoryController::class,'show']);

Route::get('admin/users',[UserController::class,'index']);
Route::put('admin/users/{user}/',[UserController::class,'update']);
Route::delete('admin/users/{user}/',[UserController::class,'destroy']);
Route::get('admin/users/{user}/',[UserController::class,'show']);



