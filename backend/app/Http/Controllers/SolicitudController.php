<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Log;
use App\Models\Solicitud;

class SolicitudController extends Controller
{
    //
    public function getAll(){
        $data = Solicitud::get();
        return response()->json($data, 200);
    }

    public function create(Request $request){
        try{
            DB::beginTransaction();
            $reg=new Solicitud;
            $reg->fechasolicitud=$request->get('fechasolicitud');
            $reg->estatus=$request->get('estatus');
            $reg->solicitante=$request->get('solicitante');
            $reg->codigoproveedor=$request->get('codigoproveedor');
            $reg->razonsocial=$request->get('razonsocial');
            $reg->codigo=$request->get('codigo');
            $reg->descripcion=$request->get('descripcion');
            $reg->tipofamilia=$request->get('tipofamilia');
            $reg->caracteristicaone=$request->get('caracteristicaone');
            $reg->caracteristicatwo=$request->get('caracteristicatwo');
            $reg->caracteristicathree=$request->get('caracteristicathree');
            $reg->caracteristicafour=$request->get('caracteristicafour');
            $reg->caracteristicafive=$request->get('caracteristicafive');
            $reg->nombrecliente=$request->get('nombrecliente');
            $reg->numparte=$request->get('numparte');
            if($request->hasFile('pdf')){
                $archivo=$request->file('pdf');
                $archivo->move(public_path().'/Documentos/',$archivo->getClientOriginalName());
                $reg->documentos=$archivo->getClientOriginalName();
            }
            $reg->save();
            DB::commit();
        }catch (Exeption $e){
            DB::rollback();
        }
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

    }
}
