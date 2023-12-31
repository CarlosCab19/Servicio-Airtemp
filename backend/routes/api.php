<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PersonalController;
use App\Http\Controllers\SolicitudController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\CotizacionController;
use App\Http\Controllers\FamiliaController;
use App\Http\Controllers\CaracteristicaController;
use App\Http\Controllers\CaractermaterialController;
use App\Http\Controllers\ComprobanteController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::apiResource('personal',PersonalController::class);
Route::prefix('personal')->group(function () {
    Route::get('/',[ PersonalController::class, 'getAll']);
    Route::post('/',[ PersonalController::class, 'create']);
    Route::delete('/{id}',[ PersonalController::class, 'delete']);
    Route::get('/{id}',[ PersonalController::class, 'get']);
    Route::put('/{id}',[ PersonalController::class, 'update']);
    /*Route::get('/',[ PersonalController::class, 'getActivos']);*/

});
/*Route::apiResource('solicitud',SolicitudController::class);*/
Route::prefix('solicitud')->group(function () {
    Route::get('/all',[ SolicitudController::class, 'index']);
    Route::get('/',[ SolicitudController::class, 'getNueva']);
    Route::get('/Cotizado',[ SolicitudController::class, 'getCotizado']);
    Route::get('/CotizadoAnalista/{id}',[ SolicitudController::class, 'getCotizadoAnalista']);
    Route::get('/CotizadoUsuario/{id}',[ SolicitudController::class, 'getCotizadoUsuario']);
    Route::get('/Aprobado',[ SolicitudController::class, 'getAprobado']);
    Route::get('/AprobadoDirector/{id}',[ SolicitudController::class, 'getAprobadoDirector']);
    Route::get('/AprobadoAnalista/{id}',[ SolicitudController::class, 'getAprobadoAnalista']);
    Route::get('/{id}',[SolicitudController::class,'getList']);
    Route::get('/Nueva/{id}',[SolicitudController::class,'getListNueva']);
    Route::post('/',[ SolicitudController::class, 'create']);
    Route::delete('/{id}',[ SolicitudController::class, 'delete']);
    Route::get('/get/{id}',[ SolicitudController::class, 'get']);
    Route::put('/{id}',[ SolicitudController::class, 'update']);
    Route::put('/update/{id}',[ SolicitudController::class, 'updateDirector']);
    Route::put('/soporte/{id}',[ SolicitudController::class, 'updateSoporte']);
});
/*Route::apiResource('material',MaterialController::class);*/
Route::prefix('material')->group(function () {
    Route::get('/',[ MaterialController::class, 'index']);
    Route::get('/{id}',[MaterialController::class,'getList']);
    Route::post('/',[ MaterialController::class, 'create']);
    Route::put('/{id}',[ MaterialController::class, 'update']);
    Route::get('/get/{id}',[ MaterialController::class, 'get']);
    Route::delete('/{id}',[ MaterialController::class, 'delete']);
});

Route::prefix('cotizacion')->group(function () {
    Route::get('/',[ CotizacionController::class, 'index']);
    Route::get('/{id}',[CotizacionController::class,'getList']);
    Route::post('/',[ CotizacionController::class, 'create']);
    Route::get('/get/{id}',[ CotizacionController::class, 'get']);
    Route::delete('/{id}',[ CotizacionController::class, 'delete']);
    Route::put('/{id}',[ CotizacionController::class, 'update']);
    /*Route::put('/upD/{id}',[ CotizacionController::class, 'updateDirector']);*/
});

Route::prefix('familia')->group(function () {
    Route::get('/',[ FamiliaController::class, 'index']);
    Route::get('/{id}',[ FamiliaController::class, 'get']);
    Route::get('/{familia}',[ FamiliaController::class, 'getByFamilia']);

});

Route::prefix('caracteristica')->group(function () {
    Route::get('/',[ CaracteristicaController::class, 'index']);
    Route::get('/{id}',[CaracteristicaController::class,'getList']);
    Route::get('/get/{id}',[ CaractermaterialController::class, 'get']);
});

Route::prefix('caractermaterial')->group(function () {
    Route::get('/',[ CaractermaterialController::class, 'index']);
    Route::get('/{id}',[CaractermaterialController::class,'getList']);
    Route::post('/',[CaractermaterialController::class, 'create']);
    Route::put('/{id}',[ CaractermaterialController::class, 'update']);
    Route::delete('/{id}',[ CaractermaterialController::class, 'delete']);
    Route::get('/get/{id}',[ CaractermaterialController::class, 'get']);
});

Route::prefix('comprobante')->group(function () {
    Route::post('/store', [ComprobanteController::class, 'store']);
    Route::put('/{id}', [ComprobanteController::class, 'editarArchivo']);
    Route::get('/all',[ ComprobanteController::class, 'getAll']);
    Route::get('/{id}',[ ComprobanteController::class, 'getOne']);
    //Route::get('/{nombre}', [ComprobanteController::class, 'show']);
    Route::get('/id/{id}', [ComprobanteController::class, 'showOne']);
    Route::delete('/delete/{id}', [ComprobanteController::class, 'eliminarArchivo']);
});

