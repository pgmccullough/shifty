<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/greeting', function () {
    // return view('patrick');
    $obj = new stdClass();
    $obj->ID = 198;
    $obj->username = "PGMcCullough";
    return $obj;
});

Route::get('/', function () {
    return view('welcome');
});
