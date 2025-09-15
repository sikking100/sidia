<?php

namespace App\Notifications;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RequestCreatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $requestData;

    /**
     * Create a new notification instance.
     */
    public function __construct($requestData)
    {
        //
        $this->requestData = $requestData;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }

    public function toDatabase($notifiable)
    {
        return $this->requestData;
    }

    // public function broadcastOn()
    // {
    //     return ['admins']; // channel
    // }
    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage($this->requestData);
    }

    public function broadcastOn(): array
    {
        return [new PrivateChannel('notif.' . $this->requestData['user_id'])];
    }
}
