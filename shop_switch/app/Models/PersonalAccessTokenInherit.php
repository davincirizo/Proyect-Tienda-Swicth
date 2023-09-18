<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\PersonalAccessToken;

class PersonalAccessTokenInherit extends PersonalAccessToken
{

    protected $table = 'personal_access_tokens';
    public function delete_token_user()
    {
        $this->delete();
        return response()->json([
            'res' => true,
            'msg' => 'Session cerrada correctamente',
        ], 200);
    }
}
