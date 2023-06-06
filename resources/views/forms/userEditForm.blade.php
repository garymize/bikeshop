@extends('layouts.formsLayout') 

@section('title', 'Edit User')

@section('mm-header')
    <div>Edit User</div>
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
            <label for='firstname' class='required innerLabel'>First Name</label><br>
            <input type='text' autocomplete="off" value="{{ $data->firstname }}" name="firstname" placeholder='' size='50' class='std-field-width' required/> <br>
            <label for='lastname' class='required innerLabel'>Last Name</label><br>
            <input type='text' autocomplete="off" value="{{ $data->lastname }}" name="lastname" placeholder='' size='50' class='std-field-width' required/> <br>
            <!--<label for='password' class='required innerLabel'>Password</label><br>-->        
            <!--<input type='password' autocomplete="off" name="password" placeholder='' size='50' class='std-field-width inputDisabled' disabled="true" required/> <br>-->
            <!--<label for='confirmpassword' class='required innerLabel'>Confirm Password</label><br>-->        
            <!--<input type='password' autocomplete="off" name="confirmpassword" placeholder='' size='50' class='std-field-width inputDisabled' disabled="true" required/> <br>-->
            <label for='email' class='required innerLabel'>Email</label><br>        
            <input type='text' autocomplete="off" value="{{ $data->email }}" name="email" placeholder='' size='50' class='std-field-width' required/> <br>
            <label for='phone' class='required innerLabel'>Phone</label><br>        
            <input type='text' autocomplete="off" value="{{ $data->phone }}" name="phone" placeholder='' size='50' class='std-field-width' required/> <br><br>
            <input type='submit' style='display:inline-block; float:left; margin-right:10px;' value="Save"/>
            <input type='button' style='display:inline-block; float:right;' onclick="window.location='{{ url()->previous() }}'" value="Cancel"/>
        </form>
    </div>
    @csrf

@stop
