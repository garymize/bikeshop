<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\StoreusersRequest;
use App\Http\Requests\UpdateusersRequest;
use App\Models\users;
use Illuminate\View\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
        $user->name      = trim($request['firstname'].' '.$request['lastname']);
        $user->firstname = trim($request['firstname']);
        $user->lastname  = trim($request['lastname']);
        $user->password  = trim($request['password']);
        $user->email     = trim($request['email']);
        $user->phone     = trim(cleanPhone($request['phone']));
        $user->save();
        
        $route = route('showUser',$request['email']);
        
//        return view('profile.partials.userCreated');
        return redirect($route);
    }

    public function update(UpdateusersRequest $request, users $users)
    {
        $this->validate($request,[
            'email' => 'bail|required',
            'phone' => 'required',
        ]);
        
        $user = users::where('email',$request['email'])->firstOrFail();
        $user->name      = trim($request['firstname'].' '.$request['lastname']);
        $user->firstname = trim($request['firstname']);
        $user->lastname  = trim($request['lastname']);
//        $user->password  = $request['password'];
        $user->email     = trim($request['email']);
        $user->phone     = trim(cleanPhone($request['phone']));
        $user->save();
        
        $route = route('showUser',$request['email']);
        
//        return view('profile.partials.userCreated');
        return redirect($route);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $email)
    {
//        $user = users::where('email',$email)->firstOrFail();
        $user = users::where('email',$email);
        Log::info('$user: '.$user);
        return view('userView',['data'=>$user]);
    }

    public function edit($email)
    {
        $user = users::where('email',$email)->firstOrFail();
        debug_to_console($user);
        return view('forms.userEditForm',['data'=>$user]);
    }

    /**
     * Show the form for editing the specified resource.
     */
//    public function edit(users $users)
//    {
//        return view('forms.userEditForm');
//    }

    /**
     * Update the specified resource in storage.
     */
//    public function update(UpdateusersRequest $request, users $users)
//    {
//        //
//    }

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
    
    public function changePW($email){
        
        $user = users::where('email',$email)->firstOrFail();
        return view('forms.userChangePW',['data'=>$user]);
        
    }
    
    public function updateNewPW(Request $request, string $email){
        
        //$request = \Illuminate\Http\Request::all
        
        $this->validate($request,[
//            'email' => 'bail|required',
//            'phone' => 'required',
        ]);
        
        $user = users::where('email',$email)->firstOrFail();
        $user->password = trim($request['password']);
        $user->save();
        
        $route = route('showUser',$email);
        
//        return view('profile.partials.userCreated');
        return redirect($route);
        
        
    }
    
    public function userAuth(LoginRequest $request, users $users)
    {
        $this->validate($request,[
            'email' => 'bail|required',
            'password' => 'required',
        ]);
        
        $user = users::where('email',$request['email'])->firstOrFail();
        $user->name      = trim($request['firstname'].' '.$request['lastname']);
        $user->firstname = trim($request['firstname']);
        $user->lastname  = trim($request['lastname']);
//        $user->password  = $request['password'];
        $user->email     = trim($request['email']);
        $user->phone     = trim(cleanPhone($request['phone']));
        $user->save();
        
        $route = route('showUser',$request['email']);
        
//        return view('profile.partials.userCreated');
        return redirect($route);
    }
    
    function validateEmail(Request $request, $email){
        
        return view('auth.verify-email');
        
    }

}
