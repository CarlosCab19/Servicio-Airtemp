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
            $table->unsignedBigInteger('id_usuario')->nullable();
            $table->foreign('id_usuario')->reference('id')->on('personal');
            $table->string('estatus');
            $table->unsignedBigInteger('id_proveedor')->nullable();
            $table->foreign('id_proveedor')->reference('id')->on('proveedor');
            $table->unsignedBigInteger('id_cliente')->nullable();
            $table->foreign('id_cliente')->reference('id')->on('cliente');
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
