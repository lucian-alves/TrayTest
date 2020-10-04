<?php
namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Models\Venda;
use App\Models\Vendedor;
use App\Helpers\Formatter;
use App\Helpers\Mail\Mailer;
use App\Helpers\Mail\Templates\RelatorioDiario;

class VendaController extends BaseController
{
    public function lancar(Request $request)
    {
        $params = $request->all();
        $params['valor'] = Formatter::numberAsIso($params['valor']);

        $idVenda = Venda::insert($params);
        $venda = Venda::find($idVenda);
        $vendedor = Vendedor::find($venda->id_vendedor);
        Vendedor::addComissao($vendedor->id, $venda->comissao);

        return [
            'id' => $venda->id,
            'nome' => $vendedor->nome,
            'email' => $vendedor->email,
            'comissao' => $venda->comissao,
            'valor' => $venda->valor,
            'data' => $venda->data,
        ];
    }

    public function relatorioDiarioViaEmail()
    {
        $hoje = date('d/m/Y');
        $vendas = Venda::relatorioHoje();
        $message = RelatorioDiario::html($hoje, $vendas);

        // Descomente a linha abaixo para apenas ver o conteúdo do e-mail sem enviá-lo
        echo $message; exit;

        Mailer::send([
            'to' => 'lucian.eumesmo@gmail.com',
            'subject' => "Relatório Diário de Vendas ($hoje)",
            'message' => $message,
        ]);

        return [
            'status' => 'ok',
            'message' => 'E-mail envado com sucesso!',
        ];
    }
}