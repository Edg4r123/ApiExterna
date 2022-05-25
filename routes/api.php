<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resources([
    'users' => 'UserController',
    'posts' => 'PostController',
    'albums' => 'AlbumsController',
    'logs' => 'LogController'
]);

Route::resource('users.posts', 'PostController')->shallow();
Route::resource('posts.comments', 'CommentController')->shallow();
Route::resource('users.albums', 'AlbumController')->shallow();
Route::resource('albums.photos', 'PhotoController')->shallow();
