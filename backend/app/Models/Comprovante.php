<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comprovante extends Model
{
    use HasFactory;
    protected $table = "comprobante";
    protected $fillable = [
        //'id_cotizacion',
        'nombre',
        'ruta',
    ];
}
