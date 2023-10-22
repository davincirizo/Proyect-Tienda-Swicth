<?php

namespace App\Http\Controllers\saler;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;


class ProductsController extends Controller
{
    public function index(){
        $products = Product::all_atrributes(['category','company','labels','user']);
        return response()->json([
            'products'=>$products
        ],200);;
    }

    public function show(Product $product){
        $product->category;
        $product->labels;
        return response()->json($product,200);;
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required',
            'category' => 'required',
            'company' => 'required',
            'user' => 'required',
        ];
        $validator = \Validator::make($request->input(),$rules);
        if ($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ],400);
        }
        $token = $request->bearerToken();
        $access = PersonalAccessToken::findToken($token);
        $user = User::where('email', '=', $access->name)->first();

        $product = new Product;
        $product->name = $request->name;
        $product->category = $request->category_id;
        $product->user = $user->id;
        $product->save();
        $product->labels()->sync($request->labels);
        return response()->json([
            'res' => true,
            'msg' => 'Producto creado correctamente',
        ],200);
    }

    public function update(Request $request,Product $product){
        $rules = [
            'name' => 'required',
            'category_id' => 'required',
            'price' => 'required',
            'quantity' => 'required',
        ];
        $validator = \Validator::make($request->input(),$rules);
        if ($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ],400);
        }
        $product->name = $request->name;
        $product->price = $request->price;
        $product->quantity = $request->quantity;
        $product->category_id = $request->category_id;
        $product->labels()->sync($request->labels);
        return response()->json([
            'res' => true,
            'msg' => 'Producto actualizado correctamente',
        ],200);

    }

    public function destroy(Product $product){
        $product->delete();
        return response()->json([
            'res' => true,
            'msg' => 'Producto eliminado correctamente',
        ],200);
    }
}
