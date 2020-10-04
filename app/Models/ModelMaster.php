<?php
namespace App\Models;

use Illuminate\Support\Facades\DB;

class ModelMaster
{
    const TABLE_NAME = 'table_name';

    public static function insert($args) {
        return DB::table(static::TABLE_NAME)->insertGetId($args);
    }

    public static function find($id)
    {
        return DB::table(static::TABLE_NAME)->find($id);
    }

    public static function all()
    {
        return DB::table(static::TABLE_NAME)->get();
    }

    public static function get($args)
    {
        return DB::table(static::TABLE_NAME)->where($args)->get();
    }
}

