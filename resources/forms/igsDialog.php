<?php


$text    = (isset($_POST['text'])? $_POST['text'] : '');
$header  = (isset($_POST['header'])? $_POST['header'] : '');
$button1 = (isset($_POST['button1'])? $_POST['button1'] : 'OK');
$button2 = (isset($_POST['button2'])? $_POST['button2'] : 'Cancel');
$button3 = (isset($_POST['button3'])? $_POST['button3'] : '');

$button1_Return = (isset($_POST['button1_Return'])? $_POST['button1_Return'] : TRUE);
$button2_Return = (isset($_POST['button2_Return'])? $_POST['button2_Return'] : FALSE);
$button3_Return = (isset($_POST['button3_Return'])? $_POST['button3_Return'] : '');

$button1_Function = (isset($_POST['fn1'])? $_POST['fn1'] : '');
$button2_Function = (isset($_POST['fn2'])? $_POST['fn2'] : '');
$button3_Function = (isset($_POST['fn3'])? $_POST['fn3'] : '');

$width  = (isset($_POST['width'])? $_POST['width'] : '450px');
$top    = (isset($_POST['top'])? $_POST['top'] : '40%');
$left   = (isset($_POST['left'])? $_POST['left'] : '50%');
$header = (isset($_POST['header'])? $_POST['header'] : 'Alert');
$maxHeight = (isset($_POST['max-height'])? $_POST['max-height'] : '450px');
$overflowX = (isset($_POST['overflowX'])? $_POST['overflowX'] : 'auto');

echo '<style type="text/css">
        .dialogBody { font-family: Tahoma, Arial, Helvetica,Sans-Serif; font-size: 11pt; }
        .boxcontenttext { padding: 40px; font-size: 20pt; font-weight: bold; color: Steelblue; text-align: center;}      
        #divDialog {font-size: 10pt; }
        #divDialog label {font-weight: normal; display: block; margin-top: 10px; }
        #divDialog input[type=\'text\'] { display: block; width: 400px; margin-bottom: 5px;}         
      </style>';

echo '<div id="divDialog" class="dialogBody dialog boxshadow displayNone" style="width: '.$width.'; top: '.$top.'; left: '.$left.'; max-height: '.$maxHeight.'; overflow-x: '.$overflowX.'; z-index: 2000;">
        <div class="dialog-header">
            '.$header.'
        </div>

        <div class="dialog-content" style="max-height: 400px; overflow-x: auto;">

            <label>'.$text.'</label>

            <hr />';

if (isset($_POST['button3'])){
    echo '      <button id="confirmButton3" class="IGSbutton" style="float: right; margin-left: 10px;">'.$button3.'</button>
                <input id="button3_Return" type="hidden" value="'.$button3_Return.'" />
                <input id="button3_Function" type="hidden" value="'.$button3_Function.'" />';
}

if (isset($_POST['button2'])){
    echo '      <button id="confirmButton2" class="IGSbutton" style="float: right; margin-left: 10px;">'.$button2.'</button>
                <input id="button2_Return" type="hidden" value="'.$button2_Return.'" />
                <input id="button2_Function" type="hidden" value="'.$button2_Function.'" />';
}

if (isset($_POST['button1'])){
    echo '      <button id="confirmButton1" class="IGSbutton" style="float: right; margin-left: 10px;">'.$button1.'</button>
                <input id="button1_Return" type="hidden" value="'.$button1_Return.'" />
                <input id="button1_Function" type="hidden" value="'.$button1_Function.'" />';
}

echo '<br><br>';

echo '          <div style="clear: both;"></div>
        </div>

        <div class="dialog-statusbar">Ready</div>
      </div>';

