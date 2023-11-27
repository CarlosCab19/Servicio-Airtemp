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
            $table->string('moneda');
            $table->bigInteger('fabricacion')->nullable();
            $table->bigInteger('lme')->nullable();
            $table->bigInteger('premium')->nullable();
            $table->bigInteger('total')->nullable();
            $table->bigInteger('icoterm')->nullable();
            $table->bigInteger('adicional')->nullable();
            $table->string('nota')->nullable();
            $table->string('vence');
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
