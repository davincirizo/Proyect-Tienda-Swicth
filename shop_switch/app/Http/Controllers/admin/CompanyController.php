<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth-verify-role')->only('index','update','destroy','create');
    }
    public function index(){
        $companies = Company::all_atrributes(['users']);
        $users = User::all()->where('active' ,'=', 1);
        return response()->json([
            'res' => true,
            'companies' => $companies,
            'users'=>$users
        ], 200);
    }

    public function store(Request $request){
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
        $company = Company::create([
            'name' => $request->name,
            'description'=> $request->description
        ]);
        $company->syncUsers(json_decode(request('users')));
        if($request->file('image')){
            $file = $request->file('image');
            $url = Storage::put('company',$file);
            $company->image = $url;
        }
        $company->save();
        $company->id_atrributes(['users']);
        return response()->json([
            'res' => true,
            'msg'=>'Compañia creada correctamente',
            'company' => $company
        ], 200);
    }

    public function update(Request $request,Company $company){
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
        $company->update([
            'name'=>$request->name,
            'description'=> $request->description
        ]);
        $company->syncUsers(json_decode(request('users')));
        if($request->file('image')){
            $company->image ? Storage::delete($company->image):null;
            $file = $request->file('image');
            $url = Storage::put('company',$file);
            $company->image = $url;
        }
        $company->save();
        $company->id_atrributes(['users']);
        return response()->json([
            'res' => true,
            'msg'=>'Compañia actualizada correctamente',
            'company' => $company
        ], 200);


    }

    public function delete(Company $company){
        $company->image ? Storage::delete($company->image):null;
        $company->delete();
        return response()->json([
            'res' => true,
            'msg'=>'Compañia eliminada correctamente',
        ], 200);
    }


}
