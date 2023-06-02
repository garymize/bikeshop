@extends('layouts.formsLayout') 
@section('title', 'New User Form')

@section('mm-header')
    <div>Create New User</div>
@stop

@section('mm-content')

<style>
/*    input {
        line-height: 50px;
        font-size: 40px;
    }*/
    
/*    [required] label::after {
      content: '*';
      font-size: 24px;
      line-height: 0;
      vertical-align: middle;
    }*/
</style>

    <div>
        <form action='store' method='post'>
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
            <input type='text' name="phone" placeholder='' size='50' class='std-field-width' required/> <br><br>
            <input type='submit' style='display:inline-block; float:left;' value="Create User"/>
            <input type='button' style='display:inline-block; float:right;' formaction="{{ route('dashboard') }}" value="Cancel"/>
        </form>
    </div>
    @csrf

@stop
