<?php

namespace App\Http\Controllers;

use App\Models\Status;
use Illuminate\Support\Facades\Auth;

class StatusController extends Controller
{
    public function index()
    {
        $userId = Auth::id();
        if (!$userId) {
            return response()->json(['error' => true, 'message' => 'Usuário não autenticado'], 401);
        }

        $statuses = Status::select('id', 'name')->get();
        return response()->json(['data' => $statuses, 'message' => 'Status consultados com sucesso!']);
    }
}
