@extends('layout.app')
@section('content')

    <link rel="stylesheet" href="/pages/vendedores/perfil/perfil.css">
    <script src="/pages/vendedores/perfil/perfil.js"></script>

    <section class="boxSideBar" id="infoVendedor">
        <div class="boxVendedor">
            <img src="/images/vendedor.png" alt="">
        </div>

        <span class="nome">Carregando...</span>
        <span class="email">Carregando...</span>
        
        <hr>
        
        <span>Comissão Acumulada</span>
        <span class="saldoComissao">R$ 0,00</span>
    </section>

    <section class="boxContent">
        <h1>Histórico de Vendas</h1>

        <table id="tblVendas" class="flexTableList">
            <thead>
                <tr>
                    <td>Data</td>
                    <td>Valor</td>
                    <td>Comissão</td>
                    <td style="width: 100%"></td>
                </tr>
            </thead>
            <tbody></tbody>
        </table>

        <div class="boxButtons right">
            <a href="/" class="btn alternative" onclick="FlexLoader.show()">
                Voltar
            </a>
            <button onclick="PageVendedor.showModalNovaVenda(event)">
                Lançar Venda
            </button>
        </div>
    </section>

    <div class="hidden">
        <div class="modalNovaVenda">
            <form onsubmit="PageVendedor.lancarVenda(event)">

                <input type="text" class="hidden" name="id_vendedor" />

                <div class="labeledInput">
                    <label>Valor da Venda</label>
                    <input type="text" name="valor" required>
                </div>

                <button type="submit">
                    Lançar
                </button>
            </form>
        </div>
    </div>

@endsection

