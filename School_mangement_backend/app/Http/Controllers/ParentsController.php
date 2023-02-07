<?php

namespace App\Http\Controllers;

use App\Models\Parents;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ParentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $parants = Parents::all();
        return response()->json(['result' => $parants], 200);
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
            'name' => 'required',
            'email' => 'required',
            'contact_number' => 'required',
            'student_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response($validator->messages());
        } else {
            $parants = Parents::create([
                'name' => $request->name,
                'email' => $request->email,
                'contact_number' => $request->contact_number,
                'student_id' => $request->student_id,
                // $data['first_name']." ".$data['last_name'];
            ]);
            return response()->json([
                'message' => ['parants Saved Successfully'],
                'status' => 'success'
            ], 201);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\parants  $parants
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\parants  $parants
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
     * @param  \App\Models\parants  $parants
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\parants  $parants
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Parents::destroy($id);
    }
}
