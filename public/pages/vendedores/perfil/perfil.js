document.addEventListener("DOMContentLoaded", () =>
{
    VMasker(document.querySelector("input[name='valor']")).maskMoney({
        precision: 2,
        separator: ',',
        delimiter: '.',
    });

    PageVendedor.carregarVendas();
});

var PageVendedor = class
{
    static showModalNovaVenda()
    {
        FlexModal.show({
            title: "Lançar Venda",
            target: ".modalNovaVenda",
        });
    }

    static carregarVendas()
    {
        FlexLoader.show("Atualizando informações...");
        
        let idVendedor = window.location.href.split('/').pop();
        let inputIdVendedor = document.querySelector("input[name='id_vendedor']");
        inputIdVendedor.value = idVendedor;

        fetch("/api/vendedor/"+ idVendedor +"/vendas")
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            PageVendedor.mostrarInfoVendedor(response);
            PageVendedor.mostrarVendas(response.vendas);
        }).catch((error) => {

            FlexModal.show({
                theme: 'error',
                title: App.tituloErro,
                content: App.msgErro,
            });
            throw error;

        }).finally(() => {
            FlexLoader.hide();
        });
    }

    static mostrarInfoVendedor(vendedor)
    {
        let boxSideBar = document.querySelector(".boxSideBar");
        boxSideBar.querySelector(".nome").innerHTML = vendedor.nome;
        boxSideBar.querySelector(".email").innerHTML = vendedor.email;
        boxSideBar.querySelector(".saldoComissao").innerHTML = App.moneyFormatter.format(vendedor.saldo_comissao);;
    }

    static mostrarVendas(vendas)
    {
        let tblVendas = document.querySelector("#tblVendas");
        tblVendas.querySelector("tbody").innerHTML = "";

        for(let venda of vendas) {

            let tr = document.createElement("tr");
            
            let tdData = document.createElement("td");
            tdData.dataset.label = "Data: ";
            tdData.innerHTML = App.dateFormat('d/m/Y H:i:s', venda.data) ;

            let tdValor = document.createElement("td");
            tdValor.dataset.label = "Valor: ";
            tdValor.innerHTML = App.moneyFormatter.format(venda.valor);

            let tdComissao = document.createElement("td");
            tdComissao.dataset.label = "Comissão: ";
            tdComissao.innerHTML = App.moneyFormatter.format(venda.comissao);

            let tdVoid = document.createElement("td");

            tr.appendChild(tdData);
            tr.appendChild(tdValor);
            tr.appendChild(tdComissao);
            tr.appendChild(tdVoid);

            tblVendas.querySelector("tbody").appendChild(tr);
        }
    }

    static lancarVenda(event)
    {
        event.preventDefault();
        let form = new FormData(event.target);

        FlexLoader.show("Lançando Venda...");

        fetch("/api/venda/lancar", {
            method: "POST",
            body: form
        })
        .catch((error) => {

            FlexModal.show({
                theme: 'error',
                title: App.tituloErro,
                content: App.msgErro,
            });
            throw error;
        })
        .finally(() => {
            PageVendedor.refresh();
        });
    }

    static clearModals()
    {
        let inputModals = document.querySelectorAll(".modalNovaVenda input:not([name='id_vendedor'])");
        for(let input of inputModals) { console.log(input); input.value = ""; }
    }

    static refresh()
    {
        PageVendedor.clearModals();
        FlexModal.closeAll();
        FlexLoader.hide();
        PageVendedor.carregarVendas();
    }
};