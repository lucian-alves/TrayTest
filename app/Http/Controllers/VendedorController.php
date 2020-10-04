<?php
namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Models\Vendedor;
use App\Models\Venda;

class VendedorController extends BaseController
{
    public function cadastrar(Request $request)
    {
        $params = $request->all();
        $idVendedor = Vendedor::insert($params);
        $vendedor = Vendedor::find($idVendedor);

        return (array) $vendedor;
    }

    public function todos()
    {
        $vendedores = Vendedor::all();
        return $vendedores->toArray();
    }

    public function consultarVendas($idVendedor)
    {
        $vendedor = Vendedor::find($idVendedor);
        $vendas = Venda::get([ "id_vendedor" => $vendedor->id ]);
        $vendedor->vendas = $vendas->toArray();

        return (array) $vendedor;
    }
}
