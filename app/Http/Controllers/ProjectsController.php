<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreprojectsRequest;
use App\Http\Requests\UpdateprojectsRequest;
use App\Models\projects;

class ProjectsController extends Controller
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
    public function store(StoreprojectsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(projects $projects)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(projects $projects)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateprojectsRequest $request, projects $projects)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(projects $projects)
    {
        //
    }
}
