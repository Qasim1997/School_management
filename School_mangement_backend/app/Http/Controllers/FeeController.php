<?php

namespace App\Http\Controllers;

use App\Models\Fee;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;

class FeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $fee  = Fee::all();
        return response()->json(['result' => $fee], 200);
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
            'student_id' => 'required',
            'admission_fee' => 'required',
            'miscellaneous_fee' => 'required',
            'monthly_fee' => 'required',
        ]);
        if (Fee::where('student_id', $request->student_id)->where('date',$request->date)->first()) {
            // $flights = Attendance::where('class', $id)->where('date',$date)->get();

            return response([
                'message' => 'Fee already exists',
                'status' => 'failed'
            ], 400);
        }
        $fee = Fee::create([
            'student_id' => $request->student_id,
            'admission_fee' => $request->admission_fee,
            'miscellaneous_fee' => $request->miscellaneous_fee,
            'monthly_fee' => $request->monthly_fee,
            'total' => $request->total,
            'status' => $request->status,
            'challan_id' => $request->challan_id,
            'after_due_date' => $request->after_due_date,
            'date' => $request->date,
            'issue_date' => $request->issue_date,
            'month' => $request->month,
        ]);

        if ($fee) {
            return response()->json([$fee, 'status' => 'Fee added Successfully'], 200);
        } else {
            return response()->json([$fee, 'status' => ' Fee added failed'], 424);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Fee  $fee
     * @return \Illuminate\Http\Response
     */
    public function show(Fee $fee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Fee  $fee
     * @return \Illuminate\Http\Response
     */
    public function edit(Fee $fee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Fee  $fee
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Fee $fee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Fee  $fee
     * @return \Illuminate\Http\Response
     */
    public function destroy(Fee $fee)
    {
        //
    }
    public function getfeefromdate($id, $date){
        $fee = Fee::where('classnamed_id', $id)->where('date', $date)->get();
        return response()->json(['result' => $fee], 200);
    }
}
