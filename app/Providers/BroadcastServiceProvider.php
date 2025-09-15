<?php

namespace App\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register route auth untuk channel private/presence
        // Broadcast::routes();

        // Load definisi channel dari routes/channels.php
        require base_path('routes/channels.php');
    }
}
