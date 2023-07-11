<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//use \App\Traits\Encryptable;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;

class User extends  \Eloquent implements Authenticatable
{
    use HasFactory;
//    use Encryptable;
    use AuthenticableTrait;
    
    protected $table = 'users';
    protected $primaryKey = 'email';
    public $incrementing = false;
    
    public function setpasswordAttribute($value)
    {
        //$this->attributes['password'] = Crypt::encryptString($value);
        $this->attributes['password'] = password_hash($string, PASSWORD_DEFAULT);
    }
    
//    public function getpasswordAttribute($value)
//    {
//        try {
//            return Crypt::decryptString($value);
//        } catch (\Exception $e) {
//            return $value;
//        }
//    }
    
//    protected $encryptable = [
//        'password'
//    ];
    
}
