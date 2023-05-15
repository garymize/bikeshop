<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class bikes extends Model
{
    use HasFactory;
    
    protected $table = 'bikes';
    protected $primaryKey = 'id';

    
}
