<?php
namespace App\Models;

use Illuminate\Support\Facades\DB;

class Vendedor extends ModelMaster
{
    const TABLE_NAME = 'vendedor';

    public static function insert($args)
    {
        $params = [];

        if(! empty($args['nome'])) $params['nome'] = $args['nome'];
        if(! empty($args['email'])) $params['email'] = $args['email'];

        return parent::insert($params);
    }

    public static function addComissao($idVendedor, $valor)
    {
        $vendedor = DB::table(static::TABLE_NAME)->find($idVendedor);

        if(! $vendedor) return false;
        if(! is_numeric($valor)) return false;

        $valor = (float) $valor;
        $novoValorComissao = $vendedor->saldo_comissao + $valor;
        
        return DB::table(static::TABLE_NAME)
            ->where('id', $vendedor->id)
            ->update(['saldo_comissao' => $novoValorComissao]);
    }
}

