<?php

function bikershop_now(){
    
    //return date('d-m-Y H:i:s');
    return date('d-m-Y H:i');
    
}

function prettyDateTime(){
    
    $date = bikershop_now();
    $month = date('M');
    $day_year = date('d Y');
    return $month+' '+$day_year;
    
}

function pg_date($date){
    
//    $date = '15-05-2023 10:08 PM';
//    $date = 'Thu, 26 Feb 2015 11:39:59';
    $date2 = new DateTime($date);
    return $date2->format('Y-m-d H:i:s');
    
}

function debug_to_console($data) {
    $output = $data;
    if (is_array($output)){
        $output = implode(',', $output);
    }

    echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
}

