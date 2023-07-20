@extends('layouts.formsLayout') 

@section('title', 'Login')

@section('mm-header')
    <div>Unlock</div>
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

    <script>
        $(function(){
          $('#keypad').keypad();
        });
        $(function(){
            $('#canvas').css('width','267');
            $('#canvas').css('text-align','center');
            $('#canvas').css({'position':'relative','top':'30px'});
            $("#keypadcontainer").css({'position':'relative','top':'0px'});
            $('.delete').css('background', 'url("/images/backspace-black-small-2.png") no-repeat');
            $('.delete').css('height','49px' );
            $('.delete').text('');
            $('.delete').css('border','none');
            $('.delete').css({'position':'relative','top':'-7px','left':'4px'});
            $('#keypad .submit').css({'position':'relative','top':'-26px','height':'36px'});
            $(':contains("0")').css({'position':'relative','top':'-25px'});
        });
    </script>
    
    <div style='width: 230px; text-align: center; margin: 0;'>
        <!--<form action='/user/store' method='post'>-->
        <form method="POST" action="{{ route('authUser') }}" autocomplete="off" style='184px;'>
            {{ debug_to_console('login.blade.php: '.route('authUser')) }}
            @csrf
            <input type="password" class="keypad" disabled="disabled" />        
        </form>
        <div id="keypadcontainer" style='position: relative; top: 33px;'>
            <div id="keypad" class="keypad">
<!--                <button class="number">1</button>
                <button class="number">2</button>
                <button class="number">3</button>
                <button class="number">4</button>
                <button class="number">5</button>
                <button class="number">6</button>
                <button class="number">7</button>
                <button class="number">8</button>
                <button class="number">9</button>
                <button class="delete">del</button>
                <button class="number">0</button>
                <button class="submit">ok</button>-->
            </div>                
        </div>
        <!--<br><br>-->
        <div style='text-align: center;'>
            <a href='{{ route('login') }}'>Password Login<a/>
        </div>
        <br><br>
    </div>

@stop
