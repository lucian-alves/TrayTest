document.addEventListener("DOMContentLoaded", () => {
    PageListaVendedores.carregarVendedores();
});

var PageListaVendedores = class
{
    static carregarVendedores()
    {
        FlexLoader.show("Atualizando informações...");

        fetch("/api/vendedor/todos")
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            PageListaVendedores.mostrarVendedores(response);
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

    static mostrarVendedores(vendedores)
    {
        let boxVendedores = document.querySelector(".boxVendedores");
        boxVendedores.innerHTML = "";

        for(let vendedor of vendedores) {
            
            let boxVendedor = document.querySelector(".boxVendedor.model").cloneNode(true);
            boxVendedor.querySelector(".text").innerHTML = vendedor.nome;
            boxVendedor.href = "/vendedor/" + vendedor.id;

            boxVendedores.appendChild(boxVendedor);
        }

        let btnAddVendedor = document.querySelector(".btnAddVendedor.model").cloneNode(true);
        boxVendedores.appendChild(btnAddVendedor);
    }

    static showModalNovoVendedor()
    {
        FlexModal.show({
            title: "Novo Vendedor",
            target: ".modalNovoVendedor",
        });
    }

    static cadastrarVendedor(event)
    {
        event.preventDefault();
        let form = new FormData(event.target);

        FlexLoader.show("Cadastrando vendedor...");

        fetch("/api/vendedor/cadastrar", {
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
            PageListaVendedores.refresh();
        });
    }

    static clearModals()
    {
        let inputModals = document.querySelectorAll(".modalNovoVendedor input");
        for(let input of inputModals) { input.value = ""; }
    }

    static refresh()
    {
        PageListaVendedores.clearModals();
        FlexModal.closeAll();
        FlexLoader.hide();
        PageListaVendedores.carregarVendedores();
    }
};