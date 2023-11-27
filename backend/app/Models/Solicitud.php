<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solicitud extends Model
{
    use HasFactory;
    protected $table='solicitud';

    protected $fillable=[
        'id_solicitante',
        'solicitante',
        'tipo',
        'codProv',
        'Rsocial',
        'NomCliente',
        'NumParte',
        'id_analista',
        'id_director',
        //'vence',
        'estatus'
    ];
}
