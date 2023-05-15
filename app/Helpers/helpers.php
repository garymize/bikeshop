<?php

function bikershop_now(){
    
    //return date('d-m-Y H:i:s');
    return date('d-m-Y H:i A');
    
}

function pg_date($date){
    
    $date = '15-05-2023 10:08 PM';
    $date = 'Thu, 26 Feb 2015 11:39:59';
    $date2 = new DateTime($date);
    return $date2->format('Y-m-d H:i:s');
    
}