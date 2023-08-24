<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Label;
use Illuminate\Http\Request;

class LabelController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth-verify-role')->only('index','store','update','destroy');

    }
    public function index()
    {
        $labels = Label::getAllLabels();
        return $labels;
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required',
            'category_id' => 'required'
        ];
        $validator = \Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ], 400);
        }
        Label::create($request->all());

        return response()->json([
            'res' => true,
            'msg' => 'Etiqueta creada correctamente',
        ], 200);
    }

    public function update(Request $request, Label $label)
    {
        $rules = [
            'name' => 'required',
            'category_id' => 'required'
        ];
        $validator = \Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ], 400);
        }
        $label->update($request->all());
        return response()->json([
            'res' => true,
            'msg' => 'Etiqueta actualizada correctamente',
        ], 200);
    }

    public function destroy(Label $label){
        $label->delete();
        return response()->json([
            'res' => true,
            'msg' => 'Etiqueta eliminada correctamente',
        ], 200);
    }
}
