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
        Schema::table('condition_notes_details', function (Blueprint $table) {
            $table->bigInteger('condition_header_id')->nullable(false);
            $table->bigInteger('project_id')->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('condition_notes_details', function (Blueprint $table) {
            //
        });
    }
};
