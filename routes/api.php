<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VendedorController;
use App\Http\Controllers\VendaController;

Route::post('/vendedor/cadastrar', [VendedorController::class, 'cadastrar']);
Route::post('/venda/lancar', [VendaController::class, 'lancar']);

Route::get('/vendedor/todos', [VendedorController::class, 'todos']);
Route::get('/vendedor/{idVendedor}/vendas', [VendedorController::class, 'consultarVendas']);

Route::post('/venda/relatorio-diario-via-email', [VendaController::class, 'relatorioDiarioViaEmail']);