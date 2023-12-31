<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth-verify-role')->only('index','store','update','destroy');

    }

    public function index(){
        $categories = Category::all();
        return response()->json($categories,200);;
    }

    public function store(Request $request)
    {
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
        $category = Category::create($request->all());
        return response()->json([
            'res' => true,
            'msg' => 'Categoria creada correctamente',
            'category' => $category
        ],200);
    }

    public function update(Request $request,Category $category){
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
        if($category) {
            $category->update($request->all());
            return response()->json([
                'res' => true,
                'msg' => 'Categoria actualizada correctamente',
                'category' => $category
            ],200);
        }
        else{
            return response()->json([
                'res' => true,
                'msg' => 'Esta Categoria no Existe',
            ],404);
        }
    }


    public function destroy(Category $category){
        $category->delete();
        return response()->json([
            'res' => true,
            'msg' => 'Categoria eliminada correctamente',
        ],200);
    }
}
