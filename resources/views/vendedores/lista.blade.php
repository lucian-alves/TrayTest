@extends('layout.app')
@section('content')

    <link rel="stylesheet" href="/pages/vendedores/lista/lista.css">
    <script src="/pages/vendedores/lista/lista.js"></script>

    <div class="boxInfo">
        Clique em um vendedor para gerenciar suas vendas ou crie um vendedor novo
    </div>

    <div class="boxVendedores"></div>

    <div class="hidden">
        <div class="modalNovoVendedor">
            <form onsubmit="PageListaVendedores.cadastrarVendedor(event)">
                <div class="labeledInput">
                    <label>Nome</label>
                    <input type="text" name="nome" maxlength="128" required>
                </div>
                
                <div class="labeledInput">
                    <label>E-mail</label>
                    <input type="email" name="email" maxlength="128" required>
                </div>

                <button type="submit">
                    Cadastrar
                </button>
            </form>
        </div>

        <a href="#" class="boxVendedor model" onclick="FlexLoader.show()">
            <img src="/images/vendedor.png" alt="">
            <span class="text"></span>
        </a>

        <button type="button" class="boxVendedor btnAddVendedor model" onclick="PageListaVendedores.showModalNovoVendedor()">
            <img src="/images/add.png" alt="">
            <span class="text">Adicionar um novo vendedor</span>
        </button>
    </div>

@endsection