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
        Schema::create('support_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('application_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->text('name');
            $table->text('place')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('support_files');
    }
};
