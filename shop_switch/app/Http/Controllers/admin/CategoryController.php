<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(){
        $categories = Category::all();
        return response()->json($categories);
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
            ],200);
        }
        else{
            return response()->json([
                'res' => true,
                'msg' => 'Categoria no encontarda',
            ],400);
        }
    }

    public function show(Category $category){
        return response()->json($category);
    }

    public function destroy(Category $category){
        $category->delete();
        return response()->json([
            'res' => true,
            'msg' => 'Categoria eliminada correctamente',
        ],200);
    }
}
