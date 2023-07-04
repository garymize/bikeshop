<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\UsersController;

 
class LoginController extends Controller
{
    /**
     * Handle an authentication attempt.
     */
    public function authenticate(Request $request): RedirectResponse
    {
        debug_to_console('authenticate');
        debug_to_console($request);
        
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
 
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
 
            return redirect()->intended('dashboard');
        }

        debug_to_console('login fail');
        debug_to_console($request->email);
        Log::debug('login fail');
        Log::debug($request->email);
        Log::info('login fail');
        Log::info('login email: '.$request->email);
        Log::info('login password: '.$request->password);
        $result = Auth::attempt($credentials);
        Log::info('Result: '.Auth::attempt($credentials));
        
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }
}