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
        Schema::create('work_requests', function (Blueprint $table) {
            $table->id('id');
            $table->bigInteger('project_id')->nullable(false);
            $table->char('request',50)->nullable();
            $table->integer('qty')->nullable();
            $table->timestamp('create_date')->nullable(false);
            $table->bigInteger('create_user_id')->nullable(false);
            $table->timestamp('edited_date')->nullable();
            $table->bigInteger('edit_user_id')->nullable();
            $table->boolean('deleted');
            $table->timestamp('deleted_date')->nullable();
            $table->bigInteger('deleted_user_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('work_requested', function (Blueprint $table) {
            //
        });
    }
};
