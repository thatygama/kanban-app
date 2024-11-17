<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index()
    {
        $userId = Auth::id();
        if (!$userId) {
            return response()->json(['error' => true, 'message' => 'Usuário não autenticado'], 401);
        }

        $tasks = Task::where('user_id', $userId)->with('status:id,name')->get();
        return response()->json(['data' => $tasks, 'message' => 'Tarefas consultadas com sucesso!']);
    }

    public function store(Request $request)
    {
        $userId = Auth::id();
        if (!$userId) {
            return response()->json(['error' => true, 'message' => 'Usuário não autenticado'], 401);
        }

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'status_id' => 'required|exists:statuses,id',
            'due_date' => 'nullable|string',
        ]);

        $task = Task::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'status_id' => $data['status_id'],
            'due_date' => $data['due_date'],
            'user_id' => $userId,
        ]);

        return response()->json(['data' => $task, 'message' => 'Tarefa salva com sucesso!'], 201);
    }

    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        if ($task->user_id !== Auth::id()) {
            return response()->json(['error' => true, 'message' => 'Não autorizado!'], 403);
        }

        $task->update($request->only(['title', 'description', 'status_id', 'due_date']));
        return response()->json(['data' => $task, 'message' => 'Tarefa atualizada com sucesso!']);
    }

    public function show($id)
    {
        $userId = Auth::id();
        if (!$userId) {
            return response()->json(['error' => true, 'message' => 'Usuário não autenticado'], 401);
        }

        $task = Task::with('status:id,name')->where('user_id', $userId)->find($id);

        if (!$task) {
            return response()->json(['error' => true, 'message' => 'Tarefa não encontrada'], 404);
        }
        return response()->json(['message' => 'Tarefa encontrada']);
    }

    public function destroy($id)
    {
        $task = Task::findOrFail($id);

        if ($task->user_id !== Auth::id()) {
            return response()->json(['error' => true, 'message' => 'Não autorizado!'], 403);
        }

        $task->delete();
        return response()->json(['message' => 'Tarefa deletada com sucesso!']);
    }
}
