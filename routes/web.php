<?php
use Illuminate\Support\Facades\Route;

Route::get('/', function () { return view('vendedores/lista'); });
Route::get('/vendedor/{id}', function () { return view('vendedores/perfil'); });
