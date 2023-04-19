/*
 * 
 * SLM.JS
 * /lib/js/scripts/
 * 
 * Main JS/JQUERY/AJAX FUNCTIONS
 * 
 * @Author: GMIZE
 * 
 * 5/15/2013
 * 
 * 
 */



/*
 * 
 * New JQuery and JS Functions
 * 
 * @author: GMIZE
 * 
 * 5/17/2013
 * 
 */


// legacy global vars 
var currStation = "";
var stationCounter = 0;
var currForm = ""; // holds the current form name which is now virtualized via forms for Edit and New
var currTable = ""; // used to hold the current table
var myIframeurl = ""; // holds the iframe php target and parameters
var myValIframeurl = "";
var t;

// New global vars

// if current site page is modified 
// don't allow selecting away from the page
// this should be tested on most "click" functions
var fadeBackground = true;
var autoSaveForms = true;
var modified = false;
var calendarName;
var sys_login = false;
var loggedIN;

var modCountsActive = true;

$(function() {
    if (!modCountsActive) {
        $('.framesOuterContainer').css('overflow-x', 'hidden');
    }
});

$(function() {

    $(document).on("keyUp", "#Four_character_id", function() {
        alert('keyUp');
    })

});

/*
 * sets focus to the first non-button input element on a page 
 * this is called whenever the system is reloaded/refreshed
 */
$(function() {
    set_focus_first_input();
});

function checkIfModified() {

    if (modified && autoSaveForms) {

        $('#sitepage_save_button').click();

        modified = false;

    }
    else if (!autoSaveForms && !confirm('Current Page is Modifed...Abandon changes?'))
    {
        return false;
    }

    return true;

}

/**
 * 
 * 
 * 
 * New JQuery Functions to replace the AJAX functions for better control, maintainability and dependibility
 * 
 * 
 * 
 */

/************* PAGE CLEARING/RESETTING FUNCTIONS - more are elsewhere ***************/

/*
 * clears the moderation page withoud resizing it
 * 
 */
function clearModerationPage() {

    $('#myIframe_top_margin').text('');
    $('#myIframe').text('');
//    containerWidth = 'narrow';
//    setNarrowFrames();

}

/*
 * clear key page elements and reset to default narrow settings
 * 
 */
function clearPage() {

    $('#myIframe_top_margin').text('');
    containerWidth = 'narrow';
    setNarrowFrames();
    $('#myIframe').text('').css('border', '0px solid gray');
    globalHelpID = "FourSteps";

}

function clearSelectedStation() {
    $('#station_id').text('');
    currStation = '';
    currForm = '';
    currTable = '';
    clearBadges();
    globalHelpID = "FourSteps";
}

function closeCol2Menu(){
    $('#menu').hide();
    globalHelpID = "FourSteps";
}


/*
 * hide/show col 2 menu
 * 
 */
function sitelogMenu_hide() {
    $('#menu').css('display', 'none');
    globalHelpID = "FourSteps";
}

function sitelogMenu_show() {
    $('#menu').css('display', 'block');
    globalHelpID = "FourSteps";
}

/*
 * clears the selected site from the top of the page
 * and resets the global var currStation that is used 
 * throughout the system to determine which site is 
 * selected if any
 * 
 */
function clearSelection() {
    currStation = '';
    $('#station_id').text('');
    $(this.id + '.valCount').css('background-image', '').text('');
    globalHelpID = "FourSteps";

}

/*
 * resets the color of all of the sites in the list to 
 * a non-selected default color
 */
function resetSitelogElementColor() {
    $(".siteLogList_Row").css("border-color", "rgb(225,225,225)");


}

/*
 * set focus to first input element on the page - need to place this universally
 * right now is called at the top of each page
 */
function set_focus_first_input() {

    var divContainer = $("#myIframe");
    var firstInput = $(":input:not(input[type=button],input[type=submit]):visible:first", divContainer);
    firstInput.focus();

}
/************************************************************************/



/**
 * SEARCH FIELD FOR SITE LIST
 * LOCATED IN TOP LEFT CORDER OF MAIN SLM PAGE
 * 
 * SEARCHS ON EVERY KEY ENTERED
 * 
 */
$(function() {

    // set/clear timer to avoid multiple results 
    // when user types quickly
    var searchTimer;
    var typingInterval = 200;
    $('#search_input').keyup(function() {

        clearTimeout(searchTimer);

        searchTimer = setTimeout(function() {
            //alert(this.value);
            var searchValue = $('#search_input').val();
            if (searchValue.length > 0) {
                $('#search_input').removeClass('search_input').addClass('search_input2');
                //$('#clearSearch').attr('onclick','clearSearch();');
                $('#clearSearch').css('cursor', 'pointer');
            }
            else
            {
                $('#search_input').removeClass('search_input2').addClass('search_input');
            }
            searchValue = searchValue.substring(0, 4);
            $('#search_input').val(searchValue.toUpperCase());
            siteList_Build(this.value);
        }
        , typingInterval);

    });

});

function clearSearch() {
    $('#search_input').val('');
    $('#search_input').removeClass('search_input2').addClass('search_input');
    $('#clearSearch').css('cursor', 'default');
    siteList_Build('');
}

$(function() {

    $('#search_input_mod').keyup(function() {

        var searchValue = $('#search_input_mod').val();
        $('#search_input_mod').val(searchValue.toUpperCase());
        refreshSiteList_Mod(this.value);

    });

});

// USED?
function validateSite(FourID) {

    $.get('validateSite.php')

}

/**
 * 
 * BUILD SITE LIST FOR MAIN MENU IN THE SLM SYSTEM
 * 
 * 
 * build filtered list from search field string on main page
 * 
 * When  rapid typing in search field it would create multiple results in the list
 * Added a time/clear timer to solve this with an invterval of 200 msecs (.2 secs)
 * Use callback functions for each step to build in syncronous flow
 * 
 */
function siteList_Build(search_string) {
    $('#siteLogListStationCount').text('loading...');
    search_string = $('#search_input').val();
    $.get("slm_ssb.php?mode=siteloglist&search_string=" + search_string, callback_buildSiteList);    
}

function callback_buildSiteList(data) {
    $('#siteloglist').text('').append(data);
    if (data.indexOf('Agency Not Assigned') > -1) {
        igsAlert('<h2>No Agency/Organization Assigned</h2><br>Your IGS Member Registration has not yet been assigned to an Agency/Organization therefore the Sitelog Manager cannot yet display the Sites to which you should have access. <br><br> The Site Administer will have been alerted, via email, at the time of your registration and will normally Activate your Membership and Assign your Agency within 24 hours or sooner (during normal work days).<br><br>  If you need this to be done sooner please contact IGS. ');
    }
    
    $('.tooltip').tooltipster({maxWidth:300,contentAsHTML:true,delay:400});
    $('input, a, button, li, img').tooltipster({maxWidth:300,contentAsHTML:true,delay:400});

}

// ************* mod page site list builder

function siteList_Build_mod(search_string) {

    $.get("mod_ssb.php?mode=siteloglist&search_string=" + search_string, callback_buildSiteList_mod);

}

function callback_buildSiteCount_mod(data) {

    var search_string = $('#search_input_mod').val();
    $.get("mod_ssb.php?mode=siteloglist&search_string=" + search_string, callback_buildSiteList_mod);

}

function callback_buildSiteList_mod(data) {

    $('#siteloglist').text('').append(data);

}

/**
 * 
 * SITE ERROR BADGES FUNCTIONS
 * 
 * 
 * @param {type} siteList
 * @param {type} errorCounts
 * @returns {undefined}
 */

// get ALL error counts for error badges
// called when a site on the list is clicked (click ".siteloglist_element" below)
// Set Status Lite on Selected Site - "element" doesn't appear to be used any longer
function getErrorCounts(FourID, element) {

    // update the STATUS LITE for current site
    // this is done BEFORE and AFTER error calcs
    // because it relies on certain flags for status and errors
    updateStatus(FourID);

    // validate every form's data (without actually opening the forms)
    // by validating data in each mod_SiteLog table for the site
    // returns an array of all counts
    $.get('forms/form-validate.php?FourID=' + FourID, function(data) {

        var counts = data;

        // calc and show error badges for current site
        showBadges(element, counts);
        globalErrorCounts = counts; // used? if so how?
        globalFourID = FourID;

    });

    // update the STATUS LITE for the current site
    // after error calcs in case there are errors that 
    // weren't there before
    updateStatus(FourID);

}

// clear ALL badges before re-displaying them for the selected site
function clearBadges() {

    $('.valCount').css('background-image', '')
            .text('');

    $formMenu = getFormMenuArray();

    for (i = 0; i < $formMenu.length; i++) {
        $('#' + $formMenu[i]).css('background-image', '')
                .text('')
                .attr('title', '');
    }

    $formPages = getFormPagesArray();

    for (i = 0; i < $formPages.length; i++) {
        $('#' + $formPages[i]).css('background-image', '')
                .text('')
                .attr('title', '');
    }

    $('.badge_menu1').css('background-image', '')
            .text('')
            .attr('title', '')
            .hide();

    $('.badge_menu2').css('background-image', '')
            .text('')
            .attr('title', '')
            .hide();

}

// display the error badges
function showBadges(siteList, counts) {

    // main menus list for iteration
    var formMenu = getFormMenuArray();

    // set up divs for badges
    for (i = 0; i < formMenu.length; i++) {
        $('#' + formMenu[i]).css("background-repeat", "no-repeat")
                .css("color", "white");

        $('#' + formMenu[i] + 'Preferred').css("background-repeat", "no-repeat")
                .css("color", "white");

        $('#' + formMenu[i] + 'Modified').css("background-repeat", "no-repeat")
                .css("color", "gray");
    }

    // sub-menus
    var formPages = getFormPagesArray();

    for (i = 0; i < formPages.length; i++) {
        $('#' + formPages[i]).css("background-repeat", "no-repeat")
                .css("color", "white");

        $('#' + formPages[i] + 'Preferred').css("background-repeat", "no-repeat")
                .css("color", "white");

        $('#' + formPages[i] + 'Modified').css("background-repeat", "no-repeat")
                .css("color", "gray");
    }

    // cleans up the json code before parsing it
    var counts_ = get_json_substring(counts);
    var counts = $.parseJSON(counts_);

    var errorCounts = counts['errorCounts'];
    var preferredCounts = counts['preferredCounts'];
    var modCounts = counts['modCounts'];

    // display the error counts in the badges
    for (var i in errorCounts) {

        if (errorCounts[i] > 0) {
            $('#' + i).addClass('errorBadge')
                    .css("background", "rgb(250,0,0)")
                    .css("color", "white")
                    .text(errorCounts[i]).attr('title', 'Errors or Missing "Required" Fields')
                    .show();
            $('#' + i + 'Preferred').css('width', '36px');
        }
        else
        {
            $('#' + i).hide()
                    .css("background-color", "transparent")
                    .text(''); // must have something in the cell to show up then set color transparent (prev line)
            $('#' + i + 'Preferred').css('width', '16px');
        }

    }

    for (var i in preferredCounts) {

        if (preferredCounts[i] > 0) {

            $('#' + i + 'Preferred').addClass('preferredBadge')
                    .css("background-color", "rgb(255, 152, 27)")
                    .css("color", "white")
                    .text(preferredCounts[i]).attr('title', 'Optional "Preferred" Fields Missing')
                    .show();
            $('#' + i + 'Modified').css('width', '30px');
        }
        else
        {
            $('#' + i + 'Preferred').hide()
                    .css("background-color", "transparent")
                    .css("color", "white")
                    .text('');
            $('#' + i + 'Modified').css('width', '20px');
        }

    }

    for (var i in modCounts) {

        if (modCounts[i] > 0 && modCountsActive) { // global modCountsActive set at top of this file
            $('#' + i + 'Modified').addClass('modifiedBadge')
                    .css("background-color", "rgb(255,255,66)")
                    .css("color", "gray")
                    .text(modCounts[i]).attr('title', 'Fields Are Modified and are Different than IGS Data')
                    .show();
        }
        else
        {
            $('#' + i + 'Modified').hide()
                    .css("background-color", "transparent")
                    .css("color", "gray")
                    .text('');
        }

    }

}

// calculate and update the STATUS LITE on each site in the list
function updateStatus(FourID) {

    // remove startup message and show col 3 forms panel
    $('#userMessage').remove();
    $('#framesContainer').css('display', 'block');

    $.get('forms/siteStatus.php?FourID=' + FourID, function(data) {
        var title = '';
        if (data.indexOf('active') > -1) {
            title = 'Green: Active - No Errors';
        } else if (data.indexOf('errors') > -1) {
            title = 'Red: Errors or Missing Required Fields';
        } else if (data.indexOf('modified') > -1) {
            title = 'Amber: Changes Made - Submit to IGS for Validation';
        } else if (data.indexOf('pending') > -1) {
            title = 'Blue: Submited to IGS - Pending Validation';
        } else if (data.indexOf('dormant') > -1) {
            title = 'Black: Dormant - No Data for Extended Period';
        }

        $('#img' + FourID).attr('src', data)
                .attr('title', title);
        globalSiteStatusFile = data; // enable_buttons()->form-functions.js
        setSubmitButton('updateStatus');
    });

}

// not used
function validate_forms_test() {

    alert('test');

}

/* *
 * 
 * CLICK ON A SITE LIST ITEM AND TOGGLE THE COLORS
 * 
 * click on Site Menu item - this: 
 * - sets ALL of the items background color to "deselected" color before setting the currently selected item to clear the list
 * - sets the background color of the item
 * - sets the name of the site in the Banner
 * */
$(function() {
    $(document).on("click", ".siteloglist_element", function() {

        //confirm_quit_page();
        if (!checkIfModified()) {
            return false;
        }
        ;

        clearPage();
        cleanUpMyIframe();

        // reset all bg colors
        $(".siteLogList_Row").css("background-color", "rgb(225,225,225)");
        $('.badgeRow').css('border-color', 'rgb(225,225,225)');

        // show menu after a site is selected
        $('#menu').css('display', 'block');

        // set current item bg color to selected
        $("#siteLogList_Row_" + this.id).css("background-color", "rgb(180,180,180)");
        $('#badgeRow_' + this.id).css('border-color', 'rgb(180,180,180)');

        // set name of current selected site in the banner
        $("#station_id").text(this.id);

        setStation(this.id);
        var stationCode = this.id;

        // calculates and displays ERROR BADGES for the selected site
        getErrorCounts(this.id, this);

    });

});

/**
 * 
 * CLICK ON A LIST ITEM AND TOGGLE THE COLORS
 * SHOULD ALSO USE FOR USER LIST AND AGENCY LIST ETC
 * 
 *   List Click (user agency etc)
 *   
 */

$(function() {
    $(document).on("click", ".menulist_element", function() {

        if (!checkIfModified()) {
            return false;
        }
        ;

        // reset all bg colors
        $(".siteloglist_element").css("background-color", "#F0F0F0");

        // set current item bg color to selected
        $(this).css("background-color", "#D6D6D6");

        // set menu element id in the form (hidden)
        $("#list_id").text(this.id);

        $("#myIframe_top_margin").text('');
        $("#myIframe").text('');

        runCurrentFunction();

    });

});

function runCurrentFunction() {

    var currentFunction = $('#currentFunction').val();

    if (currentFunction !== '') {
        eval(currentFunction);
    }

}

function setCurrentFunction(currentFunction) {

    $('#currentFunction').val(currentFunction);

}

//search button "hover" behavior
$(document).ready(function() {
    $("#search_button").hover(function() {
        $(this).css("border", "1px solid black");
    },
            function() {
                $(this).css("border", "0px solid black");
            });
});

// Login/Logout Button - currently not used - gmize 4/18/14
$(document).ready(function() {
    $("#login").click(function() {

        if (!checkIfModified()) {
            return false;
        }
        ;


        // - true = show full login page 
        // - false = only display the "Logged in as:..." message at top of page
        loginPage(true);


    });
});

/**
 * 
 * BACK BUTTON
 * 
 */
$(function() {
    $(document).on("click", "#back_button", function() {
        parent.history.back();
        return false;
    });
});

$(function() {
    $(document).on("click", "#beginning_button", function() {
        // LOGIN_PAGE is set in slm.php
        window.location.replace(PATH_URL + '/login.php');
        return false;
    });
});

/**
 * 
 * SEND TEST EMAIL
 * 
 */
$(document).ready(function() {
    $("#email").click(function() {

        if (!checkIfModified()) {
            return false;
        }
        ;

        $("#myIframe_top_margin").text("");
        $("#myIframe_top_margin").text("Sending Test Email...");
        $.get("lib/email/send_test_email.php", function(data) {

            alert(data);

            $("#myIframe_top_margin").text("");

        });

    });
});


/*
 * User LOGOUT 
 * 
 */

function logOut() {
    if (!checkIfModified()) {
        return false;
    }
    ;
    var params = {};
    $.get('forms/logout.php', params, callback_logout);
}

$(document).ready(function() {
    $("#logout").click(function() {

        if (!checkIfModified()) {
            return false;
        }
        ;

        var params = '';

        $.get('forms/logout.php', params, callback_logout);

        //}

    });
});

function callback_logout(data) {

    if (data.substring(0, 10) === 'Logged Out') {

        $('#logged_in_as').text('');
        $('#user_name_display').text('');
        //window.location.href = "http://localhost/igsdev/src7/login.php";
        //window.location.href = PATH_URL+"login.php"; 
        // for some reason it quit seeing the global PATH_URL var...? see top of slm.php
        // PATH_URL - may not be needed - was added to ensure location integrity
        window.location.href = "login.php";




    }

    // - true  = show full login page
    // - false = only display the "Logged in as:..." message at top of page
    loginPage(true);

}

$(document).ready(function() {
    $(document).on("click", "#x-page_cancel_button", function() {

        $("#myIframe").text("");

    });
});

/**
 * 
 * Admin - Edit Member Profiles
 * 
 */
function editMemberProfiles() {

    if (!checkIfModified()) {
        return false;
    }
    ;

    window.open('igs_page.php?f=adminUserEditMenu', '_blank');

}

function editAgencyProfiles() {

    if (!checkIfModified()) {
        return false;
    }
    ;

    window.open('igs_page.php?f=adminAgencyEditMenu', '_blank');

}

function editNetworkProfiles() {

    if (!checkIfModified()) {
        return false;
    }
    ;

    window.open('igs_page.php?f=adminNetworkEditMenu', '_blank');

}

