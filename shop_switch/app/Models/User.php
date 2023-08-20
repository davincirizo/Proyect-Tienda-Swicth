<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Mail\ForgotPassword;
use App\Mail\VerifyUser;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
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

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
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

    public function get_users(){
        return $this->roles = $this->roles;
    }
}
