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
        Schema::table('menus', function (Blueprint $table) {
            $table->smallInteger('id_citigov')
                ->unsigned()
                ->nullable()
                ->after('id')
                ->default(0);
            $table->string('name_citigov', 255)
                ->nullable()
                ->after('name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('menus', function (Blueprint $table) {
            $table->dropColumn('id_citigov');
            $table->dropColumn('menu_citigov');
        });
    }
};
