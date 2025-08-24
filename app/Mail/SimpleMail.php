<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SimpleMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $pesan;
    public bool $isPassword;

    /**
     * Create a new message instance.
     */
    public function __construct(string $pesan, string $subject, bool $isPassword)
    {
        $this->pesan = $pesan;
        $this->subject = $subject;
        $this->isPassword = $isPassword;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: 'SI-DiA Dukcapil Kabupaten Morowali Utara',
            subject: $this->subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.simple',
            with: [
                'pesan' => $this->pesan,
                'isPassword' => $this->isPassword,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
