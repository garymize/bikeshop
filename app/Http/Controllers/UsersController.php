<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreusersRequest;
use App\Http\Requests\UpdateusersRequest;
use App\Models\users;
use Illuminate\View\View;

class UsersController extends Controller
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
    public function create(): View
    {
        return view('forms.newUserForm');
    }

    public function create2(): View
    {
        $token = csrf_token();
        return view('forms.newUserForm2')->with($token);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreusersRequest $request)
    {
        return view('profile.partials.userCreated');
    }

    /**
     * Display the specified resource.
     */
    public function show(users $users)
    {
        $data = $users->first();
        debug_to_console($data);
        return view('forms.userForm',['data'=>$data]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(users $users)
    {
        return view('forms.userForm');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateusersRequest $request, users $users)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(users $users)
    {
        //
    }
    
    public function new(){
        
        return view('forms.newUserForm');
        
    }
}
