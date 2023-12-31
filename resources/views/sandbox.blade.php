@extends('layouts.layoutHome')
 
@section('title', 'Page Title')
 
@section('sidebar')
    @parent
 
    <p>This is appended to the master sidebar.</p>
@stop
 
@section('content')

<body>

    
    
    <p>Sandbox</p>
    
    <div id="igsDialog"></div>
    
    <script>
        igsMessage('Loading...');
        // setTimeout(removeIGSMessage,6000);
    </script>
    
    <button id="showMessageButton" class="IGSbutton IGSbutton-green IGSbutton-standard menuPointer button-blue" onClick="igsMessage('Loading...');" style="margin-top: 75px;"> Show Message</button><br>
    <button id="clearMessageButton" class="IGSbutton IGSbutton-green IGSbutton-standard menuPointer" onClick="removeIGSMessage();" style="width: 200px;">Clear Message</button>
    <button id="toggleMessageButton" class="IGSbutton IGSbutton-green IGSbutton-standard menuPointer" onClick="toggleIGSMessage();" style="width: 200px; margin-top: 105px;">Toggle Message</button>
    <button id="disableButtonButton" class="IGSbutton IGSbutton-green IGSbutton-standard menuPointer" onClick="disableButton('showMessageButton');" style="width: 200px; margin-top: 155px;">Disable Button</button>
    <button id="enableButtonButton" class="IGSbutton IGSbutton-green IGSbutton-standard menuPointer" onClick="enableButton('showMessageButton');" style="width: 200px; margin-top: 205px;">Enable Button</button>
    <button id="toggleButtonButton" class="IGSbutton IGSbutton-green IGSbutton-standard menuPointer" onClick="toggleButton('showMessageButton');" style="width: 200px; margin-top: 255px;">Toggle Button</button>
    
    <button id="send-email" class="IGSbutton IGSbutton-green IGSbutton-standard menuPointer" onClick="confirmSendModEmail()" style="width: 200px; margin-top: 305px;">Send Email</button>
    <button id="approve-moderation" class="IGSbutton IGSbutton-green IGSbutton-standard menuPointer" onClick="approveModeration()" style="width: 200px; margin-top: 355px;">Approve Moderation</button>
    <button id="progress" class="IGSbutton IGSbutton-green IGSbutton-standard menuPointer" onClick="update_progress()" style="width: 200px; margin-top: 405px;">Progress</button>

</body>
    
@stop