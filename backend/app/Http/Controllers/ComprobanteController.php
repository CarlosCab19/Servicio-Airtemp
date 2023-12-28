<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comprobante;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class ComprobanteController extends Controller
{
    //
    public function getAll(){
        $data = Comprobante::get();
        return response()->json($data, 200);
    }
    public function getOne($id){
        $data = Comprobante::where('id_cotizacion', $id)->get();
        return response()->json($data, 200);
    }

    public function store(Request $request){
        $request->validate([
            'id_cotizacion' => 'required',
            'archivo' => 'required|mimes:pdf|max:2048',
        ]);

        $nombre = time() . '_' . $request->file('archivo')->getClientOriginalName();
        $ruta = $request->file('archivo')->storeAs('comprobantes', $nombre);

        Comprobante::create([
            'id_cotizacion' => $request->input('id_cotizacion'),
            'nombre' => $nombre,
            'ruta' => $ruta,
        ]);

        return response()->json([
            'message' => 'Archivo subido exitosamente',
            'id_cotizacion' => $request->input('id_cotizacion'),
            'nombre' => $nombre,
            'ruta' => $ruta
        ], 200);
    }

    public function showOne($idCotizacion){
        // Encuentra el archivo por id_cotizacion
        $comprobante = Comprobante::where('id_cotizacion', $idCotizacion)->first();

        if (!$comprobante) {
            return response()->json(['message' => 'Archivo no encontrado'], 404);
        }

        // Obtén la ruta del archivo
        $ruta = storage_path('comprobantes/' . $comprobante->ruta);

        // Verifica que el archivo exista en la ruta de almacenamiento
        if (!file_exists($ruta)) {
            return response()->json(['message' => 'El archivo no se encuentra en la ruta de almacenamiento'], 404);
        }

        // Devuelve el archivo como respuesta
        return Response::file($ruta);
    }

    public function eliminarArchivo($idCotizacion){
        // Encuentra el archivo por id_cotizacion
        $comprobante = Comprobante::where('id_cotizacion', $idCotizacion)->first();
        $nombreEliminar = $comprobante ? $comprobante->nombre : null;

        if (!$comprobante) {
            return response()->json(['message' => 'Archivo no encontrado'], 404);
        }

        // Elimina el archivo de almacenamiento
        Storage::delete($comprobante->ruta);
        $rutaAEliminar = $comprobante->ruta;

        // Elimina el registro de la base de datos
        $comprobante->delete();

        return response()->json(['message' => 'Archivo eliminado exitosamente', 'ruta_eliminada' => $rutaAEliminar, 'nombre_eliminar' => $nombreEliminar], 200);
    }
    public function editarArchivo(Request $request, $idCotizacion){
        // Valida la solicitud
        $request->validate([
            'archivo' => 'required|mimes:pdf|max:2048',
        ]);
        //var_dump($request->file('archivo'));

        // Encuentra el archivo por id_cotizacion
        $comprobante = Comprobante::where('id_cotizacion', $idCotizacion)->first();

        if (!$comprobante) {
            return response()->json(['message' => 'Archivo no encontrado'], 404);
        }

        // Elimina el archivo actual de almacenamiento
        Storage::delete($comprobante->ruta);

        // Sube el nuevo archivo
        $nombreNuevo = time() . '_' . $request->file('archivo')->getClientOriginalName();
        $rutaNueva = $request->file('archivo')->storeAs('comprobantes', $nombreNuevo);

        // Actualiza los datos en la base de datos
        $comprobante->update([
            'nombre' => $nombreNuevo,
            'ruta' => $rutaNueva,
        ]);

        return response()->json([
            'message' => 'Archivo actualizado exitosamente',
            'id_cotizacion' => $comprobante->id_cotizacion,
            'nombre' => $nombreNuevo,
            'ruta' => $rutaNueva,
            'id'=>$idCotizacion,
            'archivooo'=>$request
        ], 200);
    }


    /*public function eliminarArchivo($nombre){
        // Encuentra el archivo por su nombre
        $comprobante = Comprovante::where('nombre', $nombre)->first();
        $nombreEliminar = $nombre;
        if (!$comprobante) {
            return response()->json(['message' => 'Archivo no encontrado'], 404);
        }

        // Elimina el archivo de almacenamiento
        Storage::delete($comprobante->ruta);
        $rutaAEliminar =$comprobante->ruta;

        // Elimina el registro de la base de datos
        $comprobante->delete();

        return response()->json(['message' => 'Archivo eliminado exitosamente','ruta_eliminada' => $rutaAEliminar,'nombre_eliminar: ' =>$nombreEliminar], 200);
    }*/
    /*public function show($nombre)
    {
        // Encuentra el archivo por su nombre
        $comprobante = Comprovante::where('nombre', $nombre)->first();

        if (!$comprobante) {
            return response()->json(['message' => 'Archivo no encontrado'], 404);
        }

        // Obtén la ruta del archivo
        $ruta = public_path('comprobantes/' . $comprobante->ruta);

        // Verifica que el archivo exista en la ruta de almacenamiento
        if (!file_exists($ruta)) {
            return response()->json(['message' => 'El archivo no se encuentra en la ruta de almacenamiento'], 404);
        }

        // Devuelve el archivo como respuesta
        return Response::file($ruta);
    }*/

}
