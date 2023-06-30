@extends('layouts.formsLayout') 

@section('title', 'Create New User')

@section('mm-header')
    <div>Create New User</div>
@stop

@section('mm-content')

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li style='color:red;'>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif


    <div>
        <form action='/user/store' method='post'>
            <label for='firstname' class='required innerLabel'>First Name</label><br>
            <input type='text' name="firstname" placeholder='' size='50' class='std-field-width' required/> <br>
            <label for='lastname' class='required innerLabel'>Last Name</label><br>
            <input type='text' name="lastname" placeholder='' size='50' class='std-field-width' required/> <br>
            <label for='password' class='required innerLabel'>Password</label><br>        
            <input type='password' name="password" placeholder='' size='50' class='std-field-width' required/> <br>
            <label for='confirmpassword' class='required innerLabel'>Confirm Password</label><br>        
            <input type='password' name="confirmpassword" placeholder='' size='50' class='std-field-width' required/> <br>
            <label for='email' class='required innerLabel'>Email</label><br>        
            <input type='text' name="email" placeholder='' size='50' class='std-field-width' required/> <br>
            <label for='phone' class='required innerLabel'>Phone</label><br>        
            <input type='tel' name="phone" placeholder='' size='50' class='std-field-width' required/> <br><br>
            <input type='submit' class='three-d-button ' style='display:display: inline-block;float: left;line-height: 23px;font-size: 28px;width: 190px;height: 52px;margin: 0 auto;' value="Create User"/>
            <input type='button' style='display:inline-block; float:right;' formaction="{{ route('dashboard') }}" value="Cancel"/>
        </form>
    </div>
    @csrf

@stop
