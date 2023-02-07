<?php

namespace App\Http\Controllers;

use App\Models\classnamed;
use Illuminate\Http\Request;

class classnamedController extends Controller

{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $classnamed = classnamed::all();
        return response()->json(['result' => $classnamed], 202);
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
            'name' => 'required',
            'numeric' => 'required',
        ]);
        if (classnamed::where([
            'name' => $request->name,
            'numeric' => $request->numeric
        ])->first()) {
            return response()->json([
                'message' => 'Class already exists',
                'status' => "failed"
            ], 202);
        }
        $classnamed = classnamed::create([
            'name' => $request->name,
            'numeric' => $request->numeric,
            'teacher_id' => $request->teacher_id

        ]);
        if ($classnamed) {
            return response()->json([$classnamed, 'message' => 'Class Added Successfully','status' => 'success'], 200);
        } else {
            return response()->json(['message' => ' Class failed'], 424);
        }
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\classnamed  $classnamed
     * @return \Illuminate\Http\Response
     */
    public function show(classnamed $classnamed, $id)
    {
        $student = classnamed::find($id);
        return response()->json(['result' => $student], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\classnamed  $classnamed
     * @return \Illuminate\Http\Response
     */
    public function edit(classnamed $classnamed)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\classnamed  $classnamed
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)

    {
        $student = classnamed::where('id', $id)
            ->update([
                'name' => $request->name,
                'numeric' => $request->numeric,
                'teacher_id' => $request->teacher_id
            ]);
        return response([
            'data' => $student,
            'message' => 'classnamed edit Successfully',
            'status' => 'success'
        ], 201);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\classnamed  $classnamed
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return classnamed::destroy($id);
    }
    public function test(){
        return "hello world";
    }
}
