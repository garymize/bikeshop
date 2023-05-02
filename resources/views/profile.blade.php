@extends('layouts.layoutHome')
 
@section('title', 'Page Title')
 
@section('sidebar')
    @parent
 
    <!--<p>This is appended to the master sidebar.</p>-->
@stop
 
@section('content')

<body>

    <div>{{  }}</div>
    
    <p>This is profile body content.</p>
    
    <div id="igsDialog"></div>
    
    <script>
        //igsMessage('Loading...');
        // setTimeout(removeIGSMessage,6000);
    </script>
    

</body>
    
@stop