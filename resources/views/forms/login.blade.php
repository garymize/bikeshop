<!DOCTYPE html>
<html 
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>@yield('title')</title>

        <!-- Fonts -->

        <!-- Styles -->
        
        <link rel="stylesheet" type="text/css" href="/css/shopMain.css" />
        
        <!-- Scripts -->
        
    </head>
    <body>
        <div class='mm-container'>
            <div name="canvas" class="mm-canvas" @yield('mm-canvasColor','')>
                <!--<form action='/user/store' method='post'>-->
                <form method="POST" action="/">
                    <label for='email' class='required innerLabel'>Email</label><br>
                    <input type='text' name="email" placeholder='' size='50' class='std-field-width' required/> <br>
                    <label for='password' class='required innerLabel'>Password</label><br>        
                    <input type='password' name="password" placeholder='' size='50' class='std-field-width' required/> <br><br>
                    <input type='submit' value="Login" class="three-d-button" style="line-height: 38px; font-size: 28px; margin:0 auto; display: block; margin-top: 20px; border-color:white; border-width: thin;"/>
                </form>
            </div>
        </div>
    </body>
</html>