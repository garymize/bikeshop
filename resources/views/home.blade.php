@extends('layouts.layoutHome')
 
@section('title', 'Page Title')
 
@section('sidebar')
    @parent
 
    <p>This is appended to the master sidebar.</p>
@stop
 
@section('content')

    <link rel="stylesheet" type="text/css" href="css/tooltipster.main.min.css" />
    <link rel="stylesheet" type="text/css" href="css/igs.css" />
    <script src="https://code.jquery.com/jquery-2.2.4.js" integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI=" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js" integrity="sha256-xLD7nhI62fcsEZK2/v8LsBcb4lG7dgULkuXoXB/j91c=" crossorigin="anonymous"></script>
    <script src="js/tooltipster.main.min.js"></script>
    <script src='js/slm.js'></script>

    <p>This is my body content.</p>
    
    <div id="igsDialog"></div>
    
    <script>
        igsMessage('Loading...');
    </script>
    
@stop