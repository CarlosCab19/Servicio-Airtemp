<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Personal;
Use Log;

class PersonalController extends Controller
{
    public function getAll(){
        $data = Personal::get();
        return response()->json($data, 200);
    }
    /*public function getActivos() {
        $data = Personal::where('estatus', 'Inactivo')->get();
        return response()->json($data, 200);
    }*/

      public function create(Request $request){
        $data['nombres'] = $request['nombres'];
        $data['apellidos'] = $request['apellidos'];
        $data['departamento'] = $request['departamento'];
        $data['usuario'] = $request['usuario'];
        $data['contra'] = $request['contra'];
        $data['estatus'] = $request['estatus'];
        Personal::create($data);
        return response()->json([
            'message' => "Successfully created",
            'success' => true
        ], 200);
      }

      public function delete($id){
        $res = Personal::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
      }

      public function get($id){
        $data = Personal::find($id);
        return response()->json($data, 200);
      }

      public function update(Request $request,$id){
        $data['nombres'] = $request['nombres'];
        $data['apellidos'] = $request['apellidos'];
        $data['departamento'] = $request['departamento'];
        $data['usuario'] = $request['usuario'];
        $data['contra'] = $request['contra'];
        $data['estatus'] = $request['estatus'];
        Personal::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
      }
}
