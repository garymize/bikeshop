<?php

//header( "Location: index.php" );

/**
 * login.php
 * 
 * 
 * @Author gmize
 * 6/30/2013
 * 
 * This is a login/admin level
 * The user is authenticated at this level then gains access to 
 * the site log manager (slm.php)
 * 
 * The session vars are automatically available to slm.php 
 * as the session is still open.  This icludes the user name
 * as it is displayed on the main page and the user id and whether 
 * the user is logged in etc.  No params are passed to slm.php.  They
 * all come from the session vars.
 * 
 * This file has two include files of its own:
 *  - igs_header.php
 *  - igs.css
 * 
 * These are named the same as two such files for slm.php and
 * the contents are very similar but there are a few differences.
 * All of the files should go back to being shared once we're able to 
 * break out a library of our own common files
 * 
 * 
 * SEE IGS_PAGE.PHP for further comments
 * 
 * At Start Up:
 * This page is divided into a left and right section (middle portion of page)
 * - left side:  menu <div>
 * - right side: myIframe <div> (not an iFrame)
 * There is a border seperating them (.menu class border-right)
 * 
 * Default is the two sections are rendered at start up but we don't want them on the Login Page 
 * so the left side "menu" div is recuded to width: 0px and the right side myIfreame
 * section is expanded to 99.9% (not 100% 
 * because we don't actually remove the 1px border when doing this)
 * Then, when the user logs in and it renders the Menu we reinstate the menu/myIframe widths as on startup.
 * That sets the page up for all other operations.
 * When the user logs OUT we again implode the menu side and expand the myIframe side for the login page.
 * 
 * All "Internal" operations are rendered on this page in myIframe.
 * All "External" operations are rendered as a new "_target" in the same browser tab.
 * The user may return to the Menu page/mode by using the "Back" button of the browser or in the called application.
 * 
 * May add a feature to the menu config table/functionality to allow external apps/sites to be opened in a new tab.
 * 
 * Menu Operation:
 * Each menu item is set up with a LinkFile (IGS_Menu table) setting.
 * The URL to the LinkFile is in a separate column/field.
 * The menu can call an external URL/file or it can call an internal page using igs_page.php?f=Function Name.
 * The Function Name (without "()" parens) must be available in slm.js or other available file.
 * That function can them call a php file or other available resource.
 * The php/other resource must point its output back to myIframe via the function or callback function.
 * (igs_menu.php builds the menu from the IGS_Menu config table and points it to the menu div on this page)
 * 
 * 
 */
session_start();

error_reporting(E_ALL);

// path info for URL - add database config info as well - see config.php
////$config_array = parse_ini_file('igs_config.ini');

// url path as a global constant
////define('PATH_URL', $config_array['URL']);

// if this page is called after user email link validation mode
if (isset($_GET['validation'])){
    $message = $_GET['validation'];
    unset($_GET['validation']);
}

//****************BEGIN HTML HEAD TAG *******************************************************************
////require("igs_header.php");

echo '  <link rel="stylesheet" type="text/css" href="/css/igsDialog.css">';


// set url path as JS global - see slm.js
////echo '<script> PATH_URL = "'.PATH_URL.'";</script>';
////echo '  <link rel="stylesheet" type="text/css" href="lib/styles/igsDialog.css">';

echo "</head>";
//<!-- end of header -->

// if this page is called after user email link validation mode
if (isset($message)){
    echo '<script>';
    echo 'alert("'.$message.'");';
    //echo 'alert("Registeration and Email Validation Complete - Please Login and complete your profile...");';
    echo '</script>';
}

// for some reason "logged_in = true" is printing to the screen
// this was to be used as a JS Global var
// However, may no longer be needed
//if (isset($_SESSION['logged_in'])){
//    echo '<script>';
//    echo 'logged_in = true;';
//    echo '</script>';
//}


?>

    <!-- doOnLoad() is in header.php -->
    <body onload="loginPage(true); doOnLoad();">
    
    <div id="wrapper" class="wrapper">
    <div id="container" class="container">
        <div id="igsDialog"></div>
        <!-- ******************************** top of page -->
        <div id="banner" class="banner">
            <div id="logo" class="logo" ><img src="lib/images/IGS-NewLogo-Acronym.png" style="height: 50px; width: 100px; padding-left: 25px; margin-top: 10px; margin-bottom: 10px;"/>
            <div id="banner-right" class="banner-right">
                <div id="user_name_display" class="user_name_display"></div>
                <!--<div id="logged_in_as" class="logged_in_as"></div>-->
                <!-- <div id="login" class="login" title="Login" >&nbsp;&nbsp;Login</div> -->
                <!--<div id="login_state" hidden>1</div>-->
                <div class="float-right margin-right-10 w100">
                    <!--<button id="logout" class="button_page_top_right_2" title="Logout" >Logout</button>-->
                </div>
                <div class="float-right margin-right-10 w100">
                    <!--<button id="contact" class="button_page_top_right_2" title="Contact Us">Contact Us</button>-->
                </div>
                <!--<div id="preferences" class="button_page_top_right" title="Preferences/Settings">&nbsp;&nbsp;&nbsp;P</div>-->
                <!-- <div id="sitelog" class="button_page_top_right" title="Site Log Manager">&nbsp;&nbsp;&nbsp;S</div> -->
                <!--<div id="email" class="button_page_top_right" title="Send Test Email for Email Server Config...">&nbsp;&nbsp;&nbsp;E</div>-->
            </div>
            </div>
        </div>
        <div style="clear:both"></div>

        <!-- ******************************** begin Middle Section -->
        <!-- menu -->
        <div id="menu" class="menu">
        </div>
        <!-- end of MENU -->

        <!-- ************** page container -->
        <div id="myIframe_container" class="myIframe_container">
            <div id="myIframe_top_margin" class="myIframe_top_margin"></div>
            <div id="myIframe_left_margin" class="myIframe_left_margin"></div>
            <div id="myIframe" class="myIframe">
                <!-- 
                
                myIframe (not an iFrame but a div in this version) 
                This is the container in which most pages are displayed
                
                -->
            </div>
        </div>
        <!-- ************** end of page container -->
        <!-- ******************************************* end of Middle Section -->

        <!--<div><button  id="sitelogbutton" class="sitelogbutton">Test Data</button></div>-->
        <div class="IGSfooterContainer"><span id="footer" class="IGSfooter">IGS v2.10.1.k</span></div>
    </div>
    </div>
    </div>
</body>