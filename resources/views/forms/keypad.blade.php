@extends('layouts.formsLayout') 

@section('title', 'Login')

@section('mm-header')
    <div>Login</div>
@stop

@section('mm-content')

    <script>
        $(function(){
          $('#keypad').keypad();
        });
    </script>

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
            <input type="password" class="keypad" disabled="disabled" />        </form>
            <div id="keypad"></div>        
            <br><br>
    </div>

@stop
