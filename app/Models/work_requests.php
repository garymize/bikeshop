<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class work_requests extends Model
{
    use HasFactory;
    
    protected $table = 'work_requests';
    protected $primaryKey = 'id';
    
}
