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
        Schema::create('material', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_solicitud')->nullable();
            $table->foreign('id_solicitud')->reference('id')->on('solicitud');
            $table->unsignedBigInteger('id_cotizacion')->nullable();
            $table->foreign('id_cotizacion')->reference('id')->on('cotizacion');
            $table->string('descripcion');
            $table->string('familia');
            $table->string('caracterone');
            $table->string('caractertwo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('material');
    }
};
