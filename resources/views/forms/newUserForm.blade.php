@extends('layouts.formsLayout') 
@section('title', 'New User Form')

@section('content')

<style>
    input {
        line-height: 50px;
        font-size: 40px;
    }
    
    [required] label::after {
      content: '*';
      font-size: 24px;
      line-height: 0;
      vertical-align: middle;
    }
</style>

<body>
    <form action='user/add' method='post'>
        <p>This is the body content.</p>
        <p>This is my body content.{{ bikershop_now() }}</p>
        <p>This is my body content.{{ pg_date(bikershop_now()) }}</p><br><br>
        <label for='username'>Name</label>
        <input type='text' name="username" placeholder='user name' size='50' required/> <br><br>
        <input type='password' name="password" placeholder='password' size='50' required/> <br><br>
        <input type='password' name="confirmpassword" placeholder='confirm password' size='50' required/> <br><br>
        <input type='text' name="email" placeholder='email' size='50' required/> <br><br>
        <input type='text' name="phone" placeholder='phone' size='50' required/> <br><br>
        <input type='submit' value="Create User"/>
    </form>
</body>

@stop
