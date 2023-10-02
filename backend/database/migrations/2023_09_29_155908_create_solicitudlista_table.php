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
        Schema::create('solicitudlista', function (Blueprint $table) {
            $table->id();
            $table->string('id_solicitud');
            $table->string('id_solicitante')->nullable();
            $table->string('estatus')->nullable();
            $table->string('id_proveedor')->nullable();
            $table->string('id_cliente')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solicitudlista');
    }
};
