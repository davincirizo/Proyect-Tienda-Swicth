<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResetEmail extends Model
{
    protected $table = 'reset_email';

    protected $fillable = [
        'email',
        'token',
        'user_id',
    ];
    use HasFactory;

}
