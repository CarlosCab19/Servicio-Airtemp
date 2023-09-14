<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solicitud extends Model
{
    //use HasFactory;
    protected $table='solicitud';

    protected $fillable=[
        'fechasolicitud',
        'estatus',
        'solicitante',
        'codigoproveedor',
        'razonsocial',
        'codigo',
        'descripcion',
        'tipofamilia',
        'caracteristicaone',
        'caracteristicatwo',
        'caracteristicathree',
        'caracteristicafour',
        'caracteristicafive',
        'nombrecliente',
        'numparte',
        'documentos',
    ];
}