/**
 * 
 * Contact Button
 * 
 */
$(document).ready(function() {
    $("#contact").click(function() {

        if (modified) {

            //alert('Current Page is Modifed...Save or Exit First...');
            if (!confirm('Current Page is Modifed...Abandon changes?')) {
                return false;
            }

            modified = false;

        }


        alert('Contact Function Here');


    });
});

/**
 * 
 * USER REGISTRATION FUNCTIONS
 * 
 * 
 */
$(document).ready(function() {
    $(document).on("click", "#register-now", function() {

        globalHelpID = "register-now";

        $('#myIframe').text('');

        var params = "";

        $.post('forms/user_register.php', params, callback_register_now);

    });
});

function callback_register_now(data) {

    $("#myIframe").text("");
    $("#myIframe").append(data);
}

$(document).ready(function() {
    $(document).on("click", "#register_cancel_button", function() {

        $("#myIframe").text("");
        $("#myIframe_top_margin").text("");

        // - true = show full login page
        // - false = only display the "Logged in as:..." message at top of page
        // RETURN TO LOGIN PAGE
        loginPage(true);

    });
});

$(document).ready(function() {
    $(document).on("click", "#register_submit_button", function() {

        var params = {
            register_firstname: {key: 'firstname', value: $('#register_firstname').get(0).value},
            register_lastname: {key: 'lastname', value: $('#register_lastname').get(0).value},
//           register_country:            {key: 'country'  , value:$('#register_country').get(0).value},
            registrationAgency: {key: 'registrationAgency', value: $('#registrationAgency').get(0).value},
            register_email: {key: 'email', value: $('#register_email').get(0).value},
//           register_email_confirm:      {key: 'email_confirm'    , value:$('#register_email_confirm').get(0).value},
            register_password: {key: 'password', value: $('#register_password').get(0).value},
            register_password_confirm: {key: 'password_confirm', value: $('#register_password_confirm').get(0).value}
        };

        $("#myIframe_top_margin").text("Validating Page and Sending Email...");

        $.post('forms/user_register_save.php', params, callback_register);
        modified = false;

    });
});


function callback_register(data) {

    // extract the json data if email is a duplicate
    json_data = get_json_substring(data);

    // email not a duplicate in use
    if (json_data !== '{}') {

        // parse the json data for results
        var result_array = $.parseJSON(json_data);

        // if page validation passes
        if (result_array.result === 'validation_passed') {

            // clear the page
            $("#myIframe_top_margin").text("");
            $("#myIframe").text("");

            // success message
            $.get("forms/user_register_message.php?email=" + result_array.email, function(data, status) {
                $("#myIframe").append(data);
            });
        }

    }
    else
    {

        // email address is already used
        $("#myIframe_top_margin").text("Check Fields and Correct as Needed...");

        igsAlert(data, {fn1:''}, false);

    }

}

$(document).ready(function() {
    $(document).on("click", "#register_message_button", function() {
        // after registration is complete - click the OK button, clear the page and return to the login page
        $("#myIframe").text("");
        loginPage(true);
    });
});
// *************** END REGISTER


/**
 * 
 * FORGOT PASSWORD - RESET
 * 
 * 
 */

$(document).ready(function() {
    $(document).on("click", "#forgot-password", function() {

        globalHelpID = "forgot-password";

        $('#myIframe').text('').css('margin-left', '15px');

        var params = "";
        $.post('forms/user_password_forgot.php', params, callback_password_forgot);

    });
});

function callback_password_forgot(data) {

    $("#myIframe").text("");
    $("#myIframe").append(data);
}

$(function() {

    $(document).on("click", "#yesLabel", function() {

        $("#myIframe_top_margin").text("Sending Email to Reset Password...");

        var Email = $('#Email').val();

        params = {Email: Email};

        $.post('forms/user_password_forgot_save.php', params, callback_yesLabel);
        modified = false;
    });

});

function callback_yesLabel(data) {

    $("#myIframe_top_margin").text("Sending Email to Reset Password...");

    // extract the json data if email is a duplicate
    json_data = get_json_substring(data);

    // email not a duplicate in use
    if (json_data !== '{}') {

        // parse the json data for results
        var result_array = $.parseJSON(json_data);

        // if page validation passes
        if (result_array.result === 'success') {

            // clear the page
            $("#myIframe_top_margin").text("");
            $("#myIframe").text("");

            // success message
            $.get("forms/user_password_forgot_message.php?email=" + result_array.email, function(data, status) {
                $("#myIframe").append(data);
            });
        }

    }
    else
    {

        // email address is already used
        $("#myIframe_top_margin").text("Check Fields and Correct as Needed...");

        igsAlert(data, {fn1:''}, false);

    }

}

$(document).ready(function() {
    $(document).on("click", "#password_forgot_cancel_button", function() {

        $("#myIframe").text("");
        $("#myIframe_top_margin").text("");

        // - true = show full login page
        // - false = only display the "Logged in as:..." message at top of page
        // RETURN TO LOGIN PAGE
        loginPage(true);

    });
});

$(document).ready(function() {
    $(document).on("click", "#password_forgot_submit_button", function() {

        var params = {
            privatekey: '6LdV6uUSAAAAAAUKZwhhpbBJBDTtmeImaI43-aLg',
            remoteip: $('#remoteip').val(),
            recaptcha_challenge_field: $('#recaptcha_challenge_field').val(),
            recaptcha_response_field: $('#recaptcha_response_field').val(),
            Email: $('#Email').val()
        };

        var Email = $('#Email').val();

        $.post('forms/captcha/checkCaptcha.php', params, function(data) {

            if (data === 'success') {
                $("#myIframe").text("");
                $("#myIframe_top_margin").text("");

                $("#myIframe_top_margin").text("Sending Email to Reset Password...");

                params = {Email: Email};

                $.post('forms/user_password_forgot_save.php', params, callback_password_forgot_save);
                modified = false;

            }
            else
            {
                // reload and try again
                alert('Incorrect - Please Try Again...' + data);
                loadCaptcha();

            }


        });

    });
});

function callback_password_forgot_save(data) {

    $("#myIframe_top_margin").text("Sending Email to Reset Password...");

    // extract the json data if email is a duplicate
    json_data = get_json_substring(data);

    // email not a duplicate in use
    if (json_data !== '{}') {

        // parse the json data for results
        var result_array = $.parseJSON(json_data);

        // if page validation passes
        if (result_array.result === 'success') {

            // clear the page
            $("#myIframe_top_margin").text("");
            $("#myIframe").text("");

            // success message
            $.get("forms/user_password_forgot_message.php?email=" + result_array.email, function(data, status) {
                $("#myIframe").append(data);
            });
        }

    }
    else
    {

        // email address is already used
        $("#myIframe_top_margin").text("Check Fields and Correct as Needed...");

        alert(data);

    }

}

// CAPTCHA - disabled do to problems with the server
//$(document).ready(function(){
//   $(document).on("click","#password_forgot_submit_button", function(){
//
//        var params = {
//            privatekey:  '6LdV6uUSAAAAAAUKZwhhpbBJBDTtmeImaI43-aLg',
//            remoteip:    $('#remoteip').val(),
//            recaptcha_challenge_field:   $('#recaptcha_challenge_field').val(),
//            recaptcha_response_field:    $('#recaptcha_response_field').val(),
//            Email:                       $('#Email').val()
//        };
//
//        var Email = $('#Email').val();
//       
//        $.post('forms/captcha/checkCaptcha.php',params,function(data){
//        
//        if (data === 'success'){
//            $("#myIframe").text("");
//            $("#myIframe_top_margin").text("");
//
//            $("#myIframe_top_margin").text("Sending Email to Reset Password...");
//
//            params = {Email: Email};
//
//            $.post('forms/user_password_forgot_save.php', params, callback_password_forgot_save);
//            modified = false;
//
//        }
//        else
//        {
//            // reload and try again
//            alert('Incorrect - Please Try Again...'+data);
//            loadCaptcha();
//            
//        }
//        
//        
//    });
//             
//   });
//});


//function callback_password_forgot_save(data){
//
//    $("#myIframe_top_margin").text("Sending Email to Reset Password...");
//
//    // extract the json data if email is a duplicate
//    json_data = get_json_substring(data);
//
//    // email not a duplicate in use
//    if (json_data !== '{}'){
//
//        // parse the json data for results
//        var result_array = $.parseJSON(json_data);
//
//        // if page validation passes
//        if (result_array.result==='success'){
//            
//            // clear the page
//            $("#myIframe_top_margin").text("");
//            $("#myIframe").text("");
//
//            // success message
//            $.get("forms/user_password_forgot_message.php?email="+result_array.email,function(data,status){
//                $("#myIframe").append(data);
//            });
//        }
//        
//    }
//    else
//    {
//        
//        // email address is already used
//        $("#myIframe_top_margin").text("Check Fields and Correct as Needed...");
//
//        alert(data);
//        
//    }
//   
//}
//


function reset_password(Email, Password) {

    var params = {email:Email};

    $.post('forms/user_password_reset_change.php', params, callback_reset_password);

}

function callback_reset_password(data){
    $('#myIframe').append(data);
    $('#banner-right').css('border','0');
}

$(document).ready(function() {

    $(document).on("click", "#user_password_reset_submit_button", function() {

        var params = {
            AgencyUser: {current_password: $('#current_password').get(0).value,
                Password: $('#new_password').get(0).value,
                confirm_new_password: $('#new_password_confirm').get(0).value}
        };

        $.post('forms/user_password_reset_save.php', params, callback_reset_password_save);

    });
});


function callback_reset_password_save(data) {



    if (data.substring(0, 15) === 'Save Successful') {

        igsAlert('Your password has been successfully reset.', {fn1:'reset_password_reloadLogin'}, false)

        $('#myIframe_top_margin').text('');
        $("#myIframe").text("");

    }
    else
    {

        igsAlert('There was a problem with resetting your password: '+data, {fn1:''}, false)

    }
    modified = false;

}

function reset_password_reloadLogin(){
        $('#myIframe_top_margin').text('');
        $("#myIframe").text("");
        window.location.replace(PATH_URL + '/login.php');    
}

$(document).ready(function() {

    $(document).on("click", "#user_password_reset_cancel_button", function() {

        window.location.replace(PATH_URL + '/login.php');

    });
    
});


//******** END FORGOT PASSWORD

// used to extract the jsaon string from returned data 
// in case the returned data has some other returned text in it
function get_json_substring(string) {

    var pos1 = string.indexOf('{');
    var pos2 = string.lastIndexOf('}');

    if (pos1 < 0 | pos2 < 0) {
        return '{}';
    }

    return string.substring(pos1, pos2 + 1);

}


/**
 * 
 * Create myIframe
 * 
 */
function myIframe_unset() {

    // for the login page remove (move) part of the main page menu frames/borders
    $('myIframe').text('');
    $(".menu").css("width", "0%").css('border', '0px solid black');
    $(".myIframe_container").css("width", "99.9%");

}

function myIframe_set() {

    // for the menu pages move the frames/borders back
    $('#myIframe').text('');
    $(".menu").css("width", "39%").css('border-right', '1px solid black');
    $(".myIframe_container").css("width", "60.9%");

}

/**
 * 
 * Login/Authentication Functions
 * 
 * 
 */

// Login Page
function loginPage(sys_login) {

    // if sys_login = true then the full login page is displayed
    // if sys_login = false then just the "Logged In As:..." message is 
    // displayed in the top right corner of the page
    $(document).ready(function() {

        if (sys_login) {
            clearPage();
        }
        $.get("forms/login_page.php", function(data, status) {

            

            if (sys_login) {
                // remove the divisions in the main page so the login page will 
                // fill the main page - they will be moved back after login and
                // the main menu is displayed
                myIframe_unset();
            }
            //$('#myIframe').text("");

            // if already logged in (see login.php) - ">>>" is just used as a unique indicator
            if (data.substring(0, 3) !== '>>>') {

                // if called by the login.php app not the slm.php app
                // display the full login page
                if (sys_login) {
                    $('#myIframe').append(data);
                }
            }
            else
            {
                // already logged in so just display the user name
                //$('#logged_in_as').text('  Logged in as: ');
                $('#user_name_display').text(data.substring(3));

                // if called by the login.php app not the slm.php app
                if (sys_login) {
                    loginPage_Menu(1);
                }
            }

        });

    });
}

function moderationloginPage(sys_login) {

    // if sys_login = true then the full login page is displayed
    // if sys_login = false then just the "Logged In As:..." message is 
    // displayed in the top right corner of the page
    $(document).ready(function() {
        $.get("forms/login_page.php", function(data, status) {

            if (sys_login) {
                // remove the divisions in the main page so the login page will 
                // fill the main page - they will be moved back after login and
                // the main menu is displayed
                myIframe_unset();
            }

            // if already logged in (see login.php) - ">>>" is just used as a unique indicator
            if (data.substring(0, 3) !== '>>>') {

                // if called by the login.php app not the slm.php app
                // display the full login page
                if (sys_login) {
                    $('#myIframe').append(data);
                }
            }
            else
            {
                // already logged in so just display the user name
                //$('#logged_in_as').text('  Logged in as: ');
                $('#user_name_display').text(data.substring(3));

                // if called by the login.php app not the slm.php app
                if (sys_login) {
                    loginPage_Menu(1);
                }
            }

        });
    });
}


// Login Submit Button
$(document).ready(function() {
    $(document).on("click", "#login_submit_button", function() {

        var params = {login_id: $('#login_username').val(),
            password: $('#login_password').val(),
            rememberID: $('#rememberID').is(':checked')
        };

        $.post('lib/authenticate.php', params, callback_login);

    });
});

$(document).on("keyup", "#welcome_container", function(event) {
    if (event.keyCode === 13) {
        $("#login_submit_button").click();
    }
});

// display user's name on main screen as logged in
function callback_login(data) {

    if (data.substring(0, 7) !== 'success') {

        igsAlert('Login Failed - Check User ID and Password...(' + data + ')', {fn1:'loginPageTrue'}, false)

    }
    else
    {
        data = data.substring(7);
        //$('#logged_in_as').text('  Logged in as: ');
        $('#user_name_display').text(data);
        $('#myIframe_top_margin').text("");
        $('#myIframe').text("");
        
        // be sure that "modified" is false for a fresh start
        // "modified" is set true when a field is changed on a form and not yet saved or aborted
        // this prevents exiting from a form before it is saved and losing all the changes
        modified = false;
        $('#myIframe_top_margin').text('');
        window.location.href = 'slm.php';

    }

}

function loginPageTrue(){
    loginPage(true);
}

/**
 * 
 * login page main menu (after login)
 * 
 * 
 */

function loginPage_Menu(menuID) {

    window.location.href = 'slm.php';

//    myIframe_set();
//    params = {menuID: menuID};
//    
//    $.post('lib/igs_menu.php',params,function(data,status){
//       
//        //myIframe();
//        $('#menu').append(data);
//        
//    });

}

function launchJS(linkJS) {

    // get params and pass to link

    window.location.href = linkJS;

}


/**
 * 
 * User Profile
 * 
 */
$(document).ready(function() {

    $(document).on("click", "#preferences", function() {

        profile_page();

    });

});

function profile_page() {

    // every form should set the global var "modified" to "true" if a field is changed
    // and set "modified" back to "false" when saved or aborted    

    if (!checkIfModified()) {
        return false;
    }
    ;

    $.get('forms/user_profile.php', function(data) {
        $("#myIframe").text("");
        $('#myIframe_top_margin').text('');
        $("#myIframe").append(data);
    });


}

// profile_page_cancel_button
$(function() {
    $(document).on("click", "#profile_page_cancel_button", function() {
//        parent.history.back();
//        return false;
        clearPage();
    });
});

$(document).ready(function() {
    $(document).on("click", "#profile_submit_button", function() {

        var params = {
            AgencyUser: {FirstName: $('#profile_firstname').get(0).value,
                LastName: $('#profile_lastname').get(0).value,
                Country: $('#profile_country').get(0).value,
                Email: $('#profile_email').get(0).value,
                //Confirm_Email: $('#profile_confirm_email').get(0).value,
                Phone1: $('#profile_phone').get(0).value,
                Address1: $('#profile_address').get(0).value,
                Address2: $('#profile_address2').get(0).value,
                City: $('#profile_city').get(0).value,
                State_Province: $('#profile_state').get(0).value,
                Postal_Code: $('#profile_zipcode').get(0).value}
        };

        $.post('forms/user_profile_save.php', params, callback_profile_save);

    });
});


function callback_profile_save(data) {
    
    if (data.indexOf('Save Successful') < 0){
        igsAlert('Record Not Saved: <span style="color:#ff0000">'+data+'</span>',{fn1:''},false);
    }
    else
    {
        saveMessage(data.indexOf('Save Successful') > -1);
    }

    modified = false;

    //parent.history.back();
    return false;
}
//******** END User Profile

//********************* LIST MAINTENANCE **********************
function listMaintenance() {

    if (!checkIfModified()) {
        return false;
    }

    $.get('forms/admin_list_equipment.php', function(data) {
        $('#menu').hide();
        $('#framesOuterContainer').css('width','885px');
        $("#myIframe").text("").css('width','100%').css('height','645px');
        $('#myIframe_top_margin').text('').hide();
        $("#myIframe").append(data);
    });


}

// profile_page_cancel_button
$(function() {
    $(document).on("click", "#cancel_button", function() {
        clearPage();
    });
});

$(document).ready(function() {
    $(document).on("click", "#listMaintenance_submit_button", function() {

        var params = {
            AgencyUser: {FirstName: $('#profile_firstname').get(0).value,
                LastName: $('#profile_lastname').get(0).value,
                Country: $('#profile_country').get(0).value,
                Email: $('#profile_email').get(0).value,
                //Confirm_Email: $('#profile_confirm_email').get(0).value,
                Phone1: $('#profile_phone').get(0).value,
                Address1: $('#profile_address').get(0).value,
                Address2: $('#profile_address2').get(0).value,
                City: $('#profile_city').get(0).value,
                State_Province: $('#profile_state').get(0).value,
                Postal_Code: $('#profile_zipcode').get(0).value}
        };

        $.post('forms/listMaintenance_save.php', params, callback_listMaintenance_save);

    });
});


function callback_listMaintenance_save(data) {

    saveMessage(data === 'Save Successful');

    modified = false;

    //parent.history.back();
    return false;
}
//******** END List Maintenance **********

/**
 * 
 * PAGE CONTROLS
 * 
 * 
 * 
 */

