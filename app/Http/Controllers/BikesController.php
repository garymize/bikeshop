<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorebikesRequest;
use App\Http\Requests\UpdatebikesRequest;
use App\Models\bikes;

class BikesController extends Controller
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
    public function store(StorebikesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(bikes $bikes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(bikes $bikes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatebikesRequest $request, bikes $bikes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(bikes $bikes)
    {
        //
    }
}
