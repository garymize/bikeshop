<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//use \App\Traits\Encryptable;

class users extends Model
{
    use HasFactory;
//    use Encryptable;
    
    protected $table = 'users';
    protected $primaryKey = 'id';
    
//    protected $encryptable = [
//        'password'
//    ];
    
}
