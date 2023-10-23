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
    public function getNueva(){
        $data = Solicitud::where('estatus', 'Nueva')->get();
        return response()->json($data, 200);
    }
    public function getCotizado(){
        $data = Solicitud::where('estatus', 'Cotizado')->get();
        return response()->json($data, 200);
    }
    public function getAprovado(){
        $data = Solicitud::where('estatus', 'NuevaAprovado')->get();
        return response()->json($data, 200);
    }
    public function getList($id){
        $data = Solicitud::where('id_usuario', $id)->get();
        return response()->json($data, 200);
    }
    public function create(Request $request){
        $data['id_usuario'] = $request['id_usuario'];
        $data['solicitante'] = $request['solicitante'];
        $data['tipo'] = $request['tipo'];
        $data['codProv'] = $request['codProv'];
        $data['Rsocial'] = $request['Rsocial'];
        $data['NomCliente'] = $request['NomCliente'];
        $data['NumParte'] = $request['NumParte'];
        $data['id_analista'] = $request['id_analista'];
        $data['id_director'] = $request['id_director'];
        $data['estatus'] = $request['estatus'];

        $solicitud = Solicitud::create($data); //se crea la solicitud y se obtiene el modelo
        $nuevaSolicitudID = $solicitud->id; // Obtener el ID de la solicitud recién creada

        return response()->json([
            'message' => "Successfully created",
            'id' => $nuevaSolicitudID, // Devolver el ID del material
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
      public function updateAnalista(Request $request,$id){
        $data['id_analista'] = $request['id_analista'];
        Solicitud::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
      }
      public function updateDirector(Request $request,$id){
        $data['id_director'] = $request['id_director'];
        Solicitud::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
      }


}
