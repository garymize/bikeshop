<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//use \App\Traits\Encryptable;
use Illuminate\Support\Facades\Crypt;

class users extends Model
{
    use HasFactory;
//    use Encryptable;
    
    protected $table = 'users';
    protected $primaryKey = 'id';
    
    public function setpasswordAttribute($value)
    {
        $this->attributes['password'] = Crypt::encryptString($value);
    }
    
    public function getpasswordAttribute($value)
    {
        try {
            return Crypt::decryptString($value);
        } catch (\Exception $e) {
            return $value;
        }
    }
    
//    protected $encryptable = [
//        'password'
//    ];
    
}
