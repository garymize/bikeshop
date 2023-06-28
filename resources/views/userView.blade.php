@extends('layouts.formsLayout') 

@section('title', 'View User')

@section('mm-header')
    <div>View User</div>
@stop

@section('mm-canvasColor')
    style="background-color: #f7f7f7;"
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
        <label for='firstname' class='innerLabel'>First Name</label><br>
        <input type='text' autocomplete="off" value="{{ $data->firstname }}" name="firstname" placeholder='' size='50' class='std-field-width inputDisabled' readonly/> <br>
        <label for='lastname' class='innerLabel'>Last Name</label><br>
        <input type='text' autocomplete="off" value="{{ $data->lastname }}" name="lastname" placeholder='' size='50' class='std-field-width inputDisabled' readonly/> <br>
        <!--<label for='password' class='required innerLabel'>Password</label><br>-->        
        <!--<input type='password' autocomplete="off" name="password" placeholder='' size='50' class='std-field-width inputDisabled' readonly required/> <br>-->
        <!--<label for='confirmpassword' class='required innerLabel'>Confirm Password</label><br>-->        
        <!--<input type='password' autocomplete="off" name="confirmpassword" placeholder='' size='50' class='std-field-width inputDisabled' readonly required/> <br>-->
        <label for='email' class='innerLabel'>Email</label><br>        
        <input type='text' autocomplete="off" value="{{ $data->email }}" name="email" placeholder='' size='50' class='std-field-width inputDisabled' disabled="true"/> <br>
        <label for='phone' class='innerLabel'>Phone</label><br>        
        <input type='text' autocomplete="off" value="{{ phoneFormat($data->phone) }}" name="phone" placeholder='' size='50' class='std-field-width inputDisabled' readonly/> <br><br>
        <input type='button' style='display:inline-block; float:left; margin-right:10px;' onclick="window.location='{{ route('userEdit', $data->email) }}'" value="Edit"/>
        <input type='button' style='display:inline-block; float:left;' onclick="window.location='{{ route('userChangePW',$data->email) }}'" value="Change PW"/>
        <input type='button' style='display:inline-block; float:right;' onclick="window.location='{{ route("home") }}'" value="Cancel"/>
    </div>
    @csrf

@stop
