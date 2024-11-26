<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AddInertiaHeaders
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        if ($request->header('X-Inertia')) {
            $response->header('X-Inertia', 'true');
            $response->header('Vary', 'Accept');
            $response->headers->add(['Vary' => 'X-Inertia']);

            // Ensure proper content type for Inertia responses
            if (!$response->headers->has('Content-Type')) {
                $response->header('Content-Type', 'application/json');
            }
        }

        return $response;
    }
}
