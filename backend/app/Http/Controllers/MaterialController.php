<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Material;

class MaterialController extends Controller
{
    //
    public function index(){
        $material=Material::all();
        return $material;
    }
    public function store(Request $request){
        $request->validate([
            'descripcion' => 'required',
            'familia' => 'required',
            'caracterone' => 'required',
            'caractertwo' => 'required',
        ]);
        $material = Material::create($request->all());
        return $material;
    }
    public function show(Material $material){
        return $material;
    }
    public function update(Request $request){
        $request->validate([
            'descripcion' => 'required',
            'familia' => 'required',
            'caracterone' => 'required',
            'caractertwo' => 'required',
        ]);
        $material->update($request->all());
        return response()->noContent();
    }
    public function destroy(Material $material){
        $material->delete();
        return response()->noContent();
    }
}
