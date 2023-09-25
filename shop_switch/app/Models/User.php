<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Mail\ChangeEmail;
use App\Mail\ForgotPassword;
use App\Mail\VerifyUser;
use App\Policies\UserPolicy;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
//use Illuminate\Database\Query\Builder;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;




class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    use HasRoles;
    protected $policy = UserPolicy::class;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected static function booted()
    {
        static::addGlobalScope('roles', function (Builder $builder) {
            $builder->with('roles.permissions');
        });

    }

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];



    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
//    public static function all($columns = ['*'])
//    {
//        $users = parent::all();
//        $users->map(function ($user){
//            $user->roles;
//            return $user;
//        });
//
//
//        return $users;
//    }


    public function sendEmailVerification(){
        $token = Str::random(64);
        $this->hash = $token;
        $this->save();
        $fronted_url = env('FRONTEND_URL');
        $url_user =  $fronted_url . '/verify/' . $this->id.'/'. $this->hash;
        $correo = new VerifyUser($url_user);
        Mail::to($this->email)->send($correo);

    }

    public function sendEmailForgotPassword(){
        $search_reset = DB::table('password_reset_tokens')->where('email',$this->email)->first();
        $fronted_url = env('FRONTEND_URL');
        if(!$search_reset) {
            $token = Str::random(64);
            DB::table('password_reset_tokens')->insert([
                'email' => $this->email,
                'token' => $token,
                'created_at' => Carbon::now()
            ]);
            $url_user = $fronted_url . '/reset-password/' . $token;
            $correo = new ForgotPassword($url_user);
            Mail::to($this->email)->send($correo);
        }
        else{
            $token = Str::random(64);
            DB::table('password_reset_tokens')
                ->where('email', $search_reset->email)
                ->update(['token' => $token]);
            $url_user = $fronted_url . '/reset-password/' . $token;
            $correo = new ForgotPassword($url_user);
            Mail::to($this->email)->send($correo);
        }
    }
    public function sendEmailChangeEmail($email_change){
        $fronted_url = env('FRONTEND_URL');
        $token = Str::random(64);
        $record_reset = DB::table('reset_email')->insert([
            'email' => $email_change,
            'token' => $token,
            'user_id' => $this->id,
            'created_at' => Carbon::now()
        ]);
        $url_user = $fronted_url . '/change_email/' . $token;
        $correo = new ChangeEmail($url_user);
        Mail::to($email_change)->send($correo);

    }

    public function get_permissions(){
        $permisos = [];
        foreach ($this->roles as $role) {
            foreach ($role->permissions as $permission) {
                array_push($permisos,$permission->name);
            }

        }
        return $this->permisos = $permisos;
    }

    public function products(){
        return $this->hasMany('App\Models\Product');
    }

    public function get_request_change_email(){
        return  DB::table('reset_email')->where('user_id',$this->id)->first();

    }


}
