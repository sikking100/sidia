<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->string('id_card_number', 20);
            $table->string('family_card_number', 20);
            $table->string('family_head_name', 255);
            $table->string('category');
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
            $table->enum('status', ['PENDING', 'DEFFICIENT', 'VERIFIED', 'COMPLETED'])->default('PENDING');
            $table->text('status_description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('applications');
    }
};
