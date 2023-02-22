<?php

namespace App\Jobs;

use Carbon\Carbon;
use App\Mail\Sendmail;
use Illuminate\Support\Str;
use Illuminate\Bus\Queueable;
use App\Models\UserPasswordRest;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class SendEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    protected $email;
    public function __construct($email)
    {
        $this->email = $email;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // Generate Token
        $token = Str::random(60);

        // Saving Data to Password Reset Table
        UserPasswordRest::create([
            'email' => $this->email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);

        // Sending EMail with Password Reset View
        Mail::to($this->email)->send(new Sendmail($token));
    }
}
