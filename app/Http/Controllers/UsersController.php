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
        $token = csrf_token();
        return view('forms.newUserForm')->with($token);
    }

    public function create2(): View
    {
        return view('forms.newUserForm2');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreusersRequest $request)
    {
        $this->validate($request,[
            'email' => 'bail|required|unique:users',
            'phone' => 'required',
        ]);
        
        $user = new users();
        $user->name      = $request['firstname'].' '.$request['lastname'];
        $user->firstname = $request['firstname'];
        $user->lastname  = $request['lastname'];
        $user->password  = $request['password'];
        $user->email     = $request['email'];
        $user->phone     = $request['phone'];
        $user->save();
        
        
        return view('profile.partials.userCreated');
    }

    /**
     * Display the specified resource.
     */
    public function show(users $users)
    {
        $data = $users->where('email',$data->email)->firstOrFail();
        debug_to_console($data);
        return view('userView',['data'=>$data]);
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
    
    public function changePW(){
        
        return view('forms.userChangePW');
        
    }
}
