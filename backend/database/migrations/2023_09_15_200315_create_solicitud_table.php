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
            /*$table->unsignedBigInteger('id_solicitante')->nullable();
            $table->foreign('id_solicitante')
            ->reference('id')
            ->on('personal');
            $table->unsignedBigInteger('nom_solicitante')->nullable();
            $table->foreign('nom_solicitante')
            ->reference('nombres')
            ->on('personal');
            $table->unsignedBigInteger('ape_solicitante')->nullable();
            $table->foreign('ape_solicitante')
            ->reference('apellidos')
            ->on('personal');
            $table->string('estatus');
            $table->string('codigoproveedor');
            $table->string('razonsocial');
            $table->string('codigo')->nullable();;
            $table->string('descripcion');
            $table->string('tipofamilia');
            $table->text('caracteristicaone');
            $table->text('caracteristicatwo');
            $table->text('caracteristicathree')->nullable();;
            $table->text('caracteristicafour')->nullable();;
            $table->text('caracteristicafive')->nullable();;*/
            $table->string('nombrecliente');
            $table->string('numparte');
            /*$table->binary('documentos')->nullable();;*/
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
