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
        Schema::create('bikes', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('customer_id')->nullable(false);
            $table->char('description',50)->nullable(false);
            $table->char('make',50)->nullable(false);
            $table->char('model',50)->nullable(false);
            $table->year('year',50)->nullable(false);
            $table->text('comments')->nullable();
            $table->timestamp('create_date');
            $table->bigInteger('create_user_id')->nullable(false);
            $table->timestamp('edit_date');
            $table->bigInteger('edit_user_id')->nullable(false);
            $table->boolean('deleted')->nullable();
            $table->timestamp('delete_date')->nullable();
            $table->bigInteger('delete_user_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bikes', function (Blueprint $table) {
            //
        });
    }
};
