<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    AuthController,
    StatusController,
    TaskController,
};

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('')
    ->controller(AuthController::class)
    ->middleware(['json.response'])
    ->group(
        function () {
            Route::post('/register', 'register');
            Route::post('/login', 'login');
            Route::post('/validate-token', 'validateToken');
            Route::post('/logout', 'logout')->middleware('jwt.auth');
        }
    );


Route::prefix('statuses')
    ->controller(StatusController::class)
    ->middleware(['jwt.auth', 'json.response'])
    ->group(
        function () {
            Route::get('/', 'index');
        }
    );

Route::prefix('tasks')
    ->controller(TaskController::class)
    ->middleware(['jwt.auth', 'json.response'])
    ->group(
        function () {
            Route::get('/', 'index');
            Route::get('/{id}', 'show');
            Route::post('/', 'store');
            Route::put('/{id}', 'update');
            Route::delete('/{id}', 'destroy');
        }
    );
