<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Solicitud;
use App\Http\Requests\UpdateSolicitudRequest;
use App\Http\Requests\SolicitudRequest;

class SolicitudController extends Controller
{
    //
    public function index(){
        $data = Solicitud::all();
        return response()->json($data, 200);
    }
    public function getList($id){
        $data = Solicitud::where('id_usuario', $id)->get();
        return response()->json($data, 200);
    }
    public function create(Request $request){
        $data['id_usuario'] = $request['id_usuario'];
        $data['solicitante'] = $request['solicitante'];
        $data['codProv'] = $request['codProv'];
        $data['Rsocial'] = $request['Rsocial'];
        $data['NomCliente'] = $request['NomCliente'];
        $data['NumParte'] = $request['NumParte'];
        $data['estatus'] = $request['estatus'];
        Solicitud::create($data);
        return response()->json([
            'message' => "Successfully created",
            'success' => true
        ], 200);
      }
      public function delete($id){
        $res = Solicitud::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
      }
      public function get($id){
        $data = Solicitud::find($id);
        return response()->json($data, 200);
      }
      public function update(Request $request,$id){
        $data['estatus'] = $request['estatus'];
        Solicitud::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
      }


}
