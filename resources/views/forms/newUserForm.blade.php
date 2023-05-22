@extends('layouts.formsLayout') 
@section('title', 'New User Form')

@section('content')

<body>
    <form action='user/add' method='post'>
        <p>This is the body content.</p>
        <p>This is my body content.{{ bikershop_now() }}</p>
        <p>This is my body content.{{ pg_date(bikershop_now()) }}</p><br><br>
        <input type='text' name="username" placeholder='user name' /> <br><br>
        <input type='text' name="password" placeholder='password' /> <br><br>
        <input type='text' name="email" placeholder='email' /> <br><br>
        <input type='text' name="phone" placeholder='phone' /> <br><br>
        <button type='submit'/>
    </form>
</body>

@stop
