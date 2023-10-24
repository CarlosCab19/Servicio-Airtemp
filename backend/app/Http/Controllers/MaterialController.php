<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Material;

class MaterialController extends Controller
{
    public function index(){
        $data = Material::all();
        return response()->json($data, 200);
    }
    public function getList($id){
        $data = Material::where('id_solicitud', $id)->get();
        return response()->json($data, 200);
    }
    /*public function create(Request $request){
        $data['id_solicitud'] = $request['id_solicitud'];
        $data['descripcion'] = $request['descripcion'];
        $data['familia'] = $request['familia'];
        $data['caracterone'] = $request['caracterone'];
        $data['caractertwo'] = $request['caractertwo'];
        Material::create($data);
        return response()->json([
            'message' => "Successfully created",
            'success' => true
        ], 200);
      }*/

      public function create(Request $request){
        $data['id_solicitud'] = $request['id_solicitud'];
        $data['descripcion'] = $request['descripcion'];
        $data['familia'] = $request['familia'];
        $data['caracterone'] = $request['caracterone'];
        $data['caractertwo'] = $request['caractertwo'];
        $data['caracterthree'] = $request['caracterthree'];
        $data['otra'] = $request['otra'];
        $data['estatus'] = $request['estatus'];
        $material = Material::create($data); // Crear el material y obtener el modelo

        $nuevoMaterialID = $material->id; // Obtener el ID del material recién creado

        return response()->json([
            'message' => "Successfully created",
            'id' => $nuevoMaterialID, // Devolver el ID del material
            'success' => true
        ], 200);
    }
    public function update(Request $request,$id){
        $data['estatus'] = $request['estatus'];
        Material::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
      }

    public function get($id){
        $data = Material::find($id);
        return response()->json($data, 200);
      }

    public function delete($id){
        $res = Material::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
      }


}
