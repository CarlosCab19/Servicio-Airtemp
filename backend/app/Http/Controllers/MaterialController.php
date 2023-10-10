<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Material;

class MaterialController extends Controller
{

    public function getList($id){
        $data = Material::where('id_solicitud', $id)->get();
        return response()->json($data, 200);
    }
    public function create(Request $request){
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
      }
      public function delete($id){
        $res = Material::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
      }


}
