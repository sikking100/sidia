<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel("notif.{id}", function ($user, $id) {
    // return Auth::user()->id === (int) $id;
    return (int) $user->id === (int) $id;
    // return true;
});
