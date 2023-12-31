<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cotizacion;

class CotizacionController extends Controller
{
    //
    public function index(){
        $data = Cotizacion::all();
        return response()->json($data, 200);
    }
    public function getList($id){
        $data = Cotizacion::where('id_material', $id)->get();
        return response()->json($data, 200);
    }
    public function create(Request $request){
        $data['id_material'] = $request['id_material'];
        $data['id_analista'] = $request['id_analista'];
        $data['id_director'] = $request['id_director'];
        $data['moneda'] = $request['moneda'];
        $data['fabricacion'] = $request['fabricacion'];
        $data['lme'] = $request['lme'];
        $data['premium'] = $request['premium'];
        $data['total'] = $request['total'];
        $data['icoterm'] = $request['icoterm'];
        $data['adicional'] = $request['adicional'];
        $data['nota'] = $request['nota'];
        $data['vence'] = $request['vence'];
        $data['estatus'] = $request['estatus'];
        $cotizacion = Cotizacion::create($data); // Crear el material y obtener el modelo

        $nuevoCotizacionID = $cotizacion->id; // Obtener el ID del material recién creado

        return response()->json([
            'message' => "Successfully created",
            'id' => $nuevoCotizacionID, // Devolver el ID del material
            'success' => true
        ], 200);
    }
    public function update(Request $request,$id){
        $data['estatus'] = $request['estatus'];
        $data['id_director'] = $request['id_director'];
        Cotizacion::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
      }
      /*public function updateDirector(Request $request,$id){
        $data['id_director'] = $request['id_director'];
        Cotizacion::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
      }*/
    public function get($id){
        $data = Cotizacion::find($id);
        return response()->json($data, 200);
      }

    public function delete($id){
        $res = Cotizacion::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
      }
}
