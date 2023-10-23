<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PersonalController;
use App\Http\Controllers\SolicitudController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\CotizacionController;
use App\Http\Controllers\FamiliaController;
use App\Http\Controllers\CaracteristicaController;

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
    Route::get('/',[ SolicitudController::class, 'index']);
    Route::get('/',[ SolicitudController::class, 'getNueva']);
    Route::get('/',[ SolicitudController::class, 'getCotizado']);
    Route::get('/',[ SolicitudController::class, 'getAprovado']);
    Route::get('/{id}',[SolicitudController::class,'getList']);
    Route::post('/',[ SolicitudController::class, 'create']);
    Route::delete('/{id}',[ SolicitudController::class, 'delete']);
    Route::get('/get/{id}',[ SolicitudController::class, 'get']);
    Route::put('/{id}',[ SolicitudController::class, 'update']);
    Route::put('/{id}',[ SolicitudController::class, 'updateAnalista']);
    Route::put('/{id}',[ SolicitudController::class, 'updateDirector']);
});
/*Route::apiResource('material',MaterialController::class);*/
Route::prefix('material')->group(function () {
    Route::get('/',[ MaterialController::class, 'index']);
    Route::get('/{id}',[MaterialController::class,'getList']);
    Route::post('/',[ MaterialController::class, 'create']);
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
    Route::put('/{id}',[ CotizacionController::class, 'updateDirector']);
});

Route::prefix('familia')->group(function () {
    Route::get('/',[ FamiliaController::class, 'index']);
});

Route::prefix('caracteristica')->group(function () {
    Route::get('/',[ CaracteristicaController::class, 'index']);
    Route::get('/{id}',[CaracteristicaController::class,'getList']);
});

