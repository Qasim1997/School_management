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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('age');
            $table->string('email')->nullable();
            $table->string('contact_number');
            $table->string('display_name');
            $table->string('address');
            $table->string('image');
            $table->string('rollnumber');
            $table->unsignedBigInteger('classnamed_id');
            $table->foreign('classnamed_id')->references('id')->on('classnameds')->onDelete('cascade');
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
        Schema::dropIfExists('students');
    }
};
