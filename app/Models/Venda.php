<?php
namespace App\Models;

use Illuminate\Support\Facades\DB;

class Venda extends ModelMaster
{
    const TABLE_NAME = 'venda';

    public static function insert($args)
    {
        $args['comissao'] = static::calcularComissao($args['valor']);
        return parent::insert($args);
    }

    public static function calcularComissao($valor)
    {
        $calculado = $valor * (8.5 / 100);
        return round($calculado, 2);
    }

    public static function relatorioHoje()
    {
        $query = DB::table(static::TABLE_NAME);

        $query->select(
            'venda.id',
            'vendedor.id AS vendedor_id',
            'vendedor.nome',
            'vendedor.email',
            'venda.comissao',
            'venda.valor',
            'venda.data',
        );

        $query->join('vendedor', 'vendedor.id', '=', 'venda.id_vendedor');

        $query->where([
            ['data', '>=', date('Y-m-d') . ' 00:00:00'],
            ['data', '<=', date('Y-m-d') . ' 23:59:59'],
        ]);

        return $query->get();
    }
}

