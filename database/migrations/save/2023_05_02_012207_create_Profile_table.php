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
        Schema::create('Profile', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('firstname', 1);
            $table->char('lastname', 1);
            $table->char('company', 1);
            $table->char('address1', 1);
            $table->char('address2', 1);
            $table->char('state', 1);
            $table->integer('zip');
            $table->integer('phone1');
            $table->char('phone1_type', 1);
            $table->integer('phone2');
            $table->char('phone2_type', 1);
            $table->integer('phone3');
            $table->char('phone3_type', 1);
            $table->date('last_contact_date');
            $table->char('password', 1);
            $table->date('last_login');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Profile');
    }
};