// page_cancel_button
$(function() {
    $(document).on("click", "#page_cancel_button", function() {
        parent.history.back();
        return false;
    });
});

// page_cancel_button_clear
$(document).ready(function() {
    $(document).on("click", "#page_cancel_button_clear", function() {

        $("#myIframe").text("").css('border-top', '0px solid gray');
        $('#myIframe_top_margin').text('');
        $('#framesOuterContainer_IGS_Page').hide();
        
    });
});


/*******************************************************************************
 * 
 * ADMIN USER FUNCTIONS
 * 
 * adminUserEditMenu
 * 
 * 
 */
function adminUserEditMenu() {

    if (!checkIfModified()) { return false; };
    
        $(function(){
            document.title = 'IGS Admin-Edit Members';
        });
        

    // user list
    $.get('forms/user_list.php', function(data) {
        $('.user-list').css('border-right', '1px solid black');
        $('#list').append(data);
    });

    // admin user menu
    params = {menuID: 2};
    $.post('lib/igs_menu.php', params, function(data, status) {

        // put a border between the "form header" and the form body
        $('#myIframe_top_margin').css('border-bottom', '1px solid black');
        // print the page
        $('#menu').append(data);

        setCurrentFunction('adminUserViewSettings()');
        
        $('#framesOuterContainer_IGS_Page').show();

    });

}

// ********** END adminUserEditMenu

/** 
 * 
 * adminUserEditSettings
 * 
 * 
 */
function adminUserEditSettings() {

    // user id is the numbers from the element id which is created dynamically from the data
    var user_id = $('#list_id').text();

    // strip off the first four chars from the user menu element for the user id (ex: user45)
    user_id = user_id.substring(4);

    // if no user id then a user is not yet selected
    if (user_id !== '') {
        $.get('forms/admin_user_edit.php?user_id=' + user_id, function(data) {
            // clear the page before printing the new page
            $("#myIframe").text("");
            $('#myIframe_top_margin').text('');
            // print the new page
            $("#myIframe").append(data);
        });
    }
    else
    {
        $('#myIframe').text('');
        $('#myIframe_top_margin').text('select a user...');
    }

    setCurrentFunction('adminUserEditSettings()');

    $('#framesOuterContainer_IGS_Page').show();
}


$(document).ready(function() {
    $(document).on("click", "#edit_user_submit_button", function() {

        var params = {
            AgencyUser: {LoginID: $('#LoginID').val(),
                Active: $('#editUser_Active').attr('checked') ? 1 : 0,
                UserGroup: $('#editUser_UserGroup').val(),
                Sysadmin: $('#editUser_Sysadmin').attr('checked') ? 1 : 0,
                AgencyID_list: getAgencySelections()}
        };

        $.post('forms/admin_user_edit_save.php', params, callback_edit_user_save);

    });
});

function getAgencySelections() {

    var selections = new Array();

    $('input[name="option[]"]:checked').each(function(i) {
        selections[i] = $(this).val();
    });

    return selections;

}

function callback_edit_user_save(data) {

    // completion message - either saved or not saved
    alert(data);

    // print comletion message on the top of the form
    $('#myIframe_top_margin').text(data);
    modified = false;

    return false;

}

//******** End adminUserEditSettings


/** 
 * 
 * adminUserCreate
 * 
 * 
 */
function adminUserCreate() {

    $('#myIframe_top_margin').text('loading page...');

    $.get('forms/admin_user_create.php', function(data) {
        // clear the page before printing the new page
        $("#myIframe").text("");
        $('#myIframe_top_margin').text('');
        // print the new page
        $("#myIframe").append(data);
    });

    setCurrentFunction('adminUserViewSettings()');

    $('#framesOuterContainer_IGS_Page').show();
}


$(document).ready(function() {
    $(document).on("click", "#create_user_submit_button", function() {

        // grab field values from the form for passing to the "save" procedure
        var params = {
            AgencyUser: {
                FirstName: $('#FirstName').val(),
                LastName: $('#LastName').val(),
                Address: $('#Address1').val(),
                Address2: $('#Address2').val(),
                City: $('#City').val(),
                State_Province: $('#State').val(),
                Country: $('#Country').val(),
                Postal_Code: $('#Postal_Code').val(),
                Phone1: $('#Phone1').val(),
                Email: $('#Email').val(),
                Active: $('#Active').attr('checked') ? 1 : 0,
                UserGroup: $('#UserGroup').val(),
                Sysadmin: $('#Sysadmin').attr('checked') ? 1 : 0,
                AgencyID: $('#AgencyID').val(),
                Password: $('#Password').val(),
                ConfirmEmail: $('#ConfirmEmail').val(),
                ConfirmPassword: $('#ConfirmPassword').val()}
        };

        $.post('forms/admin_user_create_save.php', params, callback_create_user_save);

    });
});


function callback_create_user_save(data) {

    if (data === 'record inserted') {

        alert('Record Saved');

        $('#myIframe_top_margin').text(data);
        modified = false;

        setCurrentFunction('adminUserViewSettings()');
        runCurrentFunction();

        return false;

    }
    else // form validation failed - see admin_user_create_save.php
    {

        $("#myIframe_top_margin").text("Check Fields and Correct as Needed...");
        alert(data);

    }

}
// END admin_user_create

/**
 * 
 * adminUserViewSettings()
 * 
 * 
 */
function adminUserViewSettings() {

    // user id is the numbers from the element id which is created dynamically from the data
    var user_id = $('#list_id').text();

    // strip off the first four chars from the user menu element for the user id (ex: user45)
    user_id = user_id.substring(4);

    // if no user id then a user is not yet selected
    if (user_id !== '') {
        $.get('forms/admin_user_view.php?user_id=' + user_id, function(data) {
            $("#myIframe").text("");
            $('#myIframe_top_margin').text('');
            $("#myIframe").append(data);
        });
    }
    else
    {
        $('#myIframe').text('');
        $('#myIframe_top_margin').text('select a user...');
    }

    setCurrentFunction('adminUserViewSettings()');

    $('#framesOuterContainer_IGS_Page').show();
}
//******* End adminUserViewSettings

/**
 * 
 * adminUserReport()
 * 
 * 
 */
function adminUserReport() {

    $('#myIframe_top_margin').css('border-bottom', '1px solid black');
    igsMessage('Loading...');
    
    $.get('forms/admin_user_report.php', function(data) {
        $("#myIframe").text("");
        $('#myIframe_top_margin').text('');
        $("#myIframe").append(data);
        removeIGSMessage();
    });

    setCurrentFunction('adminUserViewSettings()');

    $('#framesOuterContainer_IGS_Page').show();
}
//******* End adminReport


/** 
 * 
 * adminUserDeleteProfile
 * 
 * 
 */
function admin_user_delete() {

    // user id is the numbers portion of the user menu element id (list_id) which 
    // is created dynamically from the AgencyUser table data
    var user_id = $('#list_id').text();

    // strip off the first four chars from the user menu element for the user id (ex: user45)
    user_id = user_id.substring(4);

    // if no user id then a user is not yet selected
    if (user_id !== '') {
        $.get('forms/admin_user_delete.php?user_id=' + user_id, function(data) {
            $("#myIframe").text("");
            $('#myIframe_top_margin').text('');
            $("#myIframe").append(data);
        });
    }
    else
    {
        $('#myIframe').text('');
        $('#myIframe_top_margin').text('select a user...');
    }

    setCurrentFunction('adminUserViewSettings()');

    $('#framesOuterContainer_IGS_Page').show();
}


$(document).ready(function() {
    $(document).on("click", "#DeleteProfile_submit_button", function() {

        var params = {
            AgencyUser: {LoginID: $('#LoginID').val()}
        };

        if (confirm('Delete This Profile?  Record CANNOT be recovered...')) {
            $.post('forms/admin_user_delete_save.php', params, callback_delete_profile_save);
        }

    });
});


function callback_delete_profile_save(data) {

    alert(data);

    $('#myIframe_top_margin').text(data);
    modified = false;

}
// END Admin Delete User

/*******************************************************************************
 * 
 * AGENCY
 * 
 * adminAgencyEditMenu
 * 
 * 
 */
function adminAgencyEditMenu() {

    if (!checkIfModified()) {
        return false;
    }
    ;

        $(function(){
            document.title = 'IGS Admin-Edit Agencies';
        });


    // user list
    $.get('forms/agency_list.php', function(data) {
        $('.user-list').css('border-right', '1px solid black');
        $('#list').append(data);
    });

    // admin user menu
    params = {menuID: 3};
    $.post('lib/igs_menu.php', params, function(data, status) {

        $('#myIframe_top_margin').css('border-bottom', '1px solid black');
        //myIframe();
        $('#menu').append(data);

    });


}
// ********** END adminAgencyEditMenu


/**
 * 
 * adminAgencyView()
 * 
 * 
 */
function adminAgencyView() {

    var agency_id = $('#list_id').text();

    agency_id = agency_id.substring(6);

    if (agency_id !== '') {
        $.get('forms/admin_agency_view.php?agency_id=' + agency_id, function(data) {
            $("#myIframe").text("");
            $('#myIframe_top_margin').text('');
            $("#myIframe").append(data);
            $('#framesOuterContainer_IGS_Page').show();
        });
    }
    else
    {
        $('#myIframe').text('');
        $('#myIframe_top_margin').text('select an Agency...');
    }
}
//******* End adminUserViewSettings

/** 
 * 
 * adminAgencyEditSettings
 * 
 * 
 */
function adminAgencyEdit() {

    $('#myIframe_top_margin').text('Loading Page...');

    var agency_id = $('#list_id').text();

    agency_id = agency_id.substring(6);

    if (agency_id !== '') {
        $.get('forms/admin_agency_edit.php?agency_id=' + agency_id, function(data) {
            $("#myIframe").text("");
            $('#myIframe_top_margin').text('');
            $("#myIframe").append(data);
            $('#framesOuterContainer_IGS_Page').show();
        });
    }
    else
    {
        $('#myIframe_top_margin').text('select an Agency...');
    }
}


$(document).ready(function() {
    $(document).on("click", "#edit_agency_submit_button", function() {

        var params = {
            Agency: {AgencyID: $('#AgencyID').val(),
                AgencyName: $('#AgencyName').val(),
                Address: $('#Address').val(),
                Address2: $('#Address2').val(),
                City: $('#City').val(),
                State: $('#State').val(),
                Postal_Code: $('#Postal_Code').val(),
                Country: $('#Country').val(),
                Contact: $('#Contact').val(),
                Email1: $('#Email1').val(),
                Email2: $('#Email2').val(),
                Phone1: $('#Phone1').val(),
                Phone2: $('#Phone2').val(),
                Other: $('#Other').val(),
                Active: $('#Active').attr('checked') ? 1 : 0}
        };

        $.post('forms/admin_agency_edit_save.php', params, callback_edit_user_save);

    });
});


function callback_edit_agency_save(data) {

    alert(data);

    $('#myIframe_top_margin').text(data);
    modified = false;

    return false;

}

//******** End adminAgencyEditSettings


/** 
 * 
 * adminAgencyCreate
 * 
 * 
 */
function adminAgencyCreate() {

    $('#myIframe_top_margin').text('loading page...');

    $.get('forms/admin_agency_create.php', function(data) {
        // clear the page before printing the new page
        $("#myIframe").text("");
        $('#myIframe_top_margin').text('');
        // print the new page
        $("#myIframe").append(data);
        $('#framesOuterContainer_IGS_Page').show();
    });

}


$(document).ready(function() {
    $(document).on("click", "#create_agency_submit_button", function() {

        // grab field values from the form for passing to the "save" procedure
        var params = {
            Agency: {AgencyID: $('#AgencyID').val(),
                AgencyName: $('#AgencyName').val(),
                Address: $('#Address').val(),
                Address2: $('#Address2').val(),
                City: $('#City').val(),
                State: $('#State').val(),
                Postal_Code: $('#Postal_Code').val(),
                Country: $('#Country').val(),
                Contact: $('#Contact').val(),
                Email1: $('#Email1').val(),
                Email2: $('#Email2').val(),
                Phone1: $('#Phone1').val(),
                Phone2: $('#Phone2').val(),
                Other: $('#Other').val(),
                Active: $('#Active').attr('checked') ? 1 : 0}
        };

        $.post('forms/admin_agency_create_save.php', params, callback_create_agency_save);

    });
});


function callback_create_agency_save(data) {

    if (data === 'record inserted') {

        alert('Insert Successfull');

        $('#myIframe_top_margin').text(data);
        modified = false;

        return false;

    }
    else // form validation failed - see admin_user_create_save.php
    {

        $("#myIframe_top_margin").text("Check Fields and Correct as Needed...");
        alert(data);

    }

}
// END admin_agency_create

/** 
 * 
 * adminAgencyDeleteProfile
 * 
 * 
 */
function adminAgencyDelete() {

    // user id is the numbers portion of the user menu element id (list_id) which 
    // is created dynamically from the AgencyUser table data
    var agency_id = $('#list_id').text();

    // strip off the first four chars from the user menu element for the user id (ex: user45)
    agency_id = agency_id.substring(6);

    // if no user id then a user is not yet selected
    if (agency_id !== '') {
        $.get('forms/admin_agency_delete.php?agency_id=' + agency_id, function(data) {
            $("#myIframe").text("");
            $('#myIframe_top_margin').text('');
            $("#myIframe").append(data);
            $('#framesOuterContainer_IGS_Page').show();
        });
    }
    else
    {
        $('#myIframe').text('');
        $('#myIframe_top_margin').text('select an Agency...');
    }
}


$(document).ready(function() {
    $(document).on("click", "#DeleteAgency_submit_button", function() {

        var params = {
            Agency: {AgencyID: $('#AgencyID').val()}
        };

        if (confirm('Delete This Agency?  Record CANNOT be recovered...')) {
            $.post('forms/admin_agency_delete_save.php', params, callback_delete_agency_save);
        }

    });
});


function callback_delete_agency_save(data) {

    alert(data);

    $('#myIframe_top_margin').text(data);
    modified = false;

}
// END Admin Delete User

/**
 * 
 * adminAgencyReport()
 * 
 * 
 */
function adminAgencyReport() {

    $('#myIframe_top_margin').css('border-bottom', '1px solid black');
    igsMessage('Loading...');

    $.get('forms/admin_agency_report.php', function(data) {
        $("#myIframe").text("");
        $('#myIframe_top_margin').text('');
        $("#myIframe").append(data);
        removeIGSMessage();
        $('#framesOuterContainer_IGS_Page').show();
    });

}
//******* End adminReport


/**
 * ASSIGN AGENCY TO SITES
 * 
 * adminAgencyAssign()
 * 
 */

function adminAgencySiteAssign() {

    $('#myIframe_top_margin').text('Loading Page...');

    var agency_id = $('#list_id').text();

    agency_id = agency_id.substring(6);

    if (agency_id !== '') {
        $.get('forms/admin_agency_assign.php?agency_id=' + agency_id, function(data) {
            $("#myIframe").text("");
            $('#myIframe_top_margin').text('');
            $("#myIframe").append(data);
            $('#framesOuterContainer_IGS_Page').show();
        });
    }
    else
    {
        $('#myIframe_top_margin').text('select an Agency...');
    }

}

function buildAgencyListLeft(AgencyID) {

    $.get('forms/admin_agency_list_left.php?AgencyID=' + AgencyID, function(data) {
        $('#list-left').append(data);
    });

}

function buildAgencyListRight(AgencyID) {

    $.get('forms/admin_agency_list_right.php?AgencyID=' + AgencyID, function(data) {
        $('#list-right').append(data);
    });

}

$(function() {

    $(document).on("click", ".listItemLeft", function() {

        if ($('#itemListVal' + this.id).val() === '0') {
            $('#' + this.id).css('background-color', '#CCC');
            $('#itemListVal' + this.id).val('1');
        }
        else
        {
            $('#' + this.id).css('background-color', 'transparent');
            $('#itemListVal' + this.id).val('0');
        }

    });

});

$(function() {

    $(document).on("click", ".listItemRight", function() {

        if ($('#itemListVal' + this.id).val() === '0') {
            $('#' + this.id).css('background-color', '#CCC');
            $('#itemListVal' + this.id).val('1');
        }
        else
        {
            $('#' + this.id).css('background-color', 'transparent');
            $('#itemListVal' + this.id).val('0');
        }

    });

});


$(function() {

    $(document).on('click', '#move-right', function() {

        $('.listItemLeft').each(function() {

            if ($('#itemListVal' + this.id).val() === '1') {
                $('#' + this.id).remove();
                $('#itemListVal' + this.id).remove();
                $('#list-right').append("<div class='tableRow' ><div id='" + this.id + "' class='listItemRight' >" + this.id + "</div><input id='itemListVal" + this.id + "' type='hidden' value='0' /></div>");
                $('#' + this.id).val('0');
            }

        });

    });

});

$(function() {

    $(document).on('click', '#move-left', function() {

        $('.listItemRight').each(function() {

            if ($('#itemListVal' + this.id).val() === '1') {
                $('#' + this.id).remove();
                $('#itemListVal' + this.id).remove();
                $('#list-left').append("<div class='tableRow' ><div id='" + this.id + "' class='listItemLeft' >$value</div><input id='itemListVal" + this.id + "' type='hidden' value='0' /></div>");
                $('#' + this.id).val('0');
            }

        });

    });

});


$(function() {

    $(document).on('click', '#agency_assign_submit_button', function() {
        var sitelist = {};
        var count = 0;
        $(".listItemRight").each(function() {

            sitelist[count] = this.id;
            count++;

        });

        params['AgencyID'] = $('#AgencyID').val();
        params['data'] = sitelist;

        $.post('forms/agency_assign_save.php', params, callback_agency_assign_save);

    });

});

function callback_agency_assign_save(data) {

    $("#myIframe_top_margin").text(data);
    alert(data);
}


/**
 * 
 * END AGENCY FUNCTIONS
 * 
 ******************************************************************************/


/*******************************************************************************
 * 
 * NETWORKS
 * 
 * adminNetworkEditMenu
 * 
 * 
 */
function adminNetworkEditMenu() {

    if (!checkIfModified()) {
        return false;
    }
    ;

        $(function(){
            document.title = 'IGS Admin-Edit Networks';
        });


    // user list
    $.get('forms/network_list.php', function(data) {
        $('.user-list').css('border-right', '1px solid black');
        $('#list').append(data);
    });

    // admin user menu
    params = {menuID: 4};
    $.post('lib/igs_menu.php', params, function(data, status) {

        $('#myIframe_top_margin').css('border-bottom', '1px solid black');
        //myIframe();
        $('#menu').append(data);

    });


}
// ********** END adminNetworkEditMenu

