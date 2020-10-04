## TrayTest
- Desenvolvido com Laravel 8 e MariaDB 10.4.14;
- Execute o script 'traytest.sql' (encontrado na pasta raíz) para criar o banco de dados;
- O envio de e-mails foi configurado via sendmail incluso no Xampp;
- Não consegui automatizar o envio diário do e-mail, mas criei uma rota que pode ser utilizada para visualizar/enviar o relatório de vendas do dia: '/api/venda/relatorio-diario-via-email';
