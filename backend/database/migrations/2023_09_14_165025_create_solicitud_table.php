<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('solicitud', function (Blueprint $table) {
            $table->id();
            $table->string('fechasolicitud');
            $table->string('estatus');
            $table->string('solicitante');
            $table->string('codigoproveedor');
            $table->string('razonsocial');
            $table->string('codigo');
            $table->string('descripcion');
            $table->string('tipofamilia');
            $table->string('caracteristicaone');
            $table->string('caracteristicatwo');
            $table->string('caracteristicathree');
            $table->string('caracteristicafour');
            $table->string('caracteristicafive');
            $table->string('nombrecliente');
            $table->string('numparte');
            $table->string('documentos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solicitud');
    }
};
