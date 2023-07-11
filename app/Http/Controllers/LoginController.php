<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\UsersController;
use App\Models\User;

 
class LoginController extends Controller
{

    /**
     * The Eloquent user model.
     *
     * @var string
     */
    protected $model;

    /**
     * Create a new database user provider.
     *
     * @param  \Illuminate\Contracts\Hashing\Hasher  $hasher
     * @param  string  $model
     * @return void
     */
    public function __construct()
    {
        $this->model = Config('auth.providers.users.model');
//        $this->hasher = $hasher;
    }

    
    /**
     * Handle an authentication attempt.
     */
    public function authenticate(Request $request): RedirectResponse
    {
        debug_to_console('authenticate');
        debug_to_console($request);
        
        
        Log::info('authentication');
        
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
 
        Log::info($credentials);
                
        //if ($this->checkPW($credentials)) {
        if (Auth::attempt($credentials)) {
            
            Log::info('LoginController.attempt');
            
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
        Log::info('Result: '.$result);
        
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }
    
    function checkPW($credentials){
        
        $user = $this->retrieveByCredentials($credentials);
        $passwordString = $user->password;
        if (!empty($passwordString) & $passwordString === $credentials['password']) {
            return TRUE;
        }

        return FALSE;

    }
    
    /**
     * Retrieve a user by the given credentials.
     *
     * @param  array  $credentials
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function retrieveByCredentials(array $credentials)
    {
        $credentials = array_filter(
            $credentials,
            fn ($key) => ! str_contains($key, 'password'),
            ARRAY_FILTER_USE_KEY
        );

        if (empty($credentials)) {
            return;
        }

        // First we will add each credential element to the query as a where clause.
        // Then we can execute the query and, if we found a user, return it in a
        // Eloquent User "model" that will be utilized by the Guard instances.
        $query = $this->newModelQuery();

        foreach ($credentials as $key => $value) {
            if (is_array($value) || $value instanceof Arrayable) {
                $query->whereIn($key, $value);
            } elseif ($value instanceof Closure) {
                $value($query);
            } else {
                $query->where($key, $value);
            }
        }

        return $query->first();
    }

    /**
     * Get a new query builder for the model instance.
     *
     * @param  \Illuminate\Database\Eloquent\Model|null  $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function newModelQuery($model = null)
    {
        $query = is_null($model)
                ? $this->createModel()->newQuery()
                : $model->newQuery();

        //with($query, $this->queryCallback);

        return $query;
    }

    /**
     * Create a new instance of the model.
     *
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function createModel()
    {
        $class = '\\'.ltrim($this->model, '\\');

        return new $class;
    }

}