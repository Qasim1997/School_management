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
        Schema::create('fees', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_id');
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
            $table->unsignedBigInteger('classnamed_id');
            $table->foreign('classnamed_id')->references('id')->on('classnameds')->onDelete('cascade');
            $table->string('admission_fee')->nullable();
            $table->string('miscellaneous_fee')->nullable();
            $table->string('monthly_fee');
            $table->string('total');
            $table->string('status');
            $table->string('challan_id');
            $table->string('after_due_date');
            $table->string('issue_date');
            $table->string('due_date');
            $table->string('month');
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
        Schema::dropIfExists('fees');
    }
};
