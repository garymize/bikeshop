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
        <form action='/user/updatenewpw/{{$data->email}}' method='post'>
            <label for='firstname' class='innerLabel'>First Name</label><br>
            <input type='text' autocomplete="off" value="{{ $data->firstname }}" name="firstname" placeholder='' size='50' class='display-only-input std-field-width inputDisabled' disabled="true"/> <br>
            <label for='lastname' class='innerLabel'>Last Name</label><br>
            <input type='text' autocomplete="off" value="{{ $data->lastname }}" name="lastname" placeholder='' size='50' class='display-only-input std-field-width inputDisabled' disabled="true"/> <br>

            <label for='currentpassword' class='required innerLabel'>Current Password</label><br>        
            <input type='password' autocomplete="off" name="currentpassword" placeholder='' size='50' class='std-field-width' required/> <br>
            <label for='password' class='required innerLabel'>New Password</label><br>        
            <input type='password' autocomplete="off" name="password" placeholder='' size='50' class='std-field-width' required/> <br>
            <label for='confirmpassword' class='required innerLabel'>Confirm New Password</label><br>        
            <input type='password' autocomplete="off" name="confirmpassword" placeholder='' size='50' class='std-field-width' required/> <br>

            <label for='email' class='innerLabel'>Email</label><br>        
            <input type='text' autocomplete="off" value="{{ $data->email }}" name="email" placeholder='' size='50' class='display-only-input std-field-width inputDisabled' disabled="true"/> <br>
            <label for='phone' class='innerLabel'>Phone</label><br>        
            <input type='text' autocomplete="off" value="{{ phoneFormat($data->phone) }}" name="phone" placeholder='' size='50' class='display-only-input std-field-width inputDisabled' disabled="true"/> <br><br>
            
            <input type='submit' style='display:inline-block; float:left; margin-right:10px;' value="Save"/>
            <input type='button' style='display:inline-block; float:right;' onclick="window.location='{{ url()->previous() }}'" value="Cancel"/>
        </form>
    </div>
    @csrf

@stop
