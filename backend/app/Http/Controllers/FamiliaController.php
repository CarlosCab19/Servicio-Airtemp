<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Familia;

class FamiliaController extends Controller
{
    //
    public function index(){
        $data = Familia::all();
        return response()->json($data, 200);
    }
}
