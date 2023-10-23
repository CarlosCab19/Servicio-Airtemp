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
        Schema::create('cotizacion', function (Blueprint $table) {
            $table->id();
            $table->string('id_material');
            $table->string('id_analista');
            $table->string('id_director')->nullable();
            $table->bigInteger('fabricacion');
            $table->bigInteger('lme');
            $table->bigInteger('premium');
            $table->bigInteger('total');
            $table->bigInteger('icoterm');
            $table->string('estatus')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cotizacion');
    }
};
