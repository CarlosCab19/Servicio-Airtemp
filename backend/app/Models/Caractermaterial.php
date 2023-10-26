<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Caractermaterial extends Model
{
    use HasFactory;
    protected $table='caractermaterial';
    protected $fillable=[
        'id_material',
        'caracteristica',
        'valor',
        'estatus',
    ];
}
