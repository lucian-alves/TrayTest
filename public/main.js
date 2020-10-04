var App = class
{
    static tituloErro = "Algo de errado não está certo.";
    static msgErro = "Parece que houve um erro ao enviar sua solicitação. Por favor, tente novamente mais tarde.";
    static moneyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    static dateFormat(format, date)
    {
        if(! date) date = new Date();
        if(typeof date === 'string') date = new Date(date);
        if(! date) throw 'The date is invalid';

        let d = String(date.getDate()).padStart(2, '0');
        let m = String(date.getMonth() + 1).padStart(2, '0');
        let Y = String(date.getFullYear()).padStart(4, '0');
    
        let H = String(date.getHours()).padStart(2, '0');
        let i = String(date.getMinutes()).padStart(2, '0');
        let s = String(date.getSeconds()).padStart(2, '0');
    
        format = format.replace(/d/g, d);
        format = format.replace(/m/g, m);
        format = format.replace(/Y/g, Y);
        format = format.replace(/H/g, H);
        format = format.replace(/i/g, i);
        format = format.replace(/s/g, s);
    
        return format;
    }
};