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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('customer_id')->nullable(false);
            $table->bigInteger('bike_id')->nullable(false);
            $table->bigInteger('lead_tech_id')->nullable();
            $table->string('description')->nullable(false);
            $table->text('notes')->nullable(false);
            $table->timestamp('date_created')->nullable(false);
            $table->bigInteger('create_user_id')->nullable(false);
            $table->timestamp('started_date')->nullable();
            $table->timestamp('started_use_id')->nullable();
            $table->timestamp('delete_date')->nullable();
            $table->bigInteger('delete_user_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            //
        });
    }
};