/**
 * 
 * adminNetworkView()
 * 
 * 
 */
function adminNetworkView() {

    var network_id = $('#list_id').text();

    network_id = network_id.substring(7);

    if (network_id !== '') {
        $.get('forms/admin_network_view.php?network_id=' + network_id, function(data) {
            $("#myIframe").text("");
            $('#myIframe_top_margin').text('');
            $("#myIframe").append(data);
            $('#framesOuterContainer_IGS_Page').show();
        });
    }
    else
    {
        $('#myIframe').text('');
        $('#myIframe_top_margin').text('select a Network...');
    }
}
//******* End adminUserViewSettings

/** 
 * 
 * adminNetworkEditSettings
 * 
 * 
 */
function adminNetworkEdit() {

    $('#myIframe_top_margin').text('Loading Page...');

    var network_id = $('#list_id').text();

    network_id = network_id.substring(7);

    if (network_id !== '') {
        $.get('forms/admin_network_edit.php?network_id=' + network_id, function(data) {
            $("#myIframe").text("");
            $('#myIframe_top_margin').text('');
            $("#myIframe").append(data);
            $('#framesOuterContainer_IGS_Page').show();
        });
    }
    else
    {
        $('#myIframe_top_margin').text('select an Network...');
    }
}


$(document).ready(function() {
    $(document).on("click", "#edit_network_submit_button", function() {

        var params = {
            Network: {NetworkID: $('#NetworkID').val(), NetworkName: $('#NetworkName').val()}
        };

        $.post('forms/admin_network_edit_save.php', params, callback_edit_user_save);

    });
});


function callback_edit_network_save(data) {

    alert(data);

    $('#myIframe_top_margin').text(data);
    modified = false;

    return false;

}

//******** End adminNetworkEditSettings


/** 
 * 
 * adminNetworkCreate
 * 
 * 
 */
function adminNetworkCreate() {

    $('#myIframe_top_margin').text('loading page...');

    $.get('forms/admin_network_create.php', function(data) {
        // clear the page before printing the new page
        $("#myIframe").text("");
        $('#myIframe_top_margin').text('');
        // print the new page
        $("#myIframe").append(data);
        $('#framesOuterContainer_IGS_Page').show();
    });

}


$(document).ready(function() {
    $(document).on("click", "#create_network_submit_button", function() {

        // grab field values from the form for passing to the "save" procedure
        var params = {
            Network: {NetworkID: $('#NetworkID').val(),
                NetworkName: $('#NetworkName').val()}
        };

        $.post('forms/admin_network_create_save.php', params, callback_create_network_save);

    });
});


function callback_create_network_save(data) {

    if (data === 'record inserted') {

        alert('Insert Successfull');

        $('#myIframe_top_margin').text(data);
        modified = false;

        return false;

    }
    else // form validation failed - see admin_user_create_save.php
    {

        $("#myIframe_top_margin").text("Check Fields and Correct as Needed...");
        alert(data);

    }

}
// END admin_network_create

/** 
 * 
 * adminNetworkDeleteProfile
 * 
 * 
 */
function adminNetworkDelete() {

    // user id is the numbers portion of the user menu element id (list_id) which 
    // is created dynamically from the NetworkUser table data
    var network_id = $('#list_id').text();

    // strip off the first four chars from the user menu element for the user id (ex: user45)
    network_id = network_id.substring(7);

    // if no user id then a user is not yet selected
    if (network_id !== '') {
        $.get('forms/admin_network_delete.php?network_id=' + network_id, function(data) {
            $("#myIframe").text("");
            $('#myIframe_top_margin').text('');
            $("#myIframe").append(data);
            $('#framesOuterContainer_IGS_Page').show();
        });
    }
    else
    {
        $('#myIframe').text('');
        $('#myIframe_top_margin').text('select a Network...');
    }
}


$(document).ready(function() {
    $(document).on("click", "#DeleteNetwork_submit_button", function() {

        var params = {
            Network: {NetworkID: $('#NetworkID').val()}
        };

        if (confirm('Delete This Network?  Record CANNOT be recovered...')) {
            $.post('forms/admin_network_delete_save.php', params, callback_delete_network_save);
        }

    });
});


function callback_delete_network_save(data) {

    alert(data);

    $('#myIframe_top_margin').text(data);
    modified = false;

}
// END Admin Delete User

/**
 * 
 * adminNetworkReport()
 * 
 * 
 */
function adminNetworkReport() {

    $('#myIframe_top_margin').css('border-bottom', '1px solid black');
    igsMessage('Loading...');

    $.get('forms/admin_network_report.php', function(data) {
        $("#myIframe").text("");
        $('#myIframe_top_margin').text('');
        $("#myIframe").append(data);
        removeIGSMessage();
        $('#framesOuterContainer_IGS_Page').show();
    });

}
//******* End adminReport


/**
 * ASSIGN NETWORK TO SITES
 * 
 * adminNetworkAssign()
 * 
 */

function adminNetworkSiteAssign() {

    $('#myIframe_top_margin').text('Loading Page...');

    var network_id = $('#list_id').text();

    network_id = network_id.substring(7);

    if (network_id !== '') {
        $.get('forms/admin_network_assign.php?network_id=' + network_id, function(data) {
            $("#myIframe").text("");
            $('#myIframe_top_margin').text('');
            $("#myIframe").append(data);
            $('#framesOuterContainer_IGS_Page').show();
        });
    }
    else
    {
        $('#myIframe_top_margin').text('select an Network...');
    }

}

function buildNetworkListLeft(NetworkID) {

    $.get('forms/admin_network_list_left.php?NetworkID=' + NetworkID, function(data) {
        $('#list-left').append(data);
    });

}

function buildNetworkListRight(NetworkID) {

    $.get('forms/admin_network_list_right.php?NetworkID=' + NetworkID, function(data) {
        $('#list-right').append(data);
    });

}

$(function() {

    $(document).on("click", ".listItemLeftx", function() {

        if ($('#itemListVal' + this.id).val() === '0') {
            $('#' + this.id).css('background-color', '#CCC');
            $('#itemListVal' + this.id).val('1');
        }
        else
        {
            $('#' + this.id).css('background-color', 'transparent');
            $('#itemListVal' + this.id).val('0');
        }

    });

});

$(function() {

    $(document).on("click", ".listItemRightx", function() {

        if ($('#itemListVal' + this.id).val() === '0') {
            $('#' + this.id).css('background-color', '#CCC');
            $('#itemListVal' + this.id).val('1');
        }
        else
        {
            $('#' + this.id).css('background-color', 'transparent');
            $('#itemListVal' + this.id).val('0');
        }

    });

});


$(function() {

    $(document).on('click', '#move-rightx', function() {

        $('.listItemLeft').each(function() {

            if ($('#itemListVal' + this.id).val() === '1') {
                $('#' + this.id).remove();
                $('#itemListVal' + this.id).remove();
                $('#list-right').append("<div class='tableRow' ><div id='" + this.id + "' class='listItemRight' >" + this.id + "</div><input id='itemListVal" + this.id + "' type='hidden' value='0' /></div>");
                $('#' + this.id).val('0');
            }

        });

    });

});

$(function() {

    $(document).on('click', '#move-leftx', function() {

        $('.listItemRight').each(function() {

            if ($('#itemListVal' + this.id).val() === '1') {
                $('#' + this.id).remove();
                $('#itemListVal' + this.id).remove();
                $('#list-left').append("<div class='tableRow' ><div id='" + this.id + "' class='listItemLeft' >$value</div><input id='itemListVal" + this.id + "' type='hidden' value='0' /></div>");
                $('#' + this.id).val('0');
            }

        });

    });

});


$(function() {

    $(document).on('click', '#network_assign_submit_button', function() {
        var sitelist = {};
        var count = 0;
        $(".listItemRight").each(function() {

            sitelist[count] = this.id;
            count++;

        });

        params['NetworkID'] = $('#NetworkID').val();
        params['data'] = sitelist;

        $.post('forms/network_assign_save.php', params, callback_network_assign_save);

    });

});

function callback_network_assign_save(data) {

    $("#myIframe_top_margin").text(data);
    alert(data);
}


/**
 * 
 * END NETWORK FUNCTIONS
 * 
 ******************************************************************************/


/**
 * 
 * SiteLog List FILTER 
 * 
 * 
 * 
 * 
 */

$(document).on("click",'#siteLogListStationCount',function(){
   
   showFilterContainer();
    //$_get('forms/site_filterSelector.php',callback_siteSelector);
    
});

function callback_siteSelector(data){
    
    $('#filterBox').append(data);
    
}

function showFilterContainer(){
    
    $.get('forms/site_FilterSelector.php',function(data){
        $('#filterBox').append(data);
    });
    
}
function hideFilterContainer(){
    $('#filterBox').children().remove();
}

/*
 * 
 * END OF SiteLog List FILTER
 * 
 */




/**
 * 
 * MODERATION
 * 
 * 
 * 
 */

function adminModeration(newWindow) {

    if (newWindow) {
        window.open('moderation.php');
    }
    else
    {

        window.location = 'moderation.php';

    }

}

$(function() {
    $(document).on("click", ".siteloglist_element_mod", function() {

        if (!checkIfModified()) {
            return false;
        }
        ;

        $('#myIframe_top_margin').text('');
        $('#myIframe').text('loading data...');

        // reset all bg colors
        $(".siteloglist_element_mod").css("background-color", "#F0F0F0");

        // reset all bg colors and set valcount to '' and remove error badge - valcount lbls
        $(".valCount").css("background-color", "#F0F0F0").css("background-image", '').text('');

        // set current item bg color to selected
        $(this).css("background-color", "#D6D6D6");

        // set current item's valcount lbl to selected
        $("#lbl_" + this.id).css("background-color", "#D6D6D6");

        // set name of current selected site in the banner
        $("#station_id").text(this.id);

        // set global var currStation
        // and updateFrame() 
        setStation(this.id);
        var stationCode = this.id;

        // not needed on Modaration
        // getErrorCounts(this.id,this);
        params = {FourID: this.id};
        $.post('forms/mod_site_view_mod.php', params, function(data) {
            //alert(data);
            $('#myIframe').text('');
            $('#myIframe').append(data);
        });

    });
});


$(document).on("click", "#moderationApprove_button", function() {

    igsConfirmModeration('<span style="font-size: x-large;">Approve Change?</span><br><br><span style="color: gray;">Would you like to approve the change or ask <br>the submitter to correct the change?</span><br><br>', {fn1: "approveModeration", fn2: "closeConfirm"});

});

function approveModeration() {

    igsMessage('Checking and Transferring Changes...');

    $('#myIframe_top_margin').text('checking and transferring changes...');

    params = {FourID: $('#FourID').val().toUpperCase()};
    $.post('forms/mod_site_save_changes.php', params, callback_mod_site_save_changes);

}

function callback_mod_site_save_changes(data) {

    if (data.indexOf('success') > -1) {

        // calculate site status (for errors/mods) and update SiteLog_Master so 
        // when the "user" loads the SLM the next time the site status will already
        // be correct. Otherwise when the user loads the SLM the status may be incorrect
        // until the user selects that Site in the list and the status updates and may
        // change at that point causing confusion
        var FourID = $('#station_id').text();
        $.get('forms/form-validate.php?FourID=' + FourID, function(data) {
            var errors = 0;
            $.each(data['errorCounts'], function() {
                errors += parseInt(this) || 0;
            });
            var mods = 0;
            $.each(data['modCounts'], function() {
                mods += parseInt(this) || 0;
            });
            var params = {errors: errors, mods: mods};
            $.post('forms/setSiteStatus.php', params);
        });

        // send confirmation email
        igsAlert('Change Transfer Complete...', {fn1: 'confirmSendModEmail'});

    }
    else
    {
        $('#myIframe_top_margin').text('problem transferring changes...');
        igsAlert('Problem Transferring Changes...<br><br>' + data, {fn1: ''});
    }

}

function confirmSendModEmail() {

    igsConfirm('<span style="font-size: x-large;">Send Email Notice?</span><br><br><span style="color: gray;">Would you like to send a Confirmation Email to <br>the submitter to to let them know that the changes are verified?</span><br><br>', {fn1: "clearModerationPage", fn2: "modEmailSent"});

}

function modEmailSent() {

    igsMessage('Sending Email to Submitter...');

    params = {FourID: $('#FourID').val().toUpperCase()};
    $.post('forms/mod_site_save_changes_email.php', params, function(data) {

        var data_ = get_json_substring(data);
        var fileData = $.parseJSON(data_);

        if (fileData.result == 'success') {
            igsAlert('Email Message sent to Submitter...<span style="color:#D39A24;font-weight:normal;">'+fileData.emailAddress+'</span>', {fn1: 'clearModerationPage'});
        }
        else
        {
            igsAlert('Email Failed - No Email Address/Contact Name...'+fileData.emailAddress, {fn1: 'clearModerationPage'});
        }
    });

}

$(document).on("click", "#moderationRemoveDefaults_button", function() {

    if (confirm('Remove Defaults for ' + $('#FourID').val().toUpperCase() + ' ? (refresh site afterwards)')) {

        $('#myIframe_top_margin').text('removing defaults from tables for ' + $('#FourID').val().toUpperCase() + '...');

        params = {FourID: $('#FourID').val().toUpperCase()};
        $.post('forms/mod_site_removeDefaults.php', params, callback_mod_removeDefaults);

    }

});

function callback_mod_removeDefaults(data) {

    if (data.substring(0, 7) === 'success') {

        $('#myIframe_top_margin').text('Defaults Removed - Refresh the Site/View...');
        alert('Defaults Removed - Refresh the Site/View...' + data);
    }
    else
    {
        $('#myIframe_top_margin').text('Problem Removing Default Data...');
        alert('Problem Removing Default Data...' + data);
    }

}

function site_RemoveAllDefaults() {

    if (!checkIfModified()) {
        return false;
    }
    ;

    clearPage();
    cleanUpMyIframe(); // reset all sizes for myIframes and related containers    
    $('#myIframe').css('border-top', '0px solid gray');

    if (confirm('Remove Defaults from ALL Sites? (only takes about 1-2 minutes)')) {

        $('#myIframe').text('Processing: removing default values from all sites...');
        $.get('forms/site_RemoveAllDefaults.php', callback_site_RemoveAllDefaults);

    }

}

function callback_site_RemoveAllDefaults(data) {

    $('#myIframe').text('Default Removal Complete...' + data);
    alert('Default Removal Complete...' + data);
    $('#myIframe').text('');

}

function site_batchModAllSites() {

    if (!checkIfModified()) {
        return false;
    }
    ;

    clearPage();
    cleanUpMyIframe(); // reset all sizes for myIframes and related containers
    $('#myIframe').css('border-top', '0px solid gray');

    if (confirm('Batch Moderate/Transfer ALL Sites? (4-6 mins)')) {

        $('#myIframe').text('Processing: Batch Transferring Mod data to Base Tables...(4-6 mins)');
        $.get('forms/site_batchModAllSites.php', callback_site_batchModAllSites);

    }

}

function callback_site_batchModAllSites(data) {

    $('#myIframe').text('Batch Moderate/Transfer Complete...' + data);
    alert('Batch Moderate/Transfer Complete...' + data);
    $('#myIframe').text('');

}

function site_modTranserSingleSite() {

    if (!checkIfModified()) {
        return false;
    }
    ;

    clearPage();
    cleanUpMyIframe(); // reset all sizes for myIframes and related containers
    $('#myIframe').css('border-top', '0px solid gray');

    var FourID = currStation;

    if (confirm('Single Site Moderate/Transfer for ' + FourID + '?')) {

        $('#myIframe').text('Processing: Batch Transferring Mod data to Base Tables...');
        params = {FourID: FourID};
        $.post('forms/site_modTranserSingleSite.php', params, callback_site_modTranserSingleSite);

    }

}

function callback_site_modTranserSingleSite(data) {

    $('#myIframe').text('Site Moderate/Transfer Complete...' + data);
    alert('Batch Moderate/Transfer Complete...' + data);
    $('#myIframe').text('');

}

function site_CalcSiteStatus() {

    if (!checkIfModified()) {
        return false;
    };

    clearPage();
    cleanUpMyIframe(); // reset all sizes for myIframes and related containers
    $('#myIframe').css('border-top', '0px solid gray');

    if (confirm('Calculate Site Status for ALL Sites? (7-10 mins)')) {

        $('#myIframe').text('Processing: Calculating Site Status for ALL Sites...(7-10 mins)');
        $.get('forms/site_CalcSiteStatus_All.php', callback_site_CalcSiteStatus);

    }

}

function callback_site_CalcSiteStatus(data) {

    $('#myIframe').text('Calculate Site Status Complete...' + data);
    alert('Calculate Site Status Complete...' + data);
    refreshSiteList();
    $('#myIframe').text('');

}

function update_progress(data) {

    $('myIframe').text(data);

}

// propose new site - form
function site_ProposeNew() {

    globalHelpID = "site_ProposeNew";
    if (!checkIfModified()) {
        return false;
    }

    closeCol2Menu();
    clearPage();
    cleanUpMyIframe(); // reset all sizes for myIframes and related containers    

    $.get("forms/site_ProposeNew.php", function(data) {
        $('#myIframe').append(data);
    });

}

function domesRequest() {

    checkIfModified();
    window.open('http://itrf.ensg.ign.fr/domes_request.php', '_blank');


}

function sitelogUpload(element) {
    
    if (typeof currStation === 'undefined' || !currStation) {
        clearPage();
        alert('Select a Site...');
        return false;
    }    
    
    if (!checkIfModified()) {
        return false;
    }
    ;

    clearPage();
    containerWidth = 'narrow';
    setNarrowFrames();
    cleanUpMyIframe(); // reset all sizes for myIframes and related containers
    globalHelpID = "sitelogUpload";

    var FourID = $('#station_id').text();

    if (!FourID) {
        $('#myIframe_top_margin').text('Select Site...');
        $('#myIframe').text('').css('border-top', '0px solid gray');
        alert('Select a Site...');
        return false;
    }

    $('#myIframe').css('border-top', '0px solid gray');

    $('#myIframe').append('<iFrame id="Iframe_frame" style="display: none; width: 100%; height: 100%; border: 0px; overflow-x: auto; overflow-y: auto;"></iFrame>');
    $('#Iframe_frame').attr("src", "forms/sitelogUpload.php");

    setTimeout("$('#Iframe_frame').contents().find('#FourID_Header').text('" + FourID + "')", 1000);
    setTimeout("$('#Iframe_frame').contents().find('#FourID').val('" + FourID + "')", 1000);
    setTimeout("$('#Iframe_frame').css('display','block')", 1000);


}

