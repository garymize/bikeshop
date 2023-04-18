<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }} style="--vh: 8.2px">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>App Name - @yield('title')</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

        <!-- Styles -->
        
        <link rel="stylesheet" type="text/css" href="css/tooltipster.main.min.css" />
        <link rel="stylesheet" type="text/css" href="css/igs.css" />
        <link rel="stylesheet" type="text/css" href="css/igsDialog.css" />
        <link rel="stylesheet" type="text/css" hreg="css/shopMain.css" />
        
        <!-- Scripts -->
        
        <script src="https://code.jquery.com/jquery-2.2.4.js" integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI=" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js" integrity="sha256-xLD7nhI62fcsEZK2/v8LsBcb4lG7dgULkuXoXB/j91c=" crossorigin="anonymous"></script>
        <script src="js/tooltipster.main.min.js"></script>
        <script src="js/tooltipster.bundle.js" ></script>
        <script src='js/slm.js'></script>

    </head>
    <body>
        @section('sidebar')
            This is the master sidebar.
        @show
 
        <div class="container">
            @yield('content')
        </div>
    </body>
</html>
                
                