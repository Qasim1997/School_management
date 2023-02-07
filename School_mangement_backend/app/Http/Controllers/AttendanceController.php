<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\classnamed;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $attendance = Attendance::all();
        return response()->json(['result' => $attendance], 200);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return "create";

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return "store";

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Attendance  $attendance
     * @return \Illuminate\Http\Response
     */
    public function getstudentstatus($id , $date)
    {
        $flights = Attendance::where('class', $id)->where('date',$date)->get();
        return response()->json(['result' => $flights], 200);
    }
    public function test(){
        return "test";
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Attendance  $attendance
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

        return "ssss";


    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Attendance  $attendance
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Attendance $attendance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Attendance  $attendance
     * @return \Illuminate\Http\Response
     */
    public function destroy(Attendance $attendance)
    {

    }
    public function getclass($id){
        $classnamed = DB::table('classnameds')
                ->where('teacher_id', '=', $id)
                ->get();
        return response()->json(['result' => $classnamed], 202);
    }
    public function getstudent($id){
        $getstudents = DB::table('students')
        ->where('classnamed_id', '=', $id)
        ->get();
        return response()->json(['result' => $getstudents], 202);
    }
    public function addattendance(Request $request, $teacher_id, $student_id, $date){
        $flight = Attendance::updateOrCreate(
            ['teacher_id' => $teacher_id, 'student_id' => $student_id ,'date' => $date],
            ['status' => $request->status , 'teacher_id' => $request->teacher_id, 'student_id' => $request->student_id, 'date' => $request->date , 'class' => $request->class]
        );
        return response()->json([
            'message' => ['Student Saved Successfully'],
            'status' => 'success'
        ], 201);
    }
    // public function show(Request $request, $id){
}
