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
        // setTimeout(removeIGSMessage,6000);
    </script>
    
    <button class="IGSbutton menuPointer button-blue" onClick="removeIGSMessage();" style="text-decoration: none; margin-top: 15px; margin-bottom: 15px; max-height: 21px; float: right; margin-left: 10px;">Show Message</button>
    <button class="IGSbutton menuPointer" onClick="removeIGSMessage();" style="text-decoration: none; margin-top: 15px; margin-bottom: 15px; max-height: 21px;">Clear Message</button>
    
@stop