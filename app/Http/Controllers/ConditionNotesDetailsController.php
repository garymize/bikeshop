<?php

namespace App\Http\Controllers;

use App\Http\Requests\Storecondition_notes_detailsRequest;
use App\Http\Requests\Updatecondition_notes_detailsRequest;
use App\Models\condition_notes_details;

class ConditionNotesDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Storecondition_notes_detailsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(condition_notes_details $condition_notes_details)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(condition_notes_details $condition_notes_details)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Updatecondition_notes_detailsRequest $request, condition_notes_details $condition_notes_details)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(condition_notes_details $condition_notes_details)
    {
        //
    }
}
