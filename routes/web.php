<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

//Route::get('/login',['UsersController','login']);

require __DIR__.'/auth.php';


//Route::post('/userAuth',[UsersController::class, 'userAuth'])->name('authUser');
Route::post('/userAuth',[LoginController::class,'authenticate'])->name('authUser');

Route::get('/userLogin', function () {
    if (Auth::check()){
        return redirect('/dashboard');
    }
    return view('forms.login');
});

Route::post('/userLogin', function () {
    return view('forms.login');
})->name('userLogin');

Route::get('/', function () {
    debug_to_console('"/" root');
    return view('home');
})->name('home')->middleware('auth');

Route::get('/home', function () {
    return view('home');
});

//Route::get('/dashboard', function () {
//    return view('dashboard');
//})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard', function () {
    $email = Auth::user()->email;
    $user = User::where('email',$email)->get()->firstOrFail();
    return view('dashboard',['data'=>$user]);
})->middleware('auth')->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/userform/edit/',[UsersController::class, 'edit'])->name('user-form');
Route::get('/userform/show/',[UsersController::class, 'show'])->name('show-user');
Route::get('/user/new/',[UsersController::class, 'new'])->name('new-user');
Route::get('/user/add/',[UsersController::class, 'new'])->name('new-add');

//Route::middleware(['auth'])->group(function () {
    Route::get('user/create',[UsersController::class, 'create'])->name('createUser');
    Route::post('user/store',[UsersController::class, 'store'])->name('storeUser');
    Route::post('user/update',[UsersController::class, 'update'])->name('updateUser');
    Route::get('user/show/{email}',[UsersController::class, 'show'])->name('showUser');
    Route::get('user/edit/{email}',[UsersController::class, 'edit'])->name('userEdit');
    Route::get('user/validate-email/{email}',[UsersController::class, 'validateEmail'])->name('userValidateEmail');
    Route::get('user/changepw/{email}',[UsersController::class, 'changePW'])->name('userChangePW')->middleware('auth');
    Route::post('user/updatenewpw/{email}',[UsersController::class, 'updateNewPW'])->name('userUpdateNewPW');
//});

//Route::get('user/changepw/{email}',[UsersController::class, 'changePW'])->name('userChangePW')->middleware('auth');
    
    
    Route::get('checkpw', function(Request $request) {

    $pw = $request->input('pw');
    $hash = $request->input('hash');
    
    if (password_verify($pw, $hash)) {
        $result = 'Password is valid!';
    } else {
        $result = 'Invalid password.'.' pw: '.$pw.' hash:'.$hash;
    }
    
    return $result;
    
    })->name('checkPW');

    Route::get('hash-string', function(Request $request) {

        $string = $request->input('string');

        //return Crypt::encryptString($string);
        return password_hash($string, PASSWORD_DEFAULT);

    })->name('hashString');

    //Route::get('check-password', function(Request $request) {
    //
    //    $string = $request->input('string');
    //    $hashString = $request->input('hashString');
    //    
    //    return (password_verify($string,$hashString) ? 'TRUE' : 'FALSE' );
    //    
    //})->name('checkPassword');

    Route::POST('check-password', function(Request $request) {

        $passwordString = $request->input('string');
        $hashString = $request->input('hashString');
        if ($passwordString === Crypt::decryptString($hashString)) {
            return 'TRUE';
        }

        return 'FALSE';

    })->name('checkPassword');
