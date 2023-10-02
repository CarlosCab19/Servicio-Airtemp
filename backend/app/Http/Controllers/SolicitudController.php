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
        $solicitud=Solicitud::all();
        return $solicitud;
    }
    public function store(SolicitudRequest $request){
        $request->validate([
            'estatus' => 'required',
        ]);
        $solicitud = Solicitud::create($request->all());
        return $solicitud;
    }
    public function show(Solicitud $solicitud){
        return $solicitud;
    }
    public function update(UpdateSolicitudRequest $request, Solicitud $solicitud){
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