$(document).on("change", 'input:file', function() {
    $('#upload_submit').prop('disabled', !$(this).val());
});

$(function() {
    $(document).on('ajax:complete', "#uploadForm", function() {
        alert('form complete');
    });
});

function sitelogUploadNewSite(element) {

    if (!checkIfModified()) {
        return false;
    }
    ;

    clearPage();
    cleanUpMyIframe(); // reset all sizes for myIframes and related containers    
    $('#myIframe').css('border-top', '0px solid gray');

    $('#myIframe').append('<iFrame id="Iframe_frame" src="forms/sitelogUploadNewSite.php" style="width: 585px; height: 100%; border: 0px; overflow-x: auto; overflow-y: auto;"></iFrame>');

}

// view site image
$(document).on("click", ".imageViewButton", function() {

    if (!checkIfModified()) {
        return false;
    }
    ;


    clearPage();
    containerWidth = 'narrow';
    setNarrowFrames();
    var FourID = $('#station_id').text();

    if (!FourID) {
        clearPage();
        alert('Select a Site...');
        return false;
    }

    var FourID = currStation;
    var Facing = $(this).prev().text();

    $.get('forms/imageView.php?FourID=' + FourID + '&Facing=' + Facing, function(data) {

        if (data.indexOf('Image Not Found:') < 0){
            $('#myIframe').html("<img src='" + data + "'>");
        }
        else
        {
            $('#myIframe').append('Image Not Available...'); // show which image was selected
        }

    });

});

// upload site image
$(document).on("click", ".imageUploadButton", function() {

    clearPage();

    var FourID = $('#station_id').text();

    containerWidth = 'narrow';
    setNarrowFrames();

    if (!FourID) {
        $('#myIframe_top_margin').text('Select Site...');
        $('#myIframe').text('');
        alert('Select a Site...');
        return false;
    }

    var FourID = currStation;
    var Facing = $(this).prev().prev().text();

    $.get('forms/image_up.php?FourID=' + FourID + '&Facing=' + Facing, function(data) {

        $('#myIframe').append(data);

    });

});

// remove site defaults
function site_RemoveSiteDefaults() {

    globalHelpID = 'site_RemoveSiteDefaults';

    if (!checkIfModified()) {
        return false;
    }
    ;

    clearPage();
    containerWidth = 'narrow';
    setNarrowFrames();
    cleanUpMyIframe(); // reset all sizes for myIframes and related containers    

    var FourID = $('#station_id').text();

    if (!FourID) {
        $('#myIframe_top_margin').text('Select Site...');
        $('#myIframe').text('');
        alert('Select a Site...');
        return false;
    }

    $('#myIframe_top_margin').text('');
    $('#myIframe').text('').css('border-top', '0px solid gray');

    if (confirm('Remove Defaults from Site: ' + FourID + '?')) {

        var params = {FourID: FourID};

        $('#myIframe').text('Processing: removing default values from site...' + FourID);
        $.post('forms/site_RemoveSiteDefaults.php', params, callback_site_RemoveSiteDefaults);

    }

}

function callback_site_RemoveSiteDefaults(data) {

    $('#myIframe').text('Default Removal Complete...' + data);
    alert('Default Removal Complete...' + data);
    $('#myIframe').text('');

}

function xml_sitelog() {

    globalHelpID = 'xml_sitelog';

    if (!checkIfModified()) {
        return false;
    }
    ;

    clearPage();
    containerWidth = 'narrow';
    setNarrowFrames();
    cleanUpMyIframe(); // reset all sizes for myIframes and related containers

    var FourID = $('#station_id').text();

    if (!FourID) {
        $('#myIframe_top_margin').text('Select Site...');
        $('#myIframe').text('');
        alert('Select a Site...');
        return false;
    }

    $('#myIframe_top_margin').text('');
    $('#myIframe').text('').css('border-top', '0px solid gray');

    if (confirm('Download XML Sitelog: ' + FourID + '?')) {

        var params = {FourID: FourID};

        $('#myIframe').text('Processing: building XML sitelog...' + FourID);
        $.post('forms/xml_sitelog.php', params, callback_xml_sitelog);

    }

}

function callback_xml_sitelog(data) {

    $('#myIframe').text('XML Sitelog Complete...' + data);

    var fileData = get_json_substring(data);
    var fileData = $.parseJSON(data);

    var fileName = fileData.fileName;
    var fullPath = fileData.fullPath;

    window.open('downloadFile.php?f=' + fileName + '&p=' + fullPath);

    $('#myIframe').text('');

}

function refreshSiteList_Mod() {

    $('#station_id').text('');
    currStation = '';
    currForm = '';
    currTable = '';
    // first clear all of the current badges
    clearBadges();
    var search_string = $('#search_input_mod').val();
    siteList_Build_mod(search_string);

}

function refreshSiteList() {

    if (!checkIfModified()) {
        return false;
    }
    ;

    clearSelectedStation();

    clearPage();
    cleanUpMyIframe();

    // first clear all of the current badges
    clearBadges();
    var search_string = $('#search_input').val();
    siteList_Build(search_string);

}

function listSortOrder() {

    var params = {};
    $.post('forms/listSortOrder.php', params, function() {

        refreshSiteList();

    });

}

function submitToModeration() {

    if (typeof currStation === 'undefined' || !currStation) {
        clearPage();
        alert('Select a Site...');
        return false;
    }
    
    if (!checkIfModified()) { return false; };

    var FourID = $("#station_id").text();

    if (FourID === '') {
        alert('Select a Site...');
        return false;
    }

    var ErrorCount = $('#lbl_' + FourID).text();
    
    if (ErrorCount > 0) {

        submitWithErrors(FourID, ErrorCount);
        
    }
    else
    {

        submitNoErrors(FourID);
        
        
    }

}

function submitSite() {

    var FourID = $('#station_id').text();

    params = {FourID: FourID, submitToModeration: true};
    $.post('forms/siteStatusSet.php', params, function(data) {
        
        $('#img' + FourID).attr('src', 'lib/images/pending.png');
        globalSiteStatusFile = 'lib/images/pending.png'; // enable_buttons()->form-functions.js
        
        siteSubmittedEmail(FourID);
    });


}

function submitWithErrors(FourID, ErrorCount) {

    igsConfirm('<span style="font-size: large; font-weight:bold;">' + FourID + ' has <span style="font-size: small; font-weigth: normal; color: white; background-color: red; border: thin solid red; border-radius: 15px;">&nbsp;&nbsp;' + ErrorCount + '&nbsp;&nbsp;</span> Errors/Missing Data. <br><br> <span style="color: gray; font-size: medium;">All Required Information is important. <br> ** Please Correct before submitting if able. </span><br><br> Continue to Submit Site?</span><br><br>', {fn1: "", fn2: "submitSite"});

}

function submitNoErrors(FourID) {

    igsConfirm('<span style="font-size: small; font-weight:bold;">Submit Site: ' + FourID + ' to IGS?</span><br><br>', {fn1: "", fn2: "submitSite"});

}



function siteSubmittedEmail(FourID) {

    //if (fadeBackground){ $('.overlay').fadeToggle("slow"); }
    
    igsMessage('Sending Email Alert to IGS Site Log Moderator...');

    params = {FourID: FourID};
    $.post('forms/siteSubmittedEmail.php', params, callback_siteSubmittedEmail);

}

function siteCancelledEmail(FourID) {

    //if (fadeBackground){ $('.overlay').fadeToggle("slow"); }
    
    igsMessage('Sending Email Alert to IGS Site Log Moderator...');

    params = {FourID: FourID};
    $.post('forms/siteCancelledEmail.php', params, callback_siteCancelledEmail);

}

function callback_siteSubmittedEmail(data) {

    igsAlert('<span style="font-size: large; font-weight: bold;">Thank you for your submission</span><br><br><span style="font-size: normal; font-weight: bold; color: gray">Site Submitted to IGS for Verification<br><br>Email Alert sent to IGS Moderator...</span>', {fn1: 'clearPage'});

}

function callback_siteCancelledEmail(data) {

    igsAlert('<span style="font-size: large; font-weight: bold;">Site has been CANCELLED from IGS Validation</span><br><br><span style="font-size: normal; font-weight: bold; color: gray"><br>Email Alert sent to IGS Moderator...</span>', {fn1: 'clearPage'});

}

function site_cancelModeration(){

    var FourID = $('#station_id').text();
    params = {FourID: FourID};

    $.post('forms/siteStatusCheckIfModeration.php',params,callback_checkModaration);
    
}

function callback_checkModaration(data){

    var FourID = $('#station_id').text();

    if (data === '4'){

        igsConfirm('Cancel "IGS Validation" for <span style="color:#D39A24">'+FourID+'</span> ?', {fn1:'',fn2:'cancelModeration'});

    }
    
}

function cancelModeration(){
    
        var FourID = $('#station_id').text();

        params = {FourID: FourID, submitToModeration: false, cancelModeration: true};
        $.post('forms/siteStatusSet.php', params, callback_sendCancelledEmail);
    
}

function callback_sendCancelledEmail(data){
    
    var FourID = $('#station_id').text();

    siteCancelledEmail(FourID);
    
    var element = '';
    getErrorCounts(FourID, element) // set status lite on selected site
    
}

$(document).on("click", "#moderationCancelModeration_button", function() {

    igsCancelModeration('<span style="font-size: x-large;">Cancel Moderation?</span><br><br><span style="color: gray;">Cancel Moderation for this site?</span><br><br>', {fn1: "cancelAdminModeration", fn2: "closeConfirm"});

});

// the admin cancels moderation from the moderator
function cancelAdminModeration() {

    var FourID = $('#station_id').text();

    params = {FourID: FourID, submitToModeration: false, cancelModeration: true};
    $.post('forms/siteStatusSet.php', params, callback_sendAdminCancelledEmail);

}

function callback_sendAdminCancelledEmail(data){
    
    var FourID = $('#station_id').text();

    siteAdminCancelledEmail(FourID);
    
}

function siteAdminCancelledEmail(FourID) {

    var FourID = $('#station_id').text();

    params = {FourID: $('#FourID').val().toUpperCase()};
    $.post('forms/siteAdminCancelledEmail.php',params);
    
}


/*
 * ******************** END MODERATION
 * 
 */

/**
 * 
 * CHANGE PASSWORD
 * 
 */

$(document).ready(function() {
    $(document).on("click", "#change-password", function() {

        var params = "";
        $.post('forms/user_password_change.php', params, callback_userPages);

    });
});

function userPasswordChange() {

    if (!checkIfModified()) {
        return false;
    }
    ;

    closeCol2Menu();
    clearPage();
    containerWidth = 'narrow';
    setNarrowFrames();
    cleanUpMyIframe(); // reset all sizes for myIframes and related containers    

    var params = {};
    $.post('forms/user_password_change.php', params, callback_userPages);
}

function userProfile() {
    globalHelpID = "userProfile";
    if (!checkIfModified()) {
        return false;
    }
    ;

    closeCol2Menu();
    clearPage();
    containerWidth = 'narrow';
    setNarrowFrames();
    cleanUpMyIframe(); // reset all sizes for myIframes and related containers    

    var params = {};
    $.post('forms/user_profile.php', params, callback_userPages);
}

function callback_userPages(data) {
    $("#myIframe").text("");
    $("#myIframe").append(data);

}

$(function() {

    $(document).on("click", '#change_password_cancel_button', function() {

        //profile_page();
        clearPage();

    });

});

$(document).ready(function() {

    $(document).on("click", "#change_password_submit_button", function() {

        var params = {
            NetworkUser: {current_password: $('#current_password').get(0).value,
                Password: $('#new_password').get(0).value,
                confirm_new_password: $('#new_password_confirm').get(0).value}
        };

        $('#myIframe_top_margin').text('validating and saving password change...');
        $.post('forms/user_password_save.php', params, callback_password_save);

    });
});


function callback_password_save(data) {

    if (data.indexOf('Save Successful') > -1) {

        igsAlert('Password Changed Successfully',{fn1:'clearPage'},false);

    }
    else
    {

        $('#myIframe_top_margin').text('');
        igsAlert(data,{fn1:''},false);

    }
    modified = false;

}


/**
 * 
 * Set Focus to First Element on the Page
 * 
 */
/* place this snippet at the top of the page where you want this to work
 <script>
    $(function(){
    set_focus_first_input(); 
    }); 
 </script>
 
 */



//********************************

/**
 * 
 *  
 *    START objectsearch object 
 *
 *    
 *            
 **/

if (!objectsearch)
    var objectsearch = {};

objectsearch.init = function()
{
    // add objectsearch css for non-safari, dom-capable browsers
    if (navigator.userAgent.toLowerCase().indexOf('safari') < 0 && document.getElementById)
    {
        this.clearBtn = false;

        // add style sheet if not safari
        var dummy = document.getElementById("dummy_css");
        if (dummy)
            dummy.href = "objectsearch.css";
    }
}

// called when on user input - toggles clear fld btn
objectsearch.onChange = function(fldID, btnID)
{
    // check whether to show delete button
    var fld = document.getElementById(fldID);
    var btn = document.getElementById(btnID);
    if (fld.value.length > 0 && !this.clearBtn)
    {
        btn.style.background = "white url('lib/images/srch_r_f2.gif') no-repeat top left";
        btn.fldID = fldID; // btn remembers it's field
        btn.onclick = this.clearBtnClick;
        this.clearBtn = true;
    } else if (fld.value.length == 0 && this.clearBtn)
    {
        btn.style.background = "white url('lib/images/srch_r.gif') no-repeat top left";
        btn.onclick = null;
        this.clearBtn = false;
    }
}


// clears field
objectsearch.clearFld = function(fldID, btnID)
{
    var fld = document.getElementById(fldID);
    fld.value = "";
    this.onChange(fldID, btnID);
}

// called by btn.onclick event handler - calls clearFld for this button
objectsearch.clearBtnClick = function()
{
    objectsearch.clearFld(this.fldID, this.id);
}

/* ********************* END objectsearch object */

/* 
 * 
 * 
 * **************** Field Validation Functions *****************
 *
 *
 */



/*
 * 
 * 
 ********************* end of validation functions ******************** 
 * 
 * 
 */

/*
 * OLD AJAX and JS Functions
 * 
 * 
 */

function xmlhttpPost(strURL) {
    var xmlHttpReq = false;
    var self = this;

    // Mozilla/Safari
    if (window.XMLHttpRequest)
    {
        self.xmlHttpReq = new XMLHttpRequest();
    }
    // IE
    else if (window.ActiveXObject)
    {
        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }

    self.xmlHttpReq.open('POST', strURL, true);
    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    alert(self.xmlHttpReq.responseText);



    self.xmlHttpReq.onreadystatechange = function()
    {

        if (self.xmlHttpReq.readyState == 4) {
            var response = self.xmlHttpReq.responseText;
            var responseLen = response.length;
            var stationCode = response.substr(responseLen - 4, 4);
            var buttonText = response.substr(0, responseLen - 4);
            updatepage(buttonText);

            if (stationCode != 'NONE')
            {
                setStation(stationCode);
            }

        }
    }

    self.xmlHttpReq.send(getquerystring());

}



function getquerystring() {
    var form = document.forms['selectStationForm'];
    var q = form.q.value;
    qstr = 'q=' + escape(q);
    return qstr;
}

function updatepage(str) {
    document.getElementById("selectStation").innerHTML = str;
}


function updateLoginString(str) {
    if (str === "Logoff") {
        document.getElementById("login").innerHTML = "Logoff";
    }
    else {
        document.getElementById("login").innerHTML = "Login";
    }
}

function setLoginString( ) {
    document.getElementById("login").innerHTML = "Login";
}

function setLogoffString( ) {
    document.getElementById("login").innerHTML = "Logoff " + "<font color='#006792'>" + parent.getCookie_("username") + "</font>";
}



function getCookie_(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++)
    {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x === c_name)
        {
            return unescape(y);
        }
    }
}

