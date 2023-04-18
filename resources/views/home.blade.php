@extends('layouts.layoutHome')
 
@section('title', 'Page Title')
 
@section('sidebar')
    @parent
 
    <p>This is appended to the master sidebar.</p>
@stop
 
@section('content')

<body>

    
    
    <p>This is my body content.</p>
    
    <div id="igsDialog"></div>
    
    <script>
        igsMessage('Loading...');
        // setTimeout(removeIGSMessage,6000);
    </script>
    
    <button class="IGSbutton IGSbutton-green IGSbutton-standard menuPointer button-blue" onClick="igsMessage('Loading...');" style="margin-top: 75px;"> Show Message</button><br>
    <button class="IGSbutton IGSbutton-green IGSbutton-standard menuPointer" onClick="removeIGSMessage();" style="width: 200px;">Clear Message</button>
    <button class="IGSbutton IGSbutton-green IGSbutton-standard menuPointer" onClick="toggleIGSMessage();" style="width: 200px; margin-top: 105px;">Toggle Message</button>

</body>
    
@stop