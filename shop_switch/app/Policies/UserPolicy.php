<?php

namespace App\Policies;

use App\Models\Company;
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
    public function user_companies(User $user_auth,User $user, Company $company)
    {

        $userIds = $company->getIds_users();
        if (in_array($user_auth->id, $userIds)) {
            return true;
        }
        else{
            return abort(403);
        }
    }

}
