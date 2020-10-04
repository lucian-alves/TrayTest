<?php
namespace App\Helpers;

class Formatter
{
    public static function numberAsIso($number)
    {
        $number = preg_replace("/[^0-9.,]/", "", $number);
        $number = str_replace(',', '.', $number);
        if (strpos($number, '.') === false) return $number;

        $numberExplode = explode('.', $number);

        $decimals = array_pop($numberExplode);
        $integers = implode('', $numberExplode);
        return "$integers.$decimals";
    }

    public static function dateFormat($strDate, $originalFormat, $targetFormat)
    {
        $date = \DateTime::createFromFormat($originalFormat, $strDate);
        if(!$date) return $strDate;
        return $date->format($targetFormat);
    }
};