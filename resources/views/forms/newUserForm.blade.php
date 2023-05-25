@extends('layouts.formsLayout') 
@section('title', 'New User Form')

@section('content')

<style>
    input {
        line-height: 50px;
        font-size: 40px;
    }
    
/*    [required] label::after {
      content: '*';
      font-size: 24px;
      line-height: 0;
      vertical-align: middle;
    }*/
</style>

<body>
    <form action='user/add' method='post'>
        <p>This is the body content.</p>
        <p>This is my body content.{{ bikershop_now() }}</p>
        <p>This is my body content.{{ pg_date(bikershop_now()) }}</p><br><br>
        <label for='firstname' class='required innerLabel'>First Name</label><br>
        <input type='text' name="firstname" placeholder='' size='50' required/> <br><br>
        <label for='lastname' class='required'>Last Name</label><br>
        <input type='text' name="lastname" placeholder='' size='50' required/> <br><br>
        <label for='password' class='required'>Password</label><br>        
        <input type='password' name="password" placeholder='' size='50' required/> <br><br>
        <label for='confirmpassword' class='required'>Confirm Password</label><br>        
        <input type='password' name="confirmpassword" placeholder='' size='50' required/> <br><br>
        <label for='email' class='required'>Email</label><br>        
        <input type='text' name="email" placeholder='' size='50' required/> <br><br>
        <label for='phone' class='required'>Phone</label><br>        
        <input type='text' name="phone" placeholder='' size='50' required/> <br><br>
        <input type='submit' value="Create User"/>
    </form>
</body>

@stop
