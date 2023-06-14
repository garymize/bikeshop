@extends('layouts.formsLayout') 

@section('title', 'Login')

@section('mm-header')
    <div>Login</div>
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
            <label for='username' class='required innerLabel'>User Name</label><br>
            <input type='text' name="username" placeholder='' size='50' class='std-field-width' required/> <br>
            <label for='password' class='required innerLabel'>Password</label><br>        
            <input type='password' name="password" placeholder='' size='50' class='std-field-width' required/> <br>
            <input type='submit' style='display:inline-block; float:left;' value="Login"/>
            <input type='button' style='display:inline-block; float:right;' formaction="{{ route('dashboard') }}" value="Cancel"/>
        </form>
    </div>
    @csrf

@stop
