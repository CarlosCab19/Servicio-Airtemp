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
            $table->string('id_usuario');
            $table->string('solicitante');
            $table->string('tipo');
            $table->string('codProv')->nullable();
            $table->string('Rsocial');
            $table->string('NomCliente');
            $table->string('NumParte');
            $table->string('id_analista')->nullable();
            $table->string('id_director')->nullable();
            $table->string('vence')->nullable();
            $table->string('estatus');
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
