@extends('layouts.formsLayout') 

@section('title', 'Change Password')

@section('mm-header')
    <div>Change Password</div>
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
        <form action='/user/update' method='post'>
            <label for='currentpassword' class='required innerLabel'>Current Password</label><br>        
            <input type='currentpassword' autocomplete="off" name="currentpassword" placeholder='' size='50' class='std-field-width' required/> <br>
            <label for='password' class='required innerLabel'>Password</label><br>        
            <input type='password' autocomplete="off" name="password" placeholder='' size='50' class='std-field-width' required/> <br>
            <label for='confirmpassword' class='required innerLabel'>Confirm Password</label><br>        
            <input type='password' autocomplete="off" name="confirmpassword" placeholder='' size='50' class='std-field-width' required/> <br>
            <input type='submit' style='display:inline-block; float:left; margin-right:10px;' value="Save"/>
            <input type='button' style='display:inline-block; float:right;' onclick="window.location='{{ url()->previous() }}'" value="Cancel"/>
        </form>
    </div>
    @csrf

@stop
