<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }} style="--vh: 8.2px; background-color: #f7f7f7">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <title>@yield('title')</title>
        @include('components.favicon')

        <!-- Fonts -->
        <!--<link rel="preconnect" href="https://fonts.bunny.net">-->
        <!--<link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />-->

        <!-- Styles -->
        
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="stylesheet" type="text/css" href="/css/tooltipster.main.min.css" />
        <!--<link rel="stylesheet" type="text/css" href="/css/igs.css" />-->
        <link rel="stylesheet" type="text/css" href="/css/shopMain.css" />
        <!--<link rel="stylesheet" type="text/css" href="/css/slm.css" />-->
        <!--<link rel="stylesheet" type="text/css" href="/css/igsDialog.css" />-->
        <link rel='stylesheet' type='text/css' href='/keypad/jquery.keypad.css' />
        <!--<script src="/path/to/cdn/jquery.slim.min.js"></script>-->
        <!--<script src="/path/to/jquery.keypad.js"></script>-->
        <link rel='stylesheet' type='text/css' src='/keypad/jquery.keypad.css' />
        
        <!-- Scripts -->
        
        <script src="https://code.jquery.com/jquery-2.2.4.js" integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI=" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js" integrity="sha256-xLD7nhI62fcsEZK2/v8LsBcb4lG7dgULkuXoXB/j91c=" crossorigin="anonymous"></script>
        <script src='/keypad/jquery.keypad.js'></script>
<!--        <script src="/js/tooltipster.main.min.js"></script>
        <script src="/js/tooltipster.bundle.js" ></script>
        <script src='/js/slm.js'></script>-->
    <script> 
        
        function display_c(){
            var refresh=1000; // Refresh rate in milli seconds
            mytime=setTimeout('display_ct()',refresh)
        }

        function display_ct() {
            var x = new Date().toLocaleTimeString();
            document.getElementById('ct').innerHTML = x;
            display_c();
        }
    
        // Simulate click function
        function clickButton() {
            console.log('click');
            document.querySelector('#email').click();
        }

        @if (Auth::check()) 
            var timeout = ({{config('session.lifetime')}} * 60000) -10 ;
            setTimeout(function(){
                window.location.reload(1);
            },  timeout);

        @endif
                
    </script>
    </head>
    <!--Body-->
    <body onload="display_ct()">
        <!--Logo-->
        <div class='mm-title-logo' style='width: 386px;'><img src='/images/dhc-logo.webp' width='35px'/><span style='color:#A80000'> Devils Head Choppers</span></div>
        <!--Date/Time-->
        <div class='mm-header-date'><p style='color:dimgray; padding-right: 5px'>{{ prettyDateTime() }} - <span id='ct' ></span></p></div>
        <!--menu bar-->
        <div style="border-top: solid thin;
                    min-height: 20px;
                    padding: 0px;
                    display: inline-block;
                    width: 100%;">
            <!--Logout Button-->
            <form method="POST" action="{{ route('logout') }}">
                <input type="submit" class="name-button" style="float: right;"
                    value="{{ (isset(Auth::user()->name)) ? "Logout" : '' }}" />
            </form>
            <!--Name Button-->
            <form method="POST" action="{{ route('showUser') }}">
                <input type='hidden' id='user-email' name='user-email' value='{{ (isset(Auth::user()->email)) ? Auth::user()->email : "" }}'>
                <input type="submit" class="name-button" style="float: right;"
                    value="{{ (isset(Auth::user()->name)) ? Auth::user()->name : "Profile" }}" />
            </form>
            <!--Hamburger-->
            <a href="page.html"><img src="/images/hamburger.png" style="height: 33px; float: left; margin-right: 20px; margin-left: 20px;"></a>
            <!--Lock Button-->
            <form method="GET" action="{{ route('lock') }}">
                @csrf
                <input type='hidden' id='lock-email' name='lock-email' value='{{ (isset(Auth::user()->email)) ? Auth::user()->email : "" }}'>
                <input type="submit" id='lock-button' class="name-button" style="float: left;"
                    value="Lock" />
            </form>
        </div>
        <!--Container-->
        <div class='mm-container'>
            <!--Canvas-->
            <div id='canvas' name="canvas" class="mm-canvas" @yield('mm-canvasColor','')>
                <!--Standard Header-->
                <div class='mm-center mm-header'>
                    @yield('mm-header')
                </div>
                <!--Content-->
                <div>
                    @yield('mm-content')
                </div>
            </div>
        </div>
    </body>
</html>