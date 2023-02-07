<?php

namespace App\Http\Controllers;

use App\Models\library;
use Illuminate\Http\Request;
use PharIo\Manifest\Library as ManifestLibrary;

class LibraryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $labrary  = library::all();
        return response()->json(['result' => $labrary], 200);
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
            'book' => 'required',
        ]);
        if (library::where('book', $request->book)->first()) {
            return response()->json([
                'message' => 'Book already exists',
                'status' => "failed"
            ], 202);
        }
        $teacher = library::create([
            'book' => $request->book,
        ]);
        if ($teacher) {
            return response()->json(['message' => 'Book Added successfully in Library', 'status' => 'success'], 202);
        } else {
            return response()->json(['message' => ' Teacher failed'], 424);
        }
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\library  $library
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $student = library::find($id);
        return response()->json(['result' => $student], 200);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\library  $library
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $student = library::find($id);
        return response()->json(['result' => $student], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\library  $library
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, library $library)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\library  $library
     * @return \Illuminate\Http\Response
     */
    public function destroy(library $library)
    {
        //
    }
}
