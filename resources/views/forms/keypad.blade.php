@extends('layouts.formsLayout') 

@section('title', 'Login')

@section('mm-header')
    <div>Login</div>
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

    {{ debug_to_console('login.blade.php: '.route('authUser')) }}

    <div>
        <!--<form action='/user/store' method='post'>-->
        <form method="POST" action="{{ route('authUser') }}" autocomplete="off">
            {{ debug_to_console('login.blade.php: '.route('authUser')) }}
            @csrf
            <input type="password" class="keypad" disabled="disabled" />        </form>
            <div id="keypad">
                <div id="keypad" class="keypad">
                    <button class="number">1</button>
                    <button class="number">2</button>
                    <button class="number">3</button>
                    <button class="number">4</button><button class="number">5</button><button class="number">6</button><button class="number">7</button><button class="number">8</button><button class="number">9</button><button class="delete">del</button><button class="number">0</button><button class="submit">ok</button>
                </div>                
            </div>
            <br><br>
    </div>

@stop
