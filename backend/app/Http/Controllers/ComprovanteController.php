<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comprovante;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;

class ComprovanteController extends Controller
{
    //
    public function getAll(){
        $data = Comprovante::get();
        return response()->json($data, 200);
    }
    public function getOne($id){
        $data = Comprovante::where('id_cotizacion', $id)->get();
        return response()->json($data, 200);
    }
   public function store(Request $request){
        $request->validate([
            'archivo' => 'required|mimes:pdf|max:2048',
        ]);

        $nombre = time() . '_' . $request->file('archivo')->getClientOriginalName();
        //$ruta = $request->file('archivo')->storeAs('archivos', $nombre);
        $ruta = $request->file('archivo')->storeAs($nombre);
        Comprovante::create([
            //'id_cotizacion' => $idCotizacion,
            'nombre' => $nombre,
            'ruta' => $ruta,
         ]);

        return response()->json(['message' => 'Archivo subido exitosamente', 'archivo' => $nombre, 'nombre'=> $nombre,'ruta'=>$ruta], 200);
    }

    public function show($nombre)
    {
        // Encuentra el archivo por su nombre
        $comprovante = Comprovante::where('nombre', $nombre)->first();

        if (!$comprovante) {
            return response()->json(['message' => 'Archivo no encontrado'], 404);
        }

        // Obtén la ruta del archivo
        //$ruta = storage_path('app/' . $archivo->ruta);
        $ruta = public_path('comprobantes/' . $comprovante->ruta);

        // Verifica que el archivo exista en la ruta de almacenamiento
        if (!file_exists($ruta)) {
            return response()->json(['message' => 'El archivo no se encuentra en la ruta de almacenamiento'], 404);
        }

        // Devuelve el archivo como respuesta
        return Response::file($ruta);
    }
    public function showOne($idCotizacion){
    // Encuentra el archivo por id_cotizacion
    $comprovante = Comprovante::where('id_cotizacion', $idCotizacion)->first();

    if (!$comprovante) {
        return response()->json(['message' => 'Archivo no encontrado'], 404);
    }

    // Obtén la ruta del archivo
    $ruta = public_path('comprobantes/' . $comprovante->ruta);

    // Verifica que el archivo exista en la ruta de almacenamiento
    if (!file_exists($ruta)) {
        return response()->json(['message' => 'El archivo no se encuentra en la ruta de almacenamiento'], 404);
    }

    // Devuelve el archivo como respuesta
    return Response::file($ruta);
    }


    public function eliminarArchivo($nombre){
        // Encuentra el archivo por su nombre
        $comprovante = Comprovante::where('nombre', $nombre)->first();
        $nombreEliminar = $nombre;
        if (!$comprovante) {
            return response()->json(['message' => 'Archivo no encontrado'], 404);
        }

        // Elimina el archivo de almacenamiento
        Storage::delete($comprovante->ruta);
        $rutaAEliminar =$comprovante->ruta;

        // Elimina el registro de la base de datos
        $comprovante->delete();

        return response()->json(['message' => 'Archivo eliminado exitosamente','ruta_eliminada' => $rutaAEliminar,'nombre_eliminar: ' =>$nombreEliminar], 200);
    }
}
