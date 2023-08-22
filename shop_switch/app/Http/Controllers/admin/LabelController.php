<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Label;
use Illuminate\Http\Request;

class LabelController extends Controller
{
    public function index(){
        $labels = Label::getAllLabels();
        return $labels;
    }

    public function create(Request $request){
        $rules = [
            'name' => 'required',
            'category_id' => 'required'
        ];
        $validator = \Validator::make($request->input(),$rules);
        if ($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ],400);
        }
        Label::create($request->all());

        return response()->json([
            'res' => true,
            'msg' => 'Label creada correctamente',
        ],200);
    }
}
