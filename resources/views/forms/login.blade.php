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

    {{ debug_to_console('login.blade.php: '.route('authUser')) }}

    <div>
        <!--<form action='/user/store' method='post'>-->
        <form method="POST" action="{{ route('authUser') }}" autocomplete="off">
            {{ debug_to_console('login.blade.php: '.route('authUser')) }}
            @csrf
            <label for='email' class='required innerLabel'>Email</label><br>
            <input id="email" type='text' name="email" placeholder='' size='50' class='std-field-width' autocomplete="off" required/> <br>
            <label for='password' class='required innerLabel'>Password</label><br>        
            <input id="password" type='password' name="password" placeholder='' size='50' class='std-field-width' autocomplete="off" required readonly onfocus="this.removeAttribute('readonly');" readonly onfocus="this.removeAttribute('readonly');"/> <br><br>
            <input type='submit' value="Login" class="three-d-button" style="line-height: 38px; font-size: 28px; margin:0 auto; display: block; margin-top: 20px; border-color:white; border-width: thin;"/>
            <!--<input type='button' style='display:inline-block; float:right;' formaction="{{ route('dashboard') }}" value="Cancel"/>-->
        </form>
    </div>

@stop
