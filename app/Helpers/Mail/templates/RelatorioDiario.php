<?php
namespace App\Helpers\Mail\Templates;

use App\Helpers\Formatter;

class RelatorioDiario
{
    public static function html($data, $vendas)
    {
        $tbodyContent = "";
        foreach($vendas as $venda) {

            $venda->comissao = number_format($venda->comissao, 2, ',', '.');
            $venda->data = Formatter::dateFormat($venda->data, 'Y-m-d H:i:s', 'd/m/Y H:i:s');
            $venda->valor = number_format($venda->valor, 2, ',', '.');

            $tbodyContent .= "
                <tr>
                    <td>$venda->id</td>
                    <td>$venda->nome</td>
                    <td>$venda->email</td>
                    <td>$venda->data</td>
                    <td>R$ $venda->valor</td>
                    <td>R$ $venda->comissao</td>
                </tr>
            ";
        }

        $template = "
            <style>
                * {
                    font-family: sans-serif;
                    color: #444;
                    text-align: center;
                }
                h1 {
                    font-size: 100%;
                    text-transform: uppercase;
                    margin-bottom: 20px;
                }
                table {
                    border-collapse: collapse;
                    font-size: 90%;
                    margin: auto;
                }
                table tr {
                    border-bottom: 1px solid rgba(0,0,0,0.2);
                    transition: 0.5s;
                }
                table th, table td {
                    padding: 10px 15px;
                }
                .mailContent {
                    padding: 20px;
                }
            </style>

            <div class='mailContent'>
                <h1>Relatório de vendas do dia $data</h1>

                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>NOME</td>
                            <td>E-MAIL</td>
                            <td>DATA</td>
                            <td>VALOR</td>
                            <td>COMISSÃO</td>
                        </tr>
                    </thead>
                    <tbody>
                        $tbodyContent
                    </tbody>
                </table>
            </div>
        ";

        return $template;
    }
}