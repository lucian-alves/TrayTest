<?php
namespace App\Helpers\Mail;

class Mailer
{
    static function send($args)
    {
        if(empty($args['to'])) return false;
        if(! isset($args['message'])) return false;
        if(! isset($args['subject'])) $args['subject'] = '';

        mail($args['to'], $args['subject'], $args['message']);

        return true;
    }
}