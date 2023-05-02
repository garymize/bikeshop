<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\profile;
use Illuminate\View\View;

class profile extends Controller
{
    function show(string $id){
        
        return view('profile.show', [
            'profile' => fetch::findOrFail($id)
        ]);
        
    }
    
    function add(){
        
        $id = 'new';
        
    }
    
    function edit(string $id){
        
        
        
    }
    
    function delete(string $id){
        
        
        
    }
}


