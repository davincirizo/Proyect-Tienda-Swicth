<?php

use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\UserController;
use App\Http\Controllers\admin\RoleController;
use App\Http\Controllers\admin\PermissionsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\LabelController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\saler\ProductsController;


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
    Route::get('profile/getDevices/{user}',[AuthController::class,'profileGetDevices']);
    Route::delete('profile/delete_session/{token}',[AuthController::class,'delete_session']);

    Route::get('admin/categories',[CategoryController::class,'index'])->name('admin.categories.index');
    Route::post('admin/categories',[CategoryController::class,'store'])->name('admin.categories.store');
    Route::put('admin/categories/{category}/',[CategoryController::class,'update'])->name('admin.categories.update');
    Route::delete('admin/categories/{category}/',[CategoryController::class,'destroy'])->name('admin.categories.destroy');

    Route::get('admin/users',[UserController::class,'index'])->name('admin.users.index');
    Route::put('admin/users/{user}/',[UserController::class,'update'])->name('admin.users.update');
    Route::delete('admin/users/{user}/',[UserController::class,'destroy'])->name('admin.users.destroy');
    Route::get('admin/users/{user}/',[UserController::class,'show'])->name('admin.users.show');
    Route::delete('admin/users/delete_token/{token}/',[UserController::class,'delete_token'])->name('admin.users.delete_token');
    Route::get('admin/users/show_tokens/{user}',[UserController::class,'show_token'])->name('admin.users.show_tokens');
    Route::put('admin/users/active_user/{user}',[UserController::class,'active_user'])->name('admin.users.active_user');


    Route::get('admin/roles',[RoleController::class,'index'])->name('admin.roles.index');
    Route::get('admin/roles/{role}',[RoleController::class,'show'])->name('admin.roles.show');
    Route::put('admin/roles/{role}',[RoleController::class,'update'])->name('admin.roles.update');
    Route::post('admin/roles',[RoleController::class,'store'])->name('admin.roles.create');
    Route::delete('admin/roles/{role}',[RoleController::class,'destroy'])->name('admin.roles.destroy');
    Route::get('admin/roles/getpermissions',[RoleController::class,'getpermissions'])->name('admin.roles.getpermissions');

    Route::get('admin/permissions',[PermissionsController::class,'index'])->name('admin.permissions.index');

    Route::get('admin/labels',[LabelController::class,'index'])->name('admin.labels.index');
    Route::get('admin/labels/{label}',[LabelController::class,'show'])->name('admin.labels.show');
    Route::put('admin/labels/{label}',[LabelController::class,'update'])->name('admin.labels.update');
    Route::post('admin/labels',[LabelController::class,'store'])->name('admin.labels.create');
    Route::delete('admin/labels/{label}',[LabelController::class,'destroy'])->name('admin.labels.destroy');

    Route::get('saler/products',[ProductsController::class,'index'])->name('saler.products.index');
    Route::get('saler/products/{product}',[ProductsController::class,'show'])->name('saler.products.show');
    Route::put('saler/products/{product}',[ProductsController::class,'update'])->name('saler.products.update');
    Route::post('saler/products',[ProductsController::class,'store'])->name('saler.products.create');
    Route::delete('saler/products/{product}',[ProductsController::class,'destroy'])->name('saler.products.destroy');



});

Route::group(['middleware' => ['auth-verify-email']],function(){
    Route::post('login',[AuthController::class,'login']);
    Route::post('/forgot-password', [AuthController::class,'forgot_password']);
});








