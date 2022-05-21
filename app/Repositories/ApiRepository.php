<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ApiRepository
{
    public static function processRequestApi(Request $request, $url = '', $id = null)
    {
        Log::info($url);
        $response = Http::{$request->method()}($url);
        if ($response->failed()
            || $response->clientError()
            || $response->serverError()) {
                Log::error("fallo");
                return response($response->json(), $response->getStatusCode());
            }
        return $response->json();
    }
}
