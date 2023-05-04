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
        Schema::create('condition_notes_details', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('condition_header_id')->nullable(false);
            $table->bigInteger('project_id')->nullable(false);
            $table->char('condition_notes_details_description',50);
            $table->text('condition_note_details_comment');
            $table->bigInteger('create_user_id');
            $table->timestamp('create_date');
            $table->timestamp('delete_date');
            $table->bigInteger('delete_user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notes_details', function (Blueprint $table) {
            //
        });
    }
};
