<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Caracteristica;

class CaracteristicaController extends Controller
{
    //
    public function index(){
        $data = Caracteristica::all();
        return response()->json($data, 200);
    }
    public function getList($id){
        $data = Caracteristica::where('id_familia', $id)->get();
        return response()->json($data, 200);
    }

    public function get($id){
        $data = Caracteristica::find($id);
        return response()->json($data, 200);
    }

}
