@extends('layouts.layoutHome')
 
@section('title', 'Page Title')
 
@section('sidebar')
    @parent
 
    <p>This is appended to the master sidebar.</p>
@stop
 
@section('content')
    <p>This is my body content.</p>
    
    <div id="igsDialog"></div>
    
    <script>
        igsMessage('Loading...');
    </script>
    
@stop