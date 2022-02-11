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

Route::get('/', function () {
    return view('welcome');
});
Route::get('/map', function () {
    return view('home');
});

Auth::routes();


Route::get('/home', [App\Http\Controllers\HospitalController::class, 'index'])->name('home');
Route::get('/stats', [App\Http\Controllers\HospitalController::class, 'stats'])->name('stats');
Route::get('/hospital', [App\Http\Controllers\HospitalController::class, 'data_hospital'])->name('hospital');
Route::get('/new/hospital', [App\Http\Controllers\HospitalController::class, 'new_hospital'])->name('new_hospital');
Route::get('/update/hospital', [App\Http\Controllers\HospitalController::class, 'update_hospital'])->name('update_hospital');

Route::get('/quarantine', [App\Http\Controllers\QuarantineController::class, 'index'])->name('quarantine');
Route::get('/new/quarantine', [App\Http\Controllers\QuarantineController::class, 'new_quarantine'])->name('new_quarantine');
Route::get('/update/quarantine', [App\Http\Controllers\QuarantineController::class, 'update_quarantine'])->name('update_quarantine');

Route::get('/testing', [App\Http\Controllers\TestingController::class, 'index'])->name('testing');
Route::get('/new/testing', [App\Http\Controllers\TestingController::class, 'new_testing'])->name('new_testing');
Route::get('/update/testing', [App\Http\Controllers\TestingController::class, 'update_testing'])->name('update_testing');
