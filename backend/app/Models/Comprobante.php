<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comprobante extends Model
{
    use HasFactory;
    protected $table = "comprobante";
    protected $fillable = [
        'id_cotizacion',
        'nombre',
        'ruta',
    ];
}
