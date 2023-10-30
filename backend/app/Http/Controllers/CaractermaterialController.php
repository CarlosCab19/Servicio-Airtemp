<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Caractermaterial;

class CaractermaterialController extends Controller
{
    //
    public function index(){
        $data = Caractermaterial::all();
        return response()->json($data, 200);
    }
    public function getList($id){
        $data = Caractermaterial::where('id_material', $id)->get();
        return response()->json($data, 200);
    }
    public function create(Request $request){
        $data['id_material'] = $request['id_material'];
        $data['caracteristica'] = $request['caracteristica'];
        $data['valor'] = $request['valor'];
        $data['estatus'] = $request['estatus'];
        $caractermaterial = Caractermaterial::create($data); // Crear el material y obtener el modelo

        $nuevoCaractermaterialID = $caractermaterial->id; // Obtener el ID del material recién creado

        return response()->json([
            'message' => "Successfully created",
            'id' => $nuevoCaractermaterialID, // Devolver el ID del material
            'success' => true
        ], 200);
    }
    public function update(Request $request,$id){
        $data['estatus'] = $request['estatus'];
        $data['valor'] = $request['valor'];
        Caractermaterial::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
    }
    public function get($id){
        $data = Caractermaterial::find($id);
        return response()->json($data, 200);
    }
    public function delete($id){
        $res = Caractermaterial::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
    }
}
