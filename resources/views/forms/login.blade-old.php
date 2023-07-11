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
        <br><br>
        <form method="GET" action="{{ route('checkPW') }}">
            <label for='pw' class='required innerLabel'>PW</label><br>
            <input id="pw" type='text' name="pw" placeholder='' size='50' class='std-field-width' autocomplete="off" required/> <br>
            <label for='hash' class='required innerLabel'>Hash</label><br>        
            <input id="hash" type='text' name="hash" placeholder='' size='100' class='std-field-width' autocomplete="off" required readonly onfocus="this.removeAttribute('readonly');" readonly onfocus="this.removeAttribute('readonly');"/> <br><br>        
            <input type='submit' value="Check PW" class="three-d-button" style="line-height: 38px; font-size: 28px; margin:0 auto; display: block; margin-top: 20px; border-color:white; border-width: thin;"/>
        </form>
        <br><br>
        <form method='GET' action="{{ route('hashString') }}">
            <label for='string' class='required innerLabel'>String</label><br>        
            <input id="string" type='text' name="string" placeholder='' size='100' class='std-field-width' autocomplete="off" required readonly onfocus="this.removeAttribute('readonly');" readonly onfocus="this.removeAttribute('readonly');"/> <br><br>        
            <input type='submit' value="Hash" class="three-d-button" style="line-height: 38px; font-size: 28px; margin:0 auto; display: block; margin-top: 20px; border-color:white; border-width: thin;"/>
        </form>
        <br><br>
        <form method='POST' action="{{ route('checkPassword') }}">
            @csrf
            <label for='string' class='required innerLabel'>String</label><br>        
            <input id="string" type='text' name="string" placeholder='' size='100' class='std-field-width' autocomplete="off" required readonly onfocus="this.removeAttribute('readonly');" readonly onfocus="this.removeAttribute('readonly');"/> <br><br>        
            <label for='hashString' class='required innerLabel'>Hash</label><br>        
            <input id="hashString" type='text' name="hashString" placeholder='' size='100' class='std-field-width' autocomplete="off" required readonly onfocus="this.removeAttribute('readonly');" readonly onfocus="this.removeAttribute('readonly');"/> <br><br>        
            <input type='submit' value="Check PW" class="three-d-button" style="line-height: 38px; font-size: 28px; margin:0 auto; display: block; margin-top: 20px; border-color:white; border-width: thin;"/>
        </form>
    </div>

@stop
