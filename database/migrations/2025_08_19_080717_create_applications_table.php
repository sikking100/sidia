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
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->string('ticket', 255)->nullable();
            $table->string('id_card_number', 20);
            $table->string('family_card_number', 20);
            $table->string('family_head_name', 255);
            $table->bigInteger('id_category')->nullable();
            $table->string('category', 255);
            $table->string('name', 255);
            $table->string('phone', 20);
            $table->string('email', 255)->nullable();
            $table->enum('sex', ['L', 'P']);
            $table->string('religion', 255);
            $table->string('district', 255);
            $table->string('ward', 255);
            $table->text('images');
            $table->text('description')->nullable();
            $table->text('problems')->nullable();
            $table->enum('status', ['PENDING', 'DEFFICIENT', 'REVISED', 'VERIFIED', 'COMPLETED', 'CANCEL'])->default('PENDING');
            $table->text('status_description')->nullable();
            $table->text('files')->nullable();
            $table->bigInteger('ward_id')->nullable();
            $table->bigInteger('district_id')->nullable();
            $table->bigInteger('hamlet_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