function setCookie_(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function checkCookie_() {
    var username = getCookie("username");
    if (username !== null && username !== "")
    {
        alert("Welcome again " + username);
    }
    else
    {
        username = prompt("Please enter your name:", "");
        if (username !== null && username !== "")
        {
            setCookie("username", username, 365);
        }
    }
}

var currStation = "";
var stationCounter = 0;
var currForm = ""; // holds the current form name which is now virtualized via forms for Edit and New
var currTable = ""; // used to hold the current table
var myIframeurl = ""; // holds the iframe php target and parameters
var myValIframeurl = "";
var t;

function tdClass(obj) {
    var ele = document.getElementById(obj);
    $(ele).toggleClass("selected");
}
;

function tdClasstoggleall() {
    //var items = document.getElementsByClassName("selected");
    var items = document.getElementsByTagName("td");
    var i = items.length;
    if (i > 0) {
        var item;
        do
        {
            item = items[i - 1];
            //$(item).toggleClass("selected");
            $(item).removeClass("selected");
        }
        while (--i);
    }
}

function getFormPagesArray() {

    var formPages = [
        'SiteLog_Author',
        'SiteLog_Identification',
        'SiteLog_IdentificationMonument',
        'SiteLog_IdentificationGeologic',
        'SiteLog_Location',
        'SiteLog_Receiver',
        'SiteLog_Antenna',
        'SiteLog_SurveyedLocalTies',
        'SiteLog_FrequencyStandard',
        'SiteLog_Collocation',
        'SiteLog_HumiditySensor',
        'SiteLog_PressureSensor',
        'SiteLog_TemperatureSensor',
        'SiteLog_WaterVaporRadiometer',
        'SiteLog_OtherInstrumentation',
        'SiteLog_RadioInterferences',
        'SiteLog_MultipathSources',
        'SiteLog_SignalObstructions',
        'SiteLog_LocalEpisodicEffects',
        'SiteLog_OperationalContact',
        'SiteLog_ResponsibleAgency',
        'SiteLog_DataCenter',
        'Author',
        'Identification',
        'Location',
        'GNSS',
        'Surveyed',
        'Frequency',
        'Collocation',
        'InstrumentationMenu',
        'Conditions',
        'Effects',
        'OpContact',
        //'Agency',
        'DataCenter'
    ];

    return formPages;

}

function getFormMenuArray() {

    var formMenu = [
        'Author',
        'Identification',
        'Location',
        'GNSS',
        'Surveyed',
        'Frequency',
        'Collocation',
        'InstrumentationMenu',
        'Conditions',
        'Effects',
        'OpContact',
        //'Agency',
        'DataCenter'
    ];

    return formMenu;

}

function clearLabelCounts() {
    //var items = document.getElementsByClassName("valCount");
    var items = document.getElementsByTagName("label");
    var i = items.length;
    if (i > 0) {
        var item;
        do
        {

            item = items[i - 1];
            if (item.className === 'valCount') {
                $(item).html("");
                item.style.backgroundImage = "";
            }
        }
        while (--i);
    }

}

function clearLabelCounts2() {

    var formPages = getFormPagesArray();

    for (i = 0; i < formPages.length; i++) {

        var pageElement = parent.document.getElementById(formPages[i]);
        pageElement.style.color = "white";
        pageElement.style.backgroundImage = "";

    }

}

function sboxParent(a) {
    var s = window.parent.Shadowbox;
    if (s)
        s.open({player: 'iframe'
                    , title: a.title || 'This is a title'
                    , content: a.href
                    , width: 700
                    , height: 350
        });
    return !(s);
}
;

function setStation(fourchar, showErrorCount) {
//	    clearErrorBadges();
//	    clearLabelCounts2();
//		
//		if ( currForm === "create_ascii_sl_dl" ) {   // dprosenthal - 12/15/2011
//			currForm = "create_ascii_sl";
//		}

    if (myIframeurl !== "") {
        currStation = fourchar;
        updateFrame();
    } else if (myIframeurl === "") {
        currStation = fourchar;
    }

//	    tdClasstoggleall();
//	    tdClass(fourchar);	
// 	    if (showErrorCount==='true') {
//		    myValIframeurl = document.getElementById('myValidationIframe');
//		    myValIframeurl.src = 'forms/validate.php?FourID='+ currStation +'&TN='+ currTable;
//	    }  
}

function updateFrame2(initFrame, tableName, optTable) {

    if (typeof currStation === 'undefined' || !currStation) {
        clearPage();
        alert('Select a Site...');
        return false;
    }
    
    if (!checkIfModified()) {
        return false;
    }
    ;

    clearPage();
    cleanUpMyIframe(); // reset all sizes for myIframes and related containers
    igsMessage('Loading...' + tableName);
    //setWideFrames();
    globalHelpID = initFrame;

    if (initFrame) {
        currForm = initFrame;
    }
    if (tableName) {
        currTable = tableName;
    }
    myIframeurl = document.getElementById('myIframe');

    //myIframeurl.src = 'forms/'+ currForm +'.php?FourID='+ currStation +'&TN='+ currTable+'&optTable='+ optTable;
    edit_form = 'forms/' + currForm + '.php?FourID=' + currStation + '&TN=' + currTable + '&optTable=' + optTable;
    $(function() {

        //$("#myIframe").text('loading data...Table:' + tableName);
        $.get(edit_form, function(data, status) {

            $('#myIframe').text('');
            $("#myIframe").append(data);
            removeIGSMessage();

        });

    });

}

function clearErrorBadges() {

    var formPages = getFormPagesArray();

    for (i = 0; i < formPages.length; i++) {

        var pageElement = parent.document.getElementById(formPages[i]);
        pageElement.style.innerHTML = '';

    }

    clearLabelCounts();

}

function LPadx(valCount) {
    if (!isNaN(valCount)) {
        var str = valCount + '';
        if (str.length > 0 && str.length < 2) {
            str = ' ' + str;
            return str;
        } else {
            return valCount;
        }
    }
}


function xshowValCounts(FourID) {

    if (FourID) {
        currStation = FourID;
    }

    var AuthorCount = 12;
    parseInt(parent.document.getElementById('SiteLog_Author').innerHTML);
    if (!isNaN(AuthorCount)) {
        parent.document.getElementById('Author').innerHTML = AuthorCount;
    }

    var IdentificationCount = parseInt(parent.document.getElementById('SiteLog_Identification').innerHTML) + parseInt(parent.document.getElementById('SiteLog_IdentificationMonument').innerHTML) + parseInt(parent.document.getElementById('SiteLog_IdentificationGeologic').innerHTML);
    if (!isNaN(IdentificationCount)) {
        parent.document.getElementById('Identification').innerHTML = IdentificationCount;
    }
    var LocationCount = parseInt(parent.document.getElementById('SiteLog_Location').innerHTML);
    if (!isNaN(LocationCount)) {
        parent.document.getElementById('Location').innerHTML = LocationCount;
    }
    var GNSSCount = parseInt(parent.document.getElementById('SiteLog_Receiver').innerHTML) + parseInt(parent.document.getElementById('SiteLog_Antenna').innerHTML);
    if (!isNaN(GNSSCount)) {
        parent.document.getElementById('GNSS').innerHTML = GNSSCount;
    }
    var SurveyedCount = parseInt(parent.document.getElementById('SiteLog_SurveyedLocalTies').innerHTML);
    if (!isNaN(SurveyedCount)) {
        parent.document.getElementById('Surveyed').innerHTML = SurveyedCount;
    }
    var FrequencyCount = parseInt(parent.document.getElementById('SiteLog_FrequencyStandard').innerHTML);
    if (!isNaN(FrequencyCount)) {
        parent.document.getElementById('Frequency').innerHTML = FrequencyCount;
    }
    var CollocationCount = parseInt(parent.document.getElementById('SiteLog_Collocation').innerHTML);
    if (!isNaN(CollocationCount)) {
        parent.document.getElementById('Collocation').innerHTML = CollocationCount;
    }
    var InstrumentationCount = parseInt(parent.document.getElementById('SiteLog_HumiditySensor').innerHTML) + parseInt(parent.document.getElementById('SiteLog_PressureSensor').innerHTML) + parseInt(parent.document.getElementById('SiteLog_TemperatureSensor').innerHTML) + parseInt(parent.document.getElementById('SiteLog_WaterVaporRadiometer').innerHTML) + parseInt(parent.document.getElementById('SiteLog_OtherInstrumentation').innerHTML);
    if (!isNaN(InstrumentationCount)) {
        parent.document.getElementById('Instrumentation').innerHTML = InstrumentationCount;
    }
    var ConditionsCount = parseInt(parent.document.getElementById('SiteLog_RadioInterferences').innerHTML) + parseInt(parent.document.getElementById('SiteLog_MultipathSources').innerHTML) + parseInt(parent.document.getElementById('SiteLog_SignalObstructions').innerHTML);
    if (!isNaN(ConditionsCount)) {
        parent.document.getElementById('Conditions').innerHTML = ConditionsCount;
    }
    var EffectsCount = parseInt(parent.document.getElementById('SiteLog_LocalEpisodicEffects').innerHTML);
    if (!isNaN(EffectsCount)) {
        parent.document.getElementById('Effects').innerHTML = EffectsCount;
    }
    var OpContactCount = parseInt(parent.document.getElementById('SiteLog_OperationalContact').innerHTML);
    if (!isNaN(OpContactCount)) {
        parent.document.getElementById('OpContact').innerHTML = OpContactCount;
    }
    var AgencyCount = parseInt(parent.document.getElementById('SiteLog_ResponsibleAgency').innerHTML);
    if (!isNaN(AgencyCount)) {
        parent.document.getElementById('Agency').innerHTML = AgencyCount;
    }
    var DataCenterCount = parseInt(parent.document.getElementById('SiteLog_DataCenter').innerHTML);
    if (!isNaN(DataCenterCount)) {
        parent.document.getElementById('DataCenter').innerHTML = DataCenterCount;
    }
    var FourIDLabelCount = parseInt(parent.document.getElementById('Author').innerHTML) + parseInt(parent.document.getElementById('Identification').innerHTML) + parseInt(parent.document.getElementById('Location').innerHTML) + parseInt(parent.document.getElementById('GNSS').innerHTML) + parseInt(parent.document.getElementById('Surveyed').innerHTML) + parseInt(parent.document.getElementById('Frequency').innerHTML) + parseInt(parent.document.getElementById('Collocation').innerHTML) + parseInt(parent.document.getElementById('Instrumentation').innerHTML) + parseInt(parent.document.getElementById('Conditions').innerHTML) + parseInt(parent.document.getElementById('Effects').innerHTML) + parseInt(parent.document.getElementById('OpContact').innerHTML) + parseInt(parent.document.getElementById('Agency').innerHTML) + parseInt(parent.document.getElementById('DataCenter').innerHTML);
    if (!isNaN(FourIDLabelCount)) {
        parent.document.getElementById('lbl' + currStation).innerHTML = FourIDLabelCount;
    }

    if (parent.document.getElementById('SiteLog_Author').innerHTML == '0' || parent.document.getElementById('SiteLog_Author').innerHTML == '') {
        parent.document.getElementById('SiteLog_Author').style.color = "white";
        parent.document.getElementById('SiteLog_Author').style.backgroundImage = "";
    } else {
        parent.document.getElementById('SiteLog_Author').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_Author').style.backgroundPosition = "center";
        parent.document.getElementById('SiteLog_Author').style.textAlign = "center";
        parent.document.getElementById('SiteLog_Author').style.paddingLeft = "9px";
        parent.document.getElementById('SiteLog_Author').style.paddingRight = "9px";
        parent.document.getElementById('SiteLog_Author').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('SiteLog_Author').style.color = "white";
    }

    if (parent.document.getElementById('SiteLog_Identification').innerHTML == '0' || parent.document.getElementById('SiteLog_Identification').innerHTML == '') {
        parent.document.getElementById('SiteLog_Identification').style.color = "white";
        parent.document.getElementById('SiteLog_Identification').style.backgroundImage = "";
    }
    else
    {
        parent.document.getElementById('SiteLog_Identification').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_Identification').style.backgroundPosition = "center";
        parent.document.getElementById('SiteLog_Identification').style.textAlign = "center";
        parent.document.getElementById('SiteLog_Identification').style.paddingLeft = "9px";
        parent.document.getElementById('SiteLog_Identification').style.paddingRight = "9px";
        parent.document.getElementById('SiteLog_Identification').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('SiteLog_Identification').style.color = "white";
    }

    if (parent.document.getElementById('SiteLog_IdentificationMonument').innerHTML == '0' || parent.document.getElementById('SiteLog_IdentificationMonument').innerHTML == '') {
        parent.document.getElementById('SiteLog_IdentificationMonument').style.color = "white";
        parent.document.getElementById('SiteLog_IdentificationMonument').style.backgroundImage = "";
    } else {
        parent.document.getElementById('SiteLog_IdentificationMonument').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_IdentificationMonument').style.backgroundPosition = "center";
        parent.document.getElementById('SiteLog_IdentificationMonument').style.textAlign = "center";
        parent.document.getElementById('SiteLog_IdentificationMonument').style.paddingLeft = "9px";
        parent.document.getElementById('SiteLog_IdentificationMonument').style.paddingRight = "9px";
        parent.document.getElementById('SiteLog_IdentificationMonument').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('SiteLog_IdentificationMonument').style.color = "white";
    }
    if (parent.document.getElementById('SiteLog_IdentificationGeologic').innerHTML == '0' || parent.document.getElementById('SiteLog_IdentificationGeologic').innerHTML == '') {
        parent.document.getElementById('SiteLog_IdentificationGeologic').style.color = "white";
        parent.document.getElementById('SiteLog_IdentificationGeologic').style.backgroundImage = "";
    } else {
        parent.document.getElementById('SiteLog_IdentificationGeologic').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_IdentificationGeologic').style.backgroundPosition = "center";
        parent.document.getElementById('SiteLog_IdentificationGeologic').style.textAlign = "center";
        parent.document.getElementById('SiteLog_IdentificationGeologic').style.paddingLeft = "9px";
        parent.document.getElementById('SiteLog_IdentificationGeologic').style.paddingRight = "9px";
        parent.document.getElementById('SiteLog_IdentificationGeologic').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('SiteLog_IdentificationGeologic').style.color = "white";
    }
    if (parent.document.getElementById('SiteLog_Location').innerHTML == '0' || parent.document.getElementById('SiteLog_Location').innerHTML == '') {
        parent.document.getElementById('SiteLog_Location').style.color = "white";
        parent.document.getElementById('SiteLog_Location').style.backgroundImage = "";
    } else {
        parent.document.getElementById('SiteLog_Location').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_Location').style.backgroundPosition = "center";
        parent.document.getElementById('SiteLog_Location').style.textAlign = "center";
        parent.document.getElementById('SiteLog_Location').style.paddingLeft = "9px";
        parent.document.getElementById('SiteLog_Location').style.paddingRight = "9px";
        parent.document.getElementById('SiteLog_Location').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('SiteLog_Location').style.color = "white";
    }
    if (parent.document.getElementById('SiteLog_Receiver').innerHTML == '0' || parent.document.getElementById('SiteLog_Receiver').innerHTML == '') {
        parent.document.getElementById('SiteLog_Receiver').style.color = "white";
        parent.document.getElementById('SiteLog_Receiver').style.backgroundImage = "";
    } else {
        parent.document.getElementById('SiteLog_Receiver').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_Receiver').style.backgroundPosition = "center";
        parent.document.getElementById('SiteLog_Receiver').style.textAlign = "center";
        parent.document.getElementById('SiteLog_Receiver').style.paddingLeft = "9px";
        parent.document.getElementById('SiteLog_Receiver').style.paddingRight = "9px";
        parent.document.getElementById('SiteLog_Receiver').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('SiteLog_Receiver').style.color = "white";
    }
    if (parent.document.getElementById('SiteLog_Antenna').innerHTML == '0' || parent.document.getElementById('SiteLog_Antenna').innerHTML == '') {
        parent.document.getElementById('SiteLog_Antenna').style.color = "white";
        parent.document.getElementById('SiteLog_Antenna').style.backgroundImage = "";
    } else {
        parent.document.getElementById('SiteLog_Antenna').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_Antenna').style.backgroundPosition = "center";
        parent.document.getElementById('SiteLog_Antenna').style.textAlign = "center";
        parent.document.getElementById('SiteLog_Antenna').style.paddingLeft = "9px";
        parent.document.getElementById('SiteLog_Antenna').style.paddingRight = "9px";
        parent.document.getElementById('SiteLog_Antenna').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('SiteLog_Antenna').style.color = "white";
    }
    if (parent.document.getElementById('SiteLog_SurveyedLocalTies').innerHTML == '0' || parent.document.getElementById('SiteLog_SurveyedLocalTies').innerHTML == '') {
        parent.document.getElementById('SiteLog_SurveyedLocalTies').style.color = "white";
        parent.document.getElementById('SiteLog_SurveyedLocalTies').style.backgroundImage = "";
    } else {
        parent.document.getElementById('SiteLog_SurveyedLocalTies').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_SurveyedLocalTies').style.backgroundPosition = "center";
        parent.document.getElementById('SiteLog_SurveyedLocalTies').style.textAlign = "center";
        parent.document.getElementById('SiteLog_SurveyedLocalTies').style.paddingLeft = "9px";
        parent.document.getElementById('SiteLog_SurveyedLocalTies').style.paddingRight = "9px";
        parent.document.getElementById('SiteLog_SurveyedLocalTies').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('SiteLog_SurveyedLocalTies').style.color = "white";
    }
    if (parent.document.getElementById('SiteLog_FrequencyStandard').innerHTML == '0' || parent.document.getElementById('SiteLog_FrequencyStandard').innerHTML == '') {
        parent.document.getElementById('SiteLog_FrequencyStandard').style.color = "white";
        parent.document.getElementById('SiteLog_FrequencyStandard').style.backgroundImage = "";
    } else {
        parent.document.getElementById('SiteLog_FrequencyStandard').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_FrequencyStandard').style.backgroundPosition = "center";
        parent.document.getElementById('SiteLog_FrequencyStandard').style.textAlign = "center";
        parent.document.getElementById('SiteLog_FrequencyStandard').style.paddingLeft = "9px";
        parent.document.getElementById('SiteLog_FrequencyStandard').style.paddingRight = "9px";
        parent.document.getElementById('SiteLog_FrequencyStandard').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('SiteLog_FrequencyStandard').style.color = "white";
    }
    if (parent.document.getElementById('SiteLog_Collocation').innerHTML == '0' || parent.document.getElementById('SiteLog_Collocation').innerHTML == '') {
        parent.document.getElementById('SiteLog_Collocation').style.color = "white";
        parent.document.getElementById('SiteLog_Collocation').style.backgroundImage = "";
    } else {
        parent.document.getElementById('SiteLog_Collocation').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_Collocation').style.backgroundPosition = "center";
        parent.document.getElementById('SiteLog_Collocation').style.textAlign = "center";
        parent.document.getElementById('SiteLog_Collocation').style.paddingLeft = "9px";
        parent.document.getElementById('SiteLog_Collocation').style.paddingRight = "9px";
        parent.document.getElementById('SiteLog_Collocation').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('SiteLog_Collocation').style.color = "white";
    }
    if (parent.document.getElementById('SiteLog_HumiditySensor').innerHTML == '0' || parent.document.getElementById('SiteLog_HumiditySensor').innerHTML == '') {
        parent.document.getElementById('SiteLog_HumiditySensor').style.color = "white";
        parent.document.getElementById('SiteLog_HumiditySensor').style.backgroundImage = "";
    } else {
        parent.document.getElementById('SiteLog_HumiditySensor').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_HumiditySensor').style.backgroundPosition = "center";
        parent.document.getElementById('SiteLog_HumiditySensor').style.textAlign = "center";
        parent.document.getElementById('SiteLog_HumiditySensor').style.paddingLeft = "9px";
        parent.document.getElementById('SiteLog_HumiditySensor').style.paddingRight = "9px";
        parent.document.getElementById('SiteLog_HumiditySensor').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('SiteLog_HumiditySensor').style.color = "white";
    }
    if (parent.document.getElementById('SiteLog_PressureSensor').innerHTML == '0' || parent.document.getElementById('SiteLog_PressureSensor').innerHTML == '') {
        parent.document.getElementById('SiteLog_PressureSensor').style.color = "white";
        parent.document.getElementById('SiteLog_PressureSensor').style.backgroundImage = "";
    } else {
        parent.document.getElementById('SiteLog_PressureSensor').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_PressureSensor').style.backgroundPosition = "center";
        parent.document.getElementById('SiteLog_PressureSensor').style.textAlign = "center";
        parent.document.getElementById('SiteLog_PressureSensor').style.paddingLeft = "9px";
        parent.document.getElementById('SiteLog_PressureSensor').style.paddingRight = "9px";
        parent.document.getElementById('SiteLog_PressureSensor').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('SiteLog_PressureSensor').style.color = "white";
    }
    if (parent.document.getElementById('SiteLog_TemperatureSensor').innerHTML == '0' || parent.document.getElementById('SiteLog_TemperatureSensor').innerHTML == '') {
        parent.document.getElementById('SiteLog_TemperatureSensor').style.color = "white";
        parent.document.getElementById('SiteLog_TemperatureSensor').style.backgroundImage = "";
    } else {
        parent.document.getElementById('SiteLog_TemperatureSensor').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_TemperatureSensor').style.backgroundPosition = "center";
        parent.document.getElementById('SiteLog_TemperatureSensor').style.textAlign = "center";
        parent.document.getElementById('SiteLog_TemperatureSensor').style.paddingLeft = "9px";
        parent.document.getElementById('SiteLog_TemperatureSensor').style.paddingRight = "9px";
        parent.document.getElementById('SiteLog_TemperatureSensor').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_TemperatureSensor').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('SiteLog_TemperatureSensor').style.color = "white";
    }
    if (parent.document.getElementById('SiteLog_WaterVaporRadiometer').innerHTML == '0' || parent.document.getElementById('SiteLog_WaterVaporRadiometer').innerHTML == '') {
        parent.document.getElementById('SiteLog_WaterVaporRadiometer').style.color = "white";
        parent.document.getElementById('SiteLog_WaterVaporRadiometer').style.backgroundImage = "";
    } else {
        parent.document.getElementById('SiteLog_WaterVaporRadiometer').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_WaterVaporRadiometer').style.backgroundPosition = "center";
        parent.document.getElementById('SiteLog_WaterVaporRadiometer').style.textAlign = "center";
        parent.document.getElementById('SiteLog_WaterVaporRadiometer').style.paddingLeft = "9px";
        parent.document.getElementById('SiteLog_WaterVaporRadiometer').style.paddingRight = "9px";
        parent.document.getElementById('SiteLog_WaterVaporRadiometer').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_WaterVaporRadiometer').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('SiteLog_WaterVaporRadiometer').style.color = "white";
    }
    if (parent.document.getElementById('SiteLog_OtherInstrumentation').innerHTML == '0' || parent.document.getElementById('SiteLog_OtherInstrumentation').innerHTML == '') {
        parent.document.getElementById('SiteLog_OtherInstrumentation').style.color = "white";
        parent.document.getElementById('SiteLog_OtherInstrumentation').style.backgroundImage = "";
    } else {
        parent.document.getElementById('SiteLog_OtherInstrumentation').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_OtherInstrumentation').style.backgroundPosition = "center";
        parent.document.getElementById('SiteLog_OtherInstrumentation').style.textAlign = "center";
        parent.document.getElementById('SiteLog_OtherInstrumentation').style.paddingLeft = "9px";
        parent.document.getElementById('SiteLog_OtherInstrumentation').style.paddingRight = "9px";
        parent.document.getElementById('SiteLog_OtherInstrumentation').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('SiteLog_OtherInstrumentation').style.color = "white";
    }
    if (parent.document.getElementById('SiteLog_RadioInterferences').innerHTML == '0' || parent.document.getElementById('SiteLog_RadioInterferences').innerHTML == '') {
        parent.document.getElementById('SiteLog_RadioInterferences').style.color = "white";
        parent.document.getElementById('SiteLog_RadioInterferences').style.backgroundImage = "";
    } else {
        parent.document.getElementById('SiteLog_RadioInterferences').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_RadioInterferences').style.backgroundPosition = "center";
        parent.document.getElementById('SiteLog_RadioInterferences').style.textAlign = "center";
        parent.document.getElementById('SiteLog_RadioInterferences').style.paddingLeft = "9px";
        parent.document.getElementById('SiteLog_RadioInterferences').style.paddingRight = "9px";
        parent.document.getElementById('SiteLog_RadioInterferences').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('SiteLog_RadioInterferences').style.color = "white";
    }
    if (parent.document.getElementById('SiteLog_MultipathSources').innerHTML == '0' || parent.document.getElementById('SiteLog_MultipathSources').innerHTML == '') {
        parent.document.getElementById('SiteLog_MultipathSources').style.color = "white";
        parent.document.getElementById('SiteLog_MultipathSources').style.backgroundImage = "";
    } else {
        parent.document.getElementById('SiteLog_MultipathSources').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_MultipathSources').style.backgroundPosition = "center";
        parent.document.getElementById('SiteLog_MultipathSources').style.textAlign = "center";
        parent.document.getElementById('SiteLog_MultipathSources').style.paddingLeft = "9px";
        parent.document.getElementById('SiteLog_MultipathSources').style.paddingRight = "9px";
        parent.document.getElementById('SiteLog_MultipathSources').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('SiteLog_MultipathSources').style.color = "white";
    }
    if (parent.document.getElementById('SiteLog_SignalObstructions').innerHTML == '0' || parent.document.getElementById('SiteLog_SignalObstructions').innerHTML == '') {
        parent.document.getElementById('SiteLog_SignalObstructions').style.color = "white";
        parent.document.getElementById('SiteLog_SignalObstructions').style.backgroundImage = "";
    } else {
        parent.document.getElementById('SiteLog_SignalObstructions').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_SignalObstructions').style.backgroundPosition = "center";
        parent.document.getElementById('SiteLog_SignalObstructions').style.textAlign = "center";
        parent.document.getElementById('SiteLog_SignalObstructions').style.paddingLeft = "9px";
        parent.document.getElementById('SiteLog_SignalObstructions').style.paddingRight = "9px";
        parent.document.getElementById('SiteLog_SignalObstructions').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('SiteLog_SignalObstructions').style.color = "white";
    }
    if (parent.document.getElementById('SiteLog_LocalEpisodicEffects').innerHTML == '0' || parent.document.getElementById('SiteLog_LocalEpisodicEffects').innerHTML == '') {
        parent.document.getElementById('SiteLog_LocalEpisodicEffects').style.color = "white";
        parent.document.getElementById('SiteLog_LocalEpisodicEffects').style.backgroundImage = "";
    } else {
        parent.document.getElementById('SiteLog_LocalEpisodicEffects').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_LocalEpisodicEffects').style.backgroundPosition = "center";
        parent.document.getElementById('SiteLog_LocalEpisodicEffects').style.textAlign = "center";
        parent.document.getElementById('SiteLog_LocalEpisodicEffects').style.paddingLeft = "9px";
        parent.document.getElementById('SiteLog_LocalEpisodicEffects').style.paddingRight = "9px";
        parent.document.getElementById('SiteLog_LocalEpisodicEffects').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('SiteLog_LocalEpisodicEffects').style.color = "white";
    }
    if (parent.document.getElementById('SiteLog_OperationalContact').innerHTML == '0' || parent.document.getElementById('SiteLog_OperationalContact').innerHTML == '') {
        parent.document.getElementById('SiteLog_OperationalContact').style.color = "white";
        parent.document.getElementById('SiteLog_OperationalContact').style.backgroundImage = "";
    } else {
        parent.document.getElementById('SiteLog_OperationalContact').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_OperationalContact').style.backgroundPosition = "center";
        parent.document.getElementById('SiteLog_OperationalContact').style.textAlign = "center";
        parent.document.getElementById('SiteLog_OperationalContact').style.paddingLeft = "9px";
        parent.document.getElementById('SiteLog_OperationalContact').style.paddingRight = "9px";
        parent.document.getElementById('SiteLog_OperationalContact').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('SiteLog_OperationalContact').style.color = "white";
    }
    if (parent.document.getElementById('SiteLog_ResponsibleAgency').innerHTML == '0' || parent.document.getElementById('SiteLog_ResponsibleAgency').innerHTML == '') {
        parent.document.getElementById('SiteLog_ResponsibleAgency').style.color = "white";
        parent.document.getElementById('SiteLog_ResponsibleAgency').style.backgroundImage = "";
    } else {
        parent.document.getElementById('SiteLog_ResponsibleAgency').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_ResponsibleAgency').style.backgroundPosition = "center";
        parent.document.getElementById('SiteLog_ResponsibleAgency').style.textAlign = "center";
        parent.document.getElementById('SiteLog_ResponsibleAgency').style.paddingLeft = "9px";
        parent.document.getElementById('SiteLog_ResponsibleAgency').style.paddingRight = "9px";
        parent.document.getElementById('SiteLog_ResponsibleAgency').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('SiteLog_ResponsibleAgency').style.color = "white";
    }
    if (parent.document.getElementById('SiteLog_DataCenter').innerHTML == '0' || parent.document.getElementById('SiteLog_DataCenter').innerHTML == '') {
        parent.document.getElementById('SiteLog_DataCenter').style.color = "white";
        parent.document.getElementById('SiteLog_DataCenter').style.backgroundImage = "";
    } else {
        parent.document.getElementById('SiteLog_DataCenter').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('SiteLog_DataCenter').style.backgroundPosition = "center";
        parent.document.getElementById('SiteLog_DataCenter').style.textAlign = "center";
        parent.document.getElementById('SiteLog_DataCenter').style.paddingLeft = "9px";
        parent.document.getElementById('SiteLog_DataCenter').style.paddingRight = "9px";
        parent.document.getElementById('SiteLog_DataCenter').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('SiteLog_DataCenter').style.color = "white";
    }

    if (parent.document.getElementById('Author').innerHTML == '0' || parent.document.getElementById('Author').innerHTML == '') {
        parent.document.getElementById('Author').style.color = "#F5F5F5";
        parent.document.getElementById('Author').style.backgroundImage = "";
    } else {
        parent.document.getElementById('Author').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('Author').style.backgroundPosition = "center";
        parent.document.getElementById('Author').style.textAlign = "center";
        parent.document.getElementById('Author').style.paddingLeft = "9px";
        parent.document.getElementById('Author').style.paddingRight = "9px";
        parent.document.getElementById('Author').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('Author').style.color = "#F5F5F5";
    }
    if (parent.document.getElementById('Identification').innerHTML == '0' || parent.document.getElementById('Identification').innerHTML == '') {
        parent.document.getElementById('Identification').style.color = "#F5F5F5";
        parent.document.getElementById('Identification').style.backgroundImage = "";
    } else {
        parent.document.getElementById('Identification').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('Identification').style.backgroundPosition = "center";
        parent.document.getElementById('Identification').style.textAlign = "center";
        parent.document.getElementById('Identification').style.paddingLeft = "9px";
        parent.document.getElementById('Identification').style.paddingRight = "9px";
        parent.document.getElementById('Identification').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('Identification').style.color = "#F5F5F5";
    }
    if (parent.document.getElementById('Location').innerHTML == '0' || parent.document.getElementById('Location').innerHTML == '') {
        parent.document.getElementById('Location').style.color = "#F5F5F5";
        parent.document.getElementById('Location').style.backgroundImage = "";
    } else {
        parent.document.getElementById('Location').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('Location').style.backgroundPosition = "center";
        parent.document.getElementById('Location').style.textAlign = "center";
        parent.document.getElementById('Location').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('Location').style.backgroundPosition = "center";
        parent.document.getElementById('Location').style.textAlign = "center";
        parent.document.getElementById('Location').style.paddingLeft = "9px";
        parent.document.getElementById('Location').style.paddingRight = "9px";
        parent.document.getElementById('Location').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('Location').style.color = "#F5F5F5";
    }
    if (parent.document.getElementById('GNSS').innerHTML == '0' || parent.document.getElementById('GNSS').innerHTML == '') {
        parent.document.getElementById('GNSS').style.color = "#F5F5F5";
        parent.document.getElementById('GNSS').style.backgroundImage = "";
    } else {
        parent.document.getElementById('GNSS').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('GNSS').style.backgroundPosition = "center";
        parent.document.getElementById('GNSS').style.textAlign = "center";
        parent.document.getElementById('GNSS').style.paddingLeft = "9px";
        parent.document.getElementById('GNSS').style.paddingRight = "9px";
        parent.document.getElementById('GNSS').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('GNSS').style.color = "#F5F5F5";
    }
    if (parent.document.getElementById('Surveyed').innerHTML == '0' || parent.document.getElementById('Surveyed').innerHTML == '') {
        parent.document.getElementById('Surveyed').style.color = "#F5F5F5";
        parent.document.getElementById('Surveyed').style.backgroundImage = "";
    } else {
        parent.document.getElementById('Surveyed').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('Surveyed').style.backgroundPosition = "center";
        parent.document.getElementById('Surveyed').style.textAlign = "center";
        parent.document.getElementById('Surveyed').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('Surveyed').style.backgroundPosition = "center";
        parent.document.getElementById('Surveyed').style.textAlign = "center";
        parent.document.getElementById('Surveyed').style.paddingLeft = "9px";
        parent.document.getElementById('Surveyed').style.paddingRight = "9px";
        parent.document.getElementById('Surveyed').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('Surveyed').style.color = "#F5F5F5";
    }
    if (parent.document.getElementById('Frequency').innerHTML == '0' || parent.document.getElementById('Frequency').innerHTML == '') {
        parent.document.getElementById('Frequency').style.color = "#F5F5F5";
        parent.document.getElementById('Frequency').style.backgroundImage = "";
    } else {
        parent.document.getElementById('Frequency').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('Frequency').style.backgroundPosition = "center";
        parent.document.getElementById('Frequency').style.textAlign = "center";
        parent.document.getElementById('Frequency').style.paddingLeft = "9px";
        parent.document.getElementById('Frequency').style.paddingRight = "9px";
        parent.document.getElementById('Frequency').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('Frequency').style.color = "#F5F5F5";
    }
    if (parent.document.getElementById('Collocation').innerHTML == '0' || parent.document.getElementById('Collocation').innerHTML == '') {
        parent.document.getElementById('Collocation').style.color = "#F5F5F5";
        parent.document.getElementById('Collocation').style.backgroundImage = "";
    } else {
        parent.document.getElementById('Collocation').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('Collocation').style.backgroundPosition = "center";
        parent.document.getElementById('Collocation').style.textAlign = "center";
        parent.document.getElementById('Collocation').style.paddingLeft = "9px";
        parent.document.getElementById('Collocation').style.paddingRight = "9px";
        parent.document.getElementById('Collocation').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('Collocation').style.color = "#F5F5F5";
    }
    if (parent.document.getElementById('Instrumentation').innerHTML == '0' || parent.document.getElementById('Instrumentation').innerHTML == '') {
        parent.document.getElementById('Instrumentation').style.color = "#F5F5F5";
        parent.document.getElementById('Instrumentation').style.backgroundImage = "";
    } else {
        parent.document.getElementById('Instrumentation').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('Instrumentation').style.backgroundPosition = "center";
        parent.document.getElementById('Instrumentation').style.textAlign = "center";
        parent.document.getElementById('Instrumentation').style.paddingLeft = "9px";
        parent.document.getElementById('Instrumentation').style.paddingRight = "9px";
        parent.document.getElementById('Instrumentation').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('Instrumentation').style.color = "#F5F5F5";
    }
    if (parent.document.getElementById('Conditions').innerHTML == '0' || parent.document.getElementById('Conditions').innerHTML == '') {
        parent.document.getElementById('Conditions').style.color = "#F5F5F5";
        parent.document.getElementById('Conditions').style.backgroundImage = "";
    } else {
        parent.document.getElementById('Conditions').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('Conditions').style.backgroundPosition = "center";
        parent.document.getElementById('Conditions').style.textAlign = "center";
        parent.document.getElementById('Conditions').style.paddingLeft = "9px";
        parent.document.getElementById('Conditions').style.paddingRight = "9px";
        parent.document.getElementById('Conditions').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('Conditions').style.color = "#F5F5F5";
    }
    if (parent.document.getElementById('Effects').innerHTML == '0' || parent.document.getElementById('Effects').innerHTML == '') {
        parent.document.getElementById('Effects').style.color = "#F5F5F5";
        parent.document.getElementById('Effects').style.backgroundImage = "";
    } else {
        parent.document.getElementById('Effects').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('Effects').style.backgroundPosition = "center";
        parent.document.getElementById('Effects').style.textAlign = "center";
        parent.document.getElementById('Effects').style.paddingLeft = "9px";
        parent.document.getElementById('Effects').style.paddingRight = "9px";
        parent.document.getElementById('Effects').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('Effects').style.color = "#F5F5F5";
    }
    if (parent.document.getElementById('OpContact').innerHTML == '0' || parent.document.getElementById('OpContact').innerHTML == '') {
        parent.document.getElementById('OpContact').style.color = "#F5F5F5";
        parent.document.getElementById('OpContact').style.backgroundImage = "";
    } else {
        parent.document.getElementById('OpContact').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('OpContact').style.backgroundPosition = "center";
        parent.document.getElementById('OpContact').style.textAlign = "center";
        parent.document.getElementById('OpContact').style.paddingLeft = "9px";
        parent.document.getElementById('OpContact').style.paddingRight = "9px";
        parent.document.getElementById('OpContact').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('OpContact').style.color = "#F5F5F5";
    }
    if (parent.document.getElementById('Agency').innerHTML == '0' || parent.document.getElementById('Agency').innerHTML == '') {
        parent.document.getElementById('Agency').style.color = "#F5F5F5";
        parent.document.getElementById('Agency').style.backgroundImage = "";
    } else {
        parent.document.getElementById('Agency').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('Agency').style.backgroundPosition = "center";
        parent.document.getElementById('Agency').style.textAlign = "center";
        parent.document.getElementById('Agency').style.paddingLeft = "9px";
        parent.document.getElementById('Agency').style.paddingRight = "9px";
        parent.document.getElementById('Agency').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('Agency').style.color = "#F5F5F5";
    }
    if (parent.document.getElementById('DataCenter').innerHTML == '0' || parent.document.getElementById('DataCenter').innerHTML == '') {
        parent.document.getElementById('DataCenter').style.color = "#F5F5F5";
        parent.document.getElementById('DataCenter').style.backgroundImage = "";
    } else {
        parent.document.getElementById('DataCenter').style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('DataCenter').style.backgroundPosition = "center";
        parent.document.getElementById('DataCenter').style.textAlign = "center";
        parent.document.getElementById('DataCenter').style.paddingLeft = "9px";
        parent.document.getElementById('DataCenter').style.paddingRight = "9px";
        parent.document.getElementById('DataCenter').style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('DataCenter').style.color = "#F5F5F5";
    }
    if (parent.document.getElementById('lbl' + currStation).innerHTML == '0' || parent.document.getElementById('lbl' + currStation).innerHTML == '') {
        parent.document.getElementById('lbl' + currStation).style.color = "#e8e9ec";
    } else {
        parent.document.getElementById('lbl' + currStation).style.backgroundRepeat = "no-repeat";
        parent.document.getElementById('lbl' + currStation).style.backgroundPosition = "center";
        parent.document.getElementById('lbl' + currStation).style.textAlign = "center";
        parent.document.getElementById('lbl' + currStation).style.paddingLeft = "10px";
        parent.document.getElementById('lbl' + currStation).style.paddingRight = "9px";
        parent.document.getElementById('lbl' + currStation).style.backgroundImage = "url(lib/images/redback3t.png)";
        parent.document.getElementById('lbl' + currStation).style.color = "white";
    }
}

//Check if form values have changed. Called from form php files

function form_is_modified(oForm)
{
//	    var el, opt, hasDefault, i = 0, j;
//	    while (el = oForm.elements[i++]) {
//		switch (el.type) {
//		case 'text' :
//		case 'textarea' :
//		case 'hidden' :
//		    if (el.value != el.defaultValue) return true;
//		    break;
//		case 'checkbox' :
//		case 'radio' :
//		    if (el.checked != el.defaultChecked) return true;
//		    break;
//		case 'select-one' :
//		case 'select-multiple' :
//		    j = 0, hasDefault = false;
//		    while (opt = el.options[j++])
//		    if (opt.defaultSelected) hasDefault = true;
//		    j = hasDefault ? 0 : 1;
//		    while (opt = el.options[j++]) 
//		    if (opt.selected != opt.defaultSelected) return true;
//		    break;
//		}
//	    }
//	    return false;
}

/**
 * 
 * ************** END OF OLD ORIGINAL FUNCTIONS
 * 
 */



/**
 * 
 * ************************* DIALOG BOX
 * 
 * 
 * @param {type} params
 * @returns {undefined}
 */


//----------- DIALOG BOX --------------
function igsDialog(params) {

    $.post('forms/igsDialog.php', params, callback_igsDialog);

}

function callback_igsDialog(data) {

    if (!$('#divDialog').length) {
        $('#igsDialog').append(data);
        $('#divDialog').css('display', 'block');//.fadeIn("slow");//.css('display','block');
    }
    else
    {
        $('#divDialog').css('display', 'block');//.fadeIn("slow");//.css('display','block');
    }

    if (fadeBackground){ $('.overlay').fadeToggle("slow"); }
    $("#divDialog").draggable({handle: ".dialog-header"});

}

function igsAlert(text, functions, fade) {

    if (typeof functions !== 'undefined') {
        var fn1 = functions.fn1;
    }
    else
    {
        var fn1 = null;
        var fn2 = null;
    }

    igsDialog({text: text, button1: 'OK', fn1: fn1, button1_Return: true, header: 'Alert'});
    $('#igsDialog').css('display', 'block');//.fadeIn('slow');
    if (fadeBackground && fade){ $('.overlay').fadeToggle("slow"); }
    $('#igsDialog').children().remove();

    return true;

}

function igsAlert2(text, functions) {

    if (typeof functions !== 'undefined') {
        var fn1 = functions.fn1;
    }
    else
    {
        var fn1 = null;
        var fn2 = null;
    }

    igsDialog({text: text, button1: 'OK', fn1: fn1, button1_Return: true, width: '640px', top: '30%', left: '40%', header: 'Startup Tips', maxHeight: '450px', overflowX: 'auto'});
    $('#igsDialog').css('display', 'block');//.fadeIn('slow');
    if (fadeBackground){ $('.overlay').fadeToggle("slow"); }
    $('#igsDialog').children().remove();

    return true;

}

function igsMessage(text) {

    igsDialog({text: text, header: 'Alert'});
    $('#igsDialog').css('display', 'block');//.fadeIn('slow');
    if (fadeBackground){ $('.overlay').fadeToggle("slow"); }
    $('#igsDialog').children().remove();

    return true;

}

function igsConfirm(text, functions) {

    var fn2 = functions.fn2;
    var fn1 = functions.fn1;

    igsDialog({text: text, button2: 'Yes', button2_Return: true, fn2: fn2, button1: 'No', fn1: fn1, button1_Return: false, header: 'Confirm'});
    $('#igsDialog').css('display', 'block');//.fadeIn('slow');

}

function igsConfirmModeration(text, functions) {

    igsDialog({text: text, button2: 'Correct', button2_Return: true, fn2: "correctionEmail", button3: 'Approve', button3_Return: true, fn3: "approveModeration", button1: 'Cancel', button1_Return: false, header: 'Site Moderation'});
    $('#igsDialog').css('display', 'block');//.fadeIn('slow');

}

function igsCancelModeration(text, functions) {

    igsDialog({text: text, button2: 'Correction Request', button2_Return: true, fn2: "correctionEmail", button3: 'OK - Cancel Moderation', button3_Return: true, fn3: "cancelAdminModeration", button1: 'Cancel', button1_Return: false, header: 'Cancel Site Moderation'});
    $('#igsDialog').css('display', 'block');//.fadeIn('slow');

}

$(document).on('click', '#confirmButton1', function(data) {

    $('#igsDialog').css('display', 'none');//.fadeOut('slow');
    var fn1 = $('#button1_Function').val();
    if (typeof window[fn1] === 'function') {
        eval(fn1 + '()');
    }
    if (fadeBackground){ $('.overlay').fadeToggle("slow"); }
    $('#igsDialog').children().remove();

});

$(document).on('click', '#confirmButton2', function(data) {

    $('#igsDialog').css('display', 'none');//.fadeOut('slow');
    var fn2 = $('#button2_Function').val();
    if (typeof window[fn2] === 'function') {
        eval(fn2 + '("slow")');
    }
    if (fadeBackground){ $('.overlay').fadeToggle("slow"); }
    $('#igsDialog').children().remove();

});

$(document).on('click', '#confirmButton3', function(data) {

    $('#igsDialog').css('display', 'none');//.fadeOut('slow');
    var fn3 = $('#button3_Function').val();
    if (typeof window[fn3] === 'function') {
        eval(fn3 + '("slow")');
    }
    if (fadeBackground){ $('.overlay').fadeToggle("slow"); }
    $('#igsDialog').children().remove();

});

function saveMessage(result) {

    if (result) {

        //topMessage('Record Auto-Saved', 2000, 'whitesmoke', 'navy');
        topMessage('Record Saved', 2000, 'whitesmoke', 'navy');
    }
    else
    {
        topMessage('record NOT saved...', 2000, 'whitesmoke', 'red');
    }

}

function topMessage(text, mSeconds, color, bkColor) {

    $('#myIframe_top_margin').text('').append('<div id="topMessage" class="topMessage">' + text + '</div>');
    if (color && bkColor) {
        $('#topMessage').css('color', color).css('background-color', bkColor);
    }
    if (mSeconds) {
        setTimeout("$('#topMessage').remove()", mSeconds);
    }

}

function modifiedMessage() {

    topMessage('Modified', 0, 'whitesmoke', 'red');

}

function removeIGSMessage(){
    $('#igsDialog').hide();
    $('#igsDialog').children().remove();
}

function toggleIGSMessage(){
    
    $('#igsDialog').toggle();
}

function disableButton(buttonID){
    
    var button = document.getElementById(buttonID);
        button.disabled = true;        
    disableEnableButton("showMessageButton","enableButtonButton","disableButtonButton");
}

function enableButton(buttonID){

    var button = document.getElementById(buttonID);
        button.disabled = false;
    disableEnableButton("showMessageButton","enableButtonButton","disableButtonButton");
}

function disableEnableButton(dependant,enable,disable){
    
    if (document.getElementById(dependant).disabled){
        console.log('button is disabaled');
        document.getElementById(enable).disabled = false;
        document.getElementById(disable).disabled = true;
    }else{
        console.log('button is NOT disabled');
        document.getElementById(enable).disabled = true;
        document.getElementById(disable).disabled = false;
    }
    
}

function toggleButton(buttonID){

    var button = document.getElementById(buttonID);
    if (button.disabled){
        button.disabled = false;
    }else{
        button.disabled = true;
    }
    
}


//$(document).ready(function () {
//    $("#divDialog")
//        .draggable( { handle: ".dialog-header" })
//        .closable({ handle: ".dialog-header", 
//                    closeHandler: function() { 
//                        alert('window closed');
//                        return true;  //  true closes false leaves open
//                    }
//                   });
//});

//(function($){
//    $.fn.centerIt = function(settings){
//
//        var opts = $.extend({}, $.fn.centerIt.defaults, settings);
//
//        return this.each(function(settings){
//          var options = $.extend({}, opts, $(this).data());
//          var $this = $(this);
//
//          $this.css({
//            position:options.position,
//            top:'50%',
//            left:'50%',
//            width:options.width,                 // adjust width
//            height:options.height,               // adjust height
//            zIndex:1000,
//            marginTop:parseInt((options.height / 2), 10) + 'px',  // half of height
//            marginLeft:parseInt((options.width / 2), 10) + 'px',  // half of height
//          });
//
//        });
//    }
//
//    // plugin defaults - added as a property on our plugin function
//    $.fn.centerIt.defaults = {
//      width: '600px',
//      height: '600px',
//      position:'absolute'
//    }
//
//})(jQuery);
//
//$.fn.centerToWindow = function()
//{
//    
//    //alert($(this).valueOf());
//    
//  var obj           = $(this);
//  var obj_width     = $(this).outerWidth(true);
//  var obj_height    = $(this).outerHeight(true);
//  var window_width  = window.innerWidth ? window.innerWidth : $(window).width();
//  var window_height = window.innerHeight ? window.innerHeight : $(window).height();
//
//  obj.css({
//    "position" : "absolute",
//    "top"      : "50%",
//    "left"     : "50%",
//    "margin-top"      : parseInt(((obj_height/2)/2)*-1,10)+"px",
//    "margin-left"     : parseInt(((obj_width/2)/2)*-1,10)+"px"
//  });
//}
//
//$.fn.centerToWindow_old = function()
//{
//  var obj           = $(this);
//  var obj_width     = $(this).outerWidth(true);
//  var obj_height    = $(this).outerHeight(true);
//  var window_width  = window.innerWidth ? window.innerWidth : $(window).width();
//  var window_height = window.innerHeight ? window.innerHeight : $(window).height();
//
//  obj.css({
//    "position" : "fixed",
//    "top"      : ((window_height / 2) - (obj_height / 2))+"px",
//    "left"     : ((window_width / 2) - (obj_width / 2))+"px"
//  });
//}


/**
 * 
 * ******************** END DIALOG BOX
 * 
 */


/**
 * 
 * 
 * ******************** MISC FUNCTIONS
 * 
 * 
 * 
 */

function testFunction() {

    //params = {tableName: 'SiteLog_Master'};
    params = {};
    $.post('forms/testFunction.php',params,callback_testFunction);

    //window.open("forms/startupTips.php","SLM Startup Tips","location=0,status=0,scrollbars=0, width=700,height=700");
    //window.open("IGSpage.php", "SLM Startup Tips", "location=0,status=0,scrollbars=0, width=700,height=550, top=200, left=315");

}

function callback_testFunction(data) {
    alert(data);
}

function privacyPolicy() {
    //alert('Privacy Policy and Terms of Use here...');

    $('#myIframe').text('');
    //myIframe_set();

    var params = {};

    $.post('forms/privacyPolicy.php', params, callback_privacyPolicy);

}

function callback_privacyPolicy(data) {

    $("#myIframe").text("");
    $("#myIframe").append(data);
}

$(document).on("click", "#privacyPolicy_cancel_button", function() {

    $("#myIframe").text("");
    $("#myIframe_top_margin").text("");

    // - true = show full login page
    // - false = only display the "Logged in as:..." message at top of page
    // RETURN TO LOGIN PAGE
    loginPage(true);

});

function startupTips() {

    window.open("IGSpage.php", "SLM Startup Tips", "location=0,status=0,scrollbars=0, width=700,height=550, top=200, left=315");

}

function testReport() {

    clearPage();
    containerWidth = 'narrow';
    setNarrowFrames();
    cleanUpMyIframe(); // reset all sizes for myIframes and related containers
    sitelogMenu_hide();
    clearSelection();
    resetSitelogElementColor();

    $.get('forms/testFunction.php', callback_testReport);

}

function testReport2() {

    clearPage();
    containerWidth = 'narrow';
    setNarrowFrames();
    cleanUpMyIframe(); // reset all sizes for myIframes and related containers
    sitelogMenu_hide();
    clearSelection();
    resetSitelogElementColor();

    $.get('forms/testFunction3.php', callback_testReport);

}

function callback_testReport(data) {

    //$('#myIframe_top_margin').css('min-height','20px').append("<div class='tableCell' style='width: 75px;'><h4>User ID</h4></div><div class='tableCell' style='width: 200px;'>Member Name</div><div class='tableCell' style='width: 150px;'>Login ID/Email</div><div class='tableCell' style='width: 200px;'>Action</div><div class='tableCell' style='width: 100px;'>Agency(s)</div>");

    $('#myIframe').append(data);

}

/**
 * 
 * **************** IGSreport **************
 * 
 * **/

// IGSreport.php - main report generator
function IGSreport(reportFile) {

    checkIfModified();

    clearPage();
    containerWidth = 'narrow';
    setNarrowFrames();
    cleanUpMyIframe(); // reset all sizes for myIframes and related containers
    sitelogMenu_hide();
    clearSelection();
    resetSitelogElementColor();
    
    igsMessage('Loading Data...');

    $.get(reportFile, callback_IGSreport);

}

function callback_IGSreport(data) {

    //$('#myIframe_top_margin').css('min-height','20px').append("<div class='tableCell' style='width: 75px;'><h4>User ID</h4></div><div class='tableCell' style='width: 200px;'>Member Name</div><div class='tableCell' style='width: 150px;'>Login ID/Email</div><div class='tableCell' style='width: 200px;'>Action</div><div class='tableCell' style='width: 100px;'>Agency(s)</div>");

    removeIGSMessage();

    $('#myIframe').append(data);

}

$("#Action").bind("contextmenu", function(e) {

    // disable the default system rt click menu
    e.preventDefault();

    // show menu at fixed position relative to the mouse click
    $('#ActionMenu').css({
        top: (e.pageY - 45) + 'px',
        left: (e.pageX - 45) + 'px'
    }).show();

    return false;

});

/*
 * if user clicks or right clicks anywhere 
 * else on the document the menu hides
 */
$(document).click(function(e) {
    $('#ActionMenu').hide();
});

function showActivtyLogActivty() {
    user_activtyLog('HistoryDate', 'DESC', 'TRUE');
}

function hideActivtyLogActivty() {
    user_activtyLog('HistoryDate', 'DESC', 'FALSE');
}
/**
 * 
 * ******************** end IGSreport ******************
 * 
 * */





/**
 * 
 * 
 * ******************** begin Help System *****************
 * 
 * 
 * **/

function showHelpContainer(){
    
    params = {helpID:globalHelpID};
    $.get('forms/helpPage.php',params,function(data){
        $('#helpBox').append(data);
    });
    
}
function hideHelpContainer(){
    $('#helpBox').children().remove();
}

function editHelpText(){
    
    var helpTitle = $('#helpTitle').html();
    var helpText  = $('#helpText').html();
    
    params = {title:helpTitle,text:helpText};
    $.post('forms/helpTextEdit.php',params,function(editPage){
    
        $('#footerMenu').hide();
        $('#helpTextContainer').children().remove();
        $('#helpTextContainer').append(editPage);
        
    });
    
}

function helpCancel(){
    
    hideHelpContainer();
    showHelpContainer();
    
}
function helpSave(){
    
    var helpTitle = $('#helpTitleInput').val();
    var helpText  = $('#helpTextInput').val();
    
    params = {helpID: globalHelpID, title: helpTitle, helpText:helpText};
    
    $.post('forms/helpTextSave.php',params,callback_helpSave);
    
}

function callback_helpSave(data){

    hideHelpContainer();
    showHelpContainer();
    
}

/**
 * 
 * ******************* END HELP SYSTEM
 * 
 */

// popup for retrieving asscii codes etc - just create a button/link with which to call it
function getASCIICode(){
    
    $.get('forms/getCharCode.php',function(data){
        
        $("#igsDialog").append(data);
        $("#getCharCode").draggable();
        
    });
    
}

// toggle site status legend on the bottom of the screen on/off - defaults back to on upon reload
function toggleLegend(){
    if ($('#footerLegend').is(":hidden")){
        $('#footerLegend').show();
    }
    else
    {
        $('#footerLegend').hide();
    }
}

// toggle all email alerts (in mail2 class) on/off for admins only
function toggleEmailAlerts(){
    var params = {};
    $.post('forms/toggleEmailAlerts.php',params,callback_toggleEmailAlerts);
}

function toggleCurrentDB(){
    var params = {};
    $.post('forms/toggleCurrentDB.php',params,callback_toggleEmailAlerts);
}

function callback_toggleEmailAlerts(data){
    
    if (data == 'OFF'){
        $('#version').append('<div id="emailAlertStatus" style="float:left;margin-left:10px;color:#D39A24;">email alerts are OFF</div>');    
    }
    else
    {
        $('#emailAlertStatus').remove();
    }

    
}

function toggleCurrentDB(){
    var params = {};
    $.post('forms/toggleCurrentDB.php',params,callback_toggleCurrentDB);
}

function callback_toggleCurrentDB(data){

    dbData_ = get_json_substring(data);
    dbData  = $.parseJSON(dbData_);

    if (dbData.mode){
        $('#version').append('<div id="currentDB" style="float:left;margin-left:10px;color:#D39A24;">'+dbData.server+'->'+dbData.db+'</div>');    
    }
    else
    {
        $('#currentDB').remove();
    }

}


// bind tool tips - tooltipster to various elements - there are several (3-4) of these function defs throughout app where needed
// if the element isn't binding on type of element as defined in the second line assign class tooltip to the desired element if needed
// this could be made more universal
$(document).ready(function() {
    $('.tooltip').tooltipster({maxWidth:300,contentAsHTML:true,delay:400});
    $('input, a, button, li, img').tooltipster({maxWidth:300,contentAsHTML:true,delay:400});
});



