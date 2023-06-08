<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

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

Route::get('/', function () {
    return view('home');
})->name('home');

Route::get('/home', function () {
    return view('home');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/userform/edit/',[UsersController::class, 'edit'])->name('user-form');
Route::get('/userform/show/',[UsersController::class, 'show'])->name('show-user');
Route::get('/user/new/',[UsersController::class, 'new'])->name('new-user');
Route::get('/user/add/',[UsersController::class, 'new'])->name('new-add');

Route::post('user/updatenewpw/{email}',[UsersController::class, 'updateNewPW'])->name('userUpdateNewPW');
Route::get('user/create',[UsersController::class, 'create'])->name('createUser');
Route::post('user/store',[UsersController::class, 'store'])->name('storeUser');
Route::post('user/update',[UsersController::class, 'update'])->name('updateUser');
Route::get('user/show/{email}',[UsersController::class, 'show'])->name('showUser');
Route::get('user/edit/{email}',[UsersController::class, 'edit'])->name('userEdit');
Route::get('user/changepw/{email}',[UsersController::class, 'changePW'])->name('userChangePW');

require __DIR__.'/auth.php';
