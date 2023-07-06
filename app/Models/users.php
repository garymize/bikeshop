<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//use \App\Traits\Encryptable;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;

class users extends \Eloquent implements Authenticatable
{
    use HasFactory;
//    use Encryptable;
    use AuthenticableTrait;
    
    public $incrementing = false;
    protected $table = 'users';
    protected $primaryKey = 'email';
    
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
