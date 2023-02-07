<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $student = Student::all();
        return response()->json(['result' => $student], 200);
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
        $validator = Validator::make($request->all(), [
            'last_name' => 'required',
            'email' => 'required',
            'age' => 'required',
            'address' => 'required',
            'contact_number' => 'required',
            'classnamed_id' => 'required',
            'image' => 'required',
            'rollnumber' => 'required',
        ]);
        if ($validator->fails()) {
            return response($validator->messages());
        } else {
            $filename = null;
            if ($request->file('image')) {
                $filename = $request->file('image')->hashName();
                $image_path = 'admin_assets/uploads/blogs/';
                $request->image->move(public_path($image_path), $filename);
            }
            $student = Student::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'age' => $request->age,
                'address' => $request->address,
                'contact_number' => $request->contact_number,
                'classnamed_id' => $request->classnamed_id,
                'image' => $filename,
                'rollnumber' => $request->rollnumber,
                // $data['first_name']." ".$data['last_name'];
                'display_name' => $request->first_name." ". $request->last_name,

            ]);
            return response()->json([
                'message' => ['Student Saved Successfully'],
                'status' => 'success'
            ], 201);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $student = Student::find($id);
        return response()->json(['result' => $student], 200);
    }
    public function edit(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Student $student)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Student::destroy($id);
    }
    public function getstudentfromclass($id){
        $fee = Student::where('classnamed_id', $id)->get();
        return response()->json(['result' => $fee], 200);
    }
}
