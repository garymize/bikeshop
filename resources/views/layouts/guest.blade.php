<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Bike Shop Manager') }}</title>
        @include('components.favicon')

        <!--Styles-->
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="stylesheet" type="text/css" href="/css/tooltipster.main.min.css" />
        <!--<link rel="stylesheet" type="text/css" href="/css/igs.css" />-->
        <link rel="stylesheet" type="text/css" href="/css/shopMain.css" />
        <!--<link rel="stylesheet" type="text/css" href="/css/slm.css" />-->
        <!--<link rel="stylesheet" type="text/css" href="/css/igsDialog.css" />-->
        
        
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        <script src="https://code.jquery.com/jquery-2.2.4.js" integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI=" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js" integrity="sha256-xLD7nhI62fcsEZK2/v8LsBcb4lG7dgULkuXoXB/j91c=" crossorigin="anonymous"></script>

        
        
    </head>
    <body class="font-sans text-gray-900 antialiased">
        <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            <!--<div>-->
                <!--<a href="/">-->
                    <!--<x-application-logo class="w-20 h-20 fill-current text-gray-500" />-->
                    <img src='/images/dhc-logo.webp' width="30px"/>
                <!--</a>-->
            <!--</div>-->

            <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                {{ $slot }}
            </div>
        </div>
    </body>
</html>
