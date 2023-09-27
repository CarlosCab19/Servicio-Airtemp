<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Solicitud;

class SolicitudController extends Controller
{
    //
    public function index(){
        $solicitud=Solicitud::all();
        return $solicitud;
    }
    public function store(Request $request){
        $request->validate([
            'estatus' => 'required',
        ]);
        $solicitud = Solicitud::create($request->all());
        return $solicitud;
    }
    public function show(Solicitud $solicitud){
        return $solicitud;
    }
    public function update(Request $request){
        $request->validate([
            'estatus' => 'required',
        ]);
        $solicitud->update($request->all());
        return response()->noContent();
    }
    public function destroy(Solicitud $solicitud){
        $solicitud->delete();
        return response()->noContent();
    }
}
