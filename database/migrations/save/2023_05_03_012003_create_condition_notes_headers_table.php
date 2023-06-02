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
        Schema::create('condition_notes_headers', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('customer_id')->nullable(false);
            $table->bigInteger('project_id')->nullable(false);
            $table->char('description',100)->nullable(false);
            $table->text('condition_notes_header_comments')->nullable(true);
            $table->timestamp('create_date')->nullable(false);
            $table->bigInteger('create_user_id');
            $table->timestamp('delete_date')->nullable(false);
            $table->bigInteger('delete_user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notes_headers', function (Blueprint $table) {
            //
        });
    }
};
