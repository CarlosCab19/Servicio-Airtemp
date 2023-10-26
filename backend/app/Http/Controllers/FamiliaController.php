<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Familia;

class FamiliaController extends Controller
{
    //
    public function index(){
        $data = Familia::all();
        return response()->json($data, 200);
    }
    public function get($id){
        $data = Familia::find($id);
        return response()->json($data, 200);
    }
    public function getByFamilia($familia) {
        $data = Familia::where('familia', $familia)->first();

        if ($data) {
            return response()->json($data, 200);
        } else {
            return response()->json(['message' => 'No se encontraron resultados'], 404);
        }
    }

}
