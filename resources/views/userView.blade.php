@extends('layouts.formsLayout') 

@section('title', 'View User')

@section('mm-header')
    <div>View User</div>
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
        <label for='firstname' class='required innerLabel'>First Name</label><br>
        <input type='text' name="firstname" placeholder='' size='50' class='std-field-width inputDisabled' disabled="true" required/> <br>
        <label for='lastname' class='required innerLabel'>Last Name</label><br>
        <input type='text' name="lastname" placeholder='' size='50' class='std-field-width inputDisabled' disabled="true" required/> <br>
        <label for='password' class='required innerLabel'>Password</label><br>        
        <input type='password' name="password" placeholder='' size='50' class='std-field-width inputDisabled' disabled="true" required/> <br>
        <label for='confirmpassword' class='required innerLabel'>Confirm Password</label><br>        
        <input type='password' name="confirmpassword" placeholder='' size='50' class='std-field-width inputDisabled' disabled="true" required/> <br>
        <label for='email' class='required innerLabel'>Email</label><br>        
        <input type='text' name="email" placeholder='' size='50' class='std-field-width inputDisabled' disabled="true" required/> <br>
        <label for='phone' class='required innerLabel'>Phone</label><br>        
        <input type='text' name="phone" placeholder='' size='50' class='std-field-width inputDisabled' disabled="true" required/> <br><br>
        <input type='button' style='display:inline-block; float:right;' formaction="{{ route('userEdit') }}" value="Edit"/>
    </div>
    @csrf

@stop