<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{

    public function update_user(User $user_auth, User $user)
    {
        if($user_auth->id == $user->id){
            return true;
        }
        else{
            return abort(403);
        }
    }

}
