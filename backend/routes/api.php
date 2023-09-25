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
});
Route::apiResource('solicitud',SolicitudController::class);
Route::apiResource('material',MaterialController::class);
