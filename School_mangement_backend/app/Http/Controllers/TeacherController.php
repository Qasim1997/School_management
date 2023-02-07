<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()

    {
        $teacher = Teacher::all();
        return response()->json(['result' => $teacher], 202);
        }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //Validate inputs
        $request->validate([
            'label' => 'required',
        ]);
        if (Teacher::where('label', $request->label)->first()) {
            return response()->json([
                'message' => 'Teacher already exists',
                'status' => "failed"
            ], 202);
        }
        $teacher = Teacher::create([
            'label' => $request->label,
        ]);
        if ($teacher) {
            return response()->json(['message' => 'Teacher Added Successfully', 'status' => 'success'], 202);
        } else {
            return response()->json(['message' => ' Teacher failed'], 424);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Teacher  $teacher
     * @return \Illuminate\Http\Response
     */
    public function show( $id)
    {
        $student = Teacher::find($id);
        return response()->json(['result' => $student], 200);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ClassName  $className
     * @return \Illuminate\Http\Response
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ClassName  $className
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)

    {
        $student = Teacher::where('id', $id)
            ->update([
                'label' => $request->label,

            ]);
        return response([
            'data' => $student,
            'message' => 'Teacher edit Successfully',
            'status' => 'success'
        ], 201);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ClassName  $className
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Teacher::destroy($id);
    }
}
