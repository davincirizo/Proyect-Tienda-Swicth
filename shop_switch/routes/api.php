<?php

use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\UserController;
use App\Http\Controllers\admin\RoleController;
use App\Http\Controllers\admin\PermissionsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\LabelController;
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
    Route::get('admin/categories',[CategoryController::class,'index'])->name('admin.categories.index');
    Route::post('admin/categories',[CategoryController::class,'store'])->name('admin.categories.store');
    Route::put('admin/categories/{category}/',[CategoryController::class,'update'])->name('admin.categories.update');
    Route::delete('admin/categories/{category}/',[CategoryController::class,'destroy'])->name('admin.categories.destroy');

    Route::get('admin/users',[UserController::class,'index'])->name('admin.users.index');
    Route::put('admin/users/{user}/',[UserController::class,'update'])->name('admin.users.update');
    Route::delete('admin/users/{user}/',[UserController::class,'destroy'])->name('admin.users.destroy');
    Route::get('admin/users/{user}/',[UserController::class,'show'])->name('admin.users.show');

    Route::get('admin/roles',[RoleController::class,'index'])->name('admin.roles.index');
    Route::get('admin/roles/{role}',[RoleController::class,'show'])->name('admin.roles.show');
    Route::put('admin/roles/{role}',[RoleController::class,'update'])->name('admin.roles.update');
    Route::post('admin/roles',[RoleController::class,'create'])->name('admin.roles.create');
    Route::delete('admin/roles/{role}',[RoleController::class,'destroy'])->name('admin.roles.destroy');

    Route::get('admin/permissions',[PermissionsController::class,'index'])->name('admin.permissions.index');

    Route::get('admin/labels',[LabelController::class,'index'])->name('admin.labels.index');
    Route::get('admin/labels/{role}',[LabelController::class,'show'])->name('admin.labels.show');
    Route::put('admin/labels/{role}',[LabelController::class,'update'])->name('admin.labels.update');
    Route::post('admin/labels',[LabelController::class,'create'])->name('admin.labels.create');
    Route::delete('admin/labels/{role}',[LabelController::class,'destroy'])->name('admin.labels.destroy');



});

Route::group(['middleware' => ['auth-verify-email']],function(){
    Route::post('login',[AuthController::class,'login']);
    Route::post('/forgot-password', [AuthController::class,'forgot_password']);
});








