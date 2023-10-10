<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PersonalController;
use App\Http\Controllers\SolicitudController;
use App\Http\Controllers\MaterialController;

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
    Route::get('/{id}',[SolicitudController::class,'getList']);
    Route::post('/',[ SolicitudController::class, 'create']);
    Route::delete('/{id}',[ SolicitudController::class, 'delete']);
    Route::get('/get/{id}',[ SolicitudController::class, 'get']);
    Route::put('/{id}',[ SolicitudController::class, 'update']);
});
/*Route::apiResource('material',MaterialController::class);*/
Route::prefix('material')->group(function () {
    Route::get('/{id}',[MaterialController::class,'getList']);
    Route::post('/',[ MaterialController::class, 'create']);
    Route::delete('/{id}',[ MaterialController::class, 'delete']);
});


