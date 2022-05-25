<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Logs;

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
                self::saveLog($request, $response);
                return response($response->json(), $response->getStatusCode());
            }
        self::saveLog($request, $response);
        return $response->json();
    }

    public static function saveLog(Request $request, $response)
    {
        $log = new Logs();
        $message = $request->method() . " " . $request->url() . " " . $response->getStatusCode();
        $log->message = $message;
        $log->save();
    }
}
