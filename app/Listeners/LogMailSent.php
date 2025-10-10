<?php

namespace App\Listeners;

use Illuminate\Mail\Events\MessageSent;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Mime\Address;

class LogMailSent
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(MessageSent $event): void
    {
        $addresses = $event->message->getTo();

        // Jika null atau kosong
        if (empty($addresses)) {
            Log::info('⚠️ Email dikirim, tapi penerima tidak terdeteksi (getTo() kosong)');
            return;
        }

        // Symfony\Component\Mime\Address objects
        $to = collect($addresses)
            ->map(fn(Address $addr) => $addr->getAddress())
            ->implode(', ');

        Log::info('✅ Email berhasil dikirim ke: ' . $to);
    }
}
