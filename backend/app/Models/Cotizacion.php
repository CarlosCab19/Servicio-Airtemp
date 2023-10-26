<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cotizacion extends Model
{
    use HasFactory;
    protected $table='cotizacion';

    protected $fillable=[
        'id_material',
        'id_analista',
        'id_director',
        'moneda',
        'fabricacion',
        'lme',
        'premium',
        'total',
        'icoterm',
        'estatus',
    ];
}
