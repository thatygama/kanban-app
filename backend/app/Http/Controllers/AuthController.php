<?php

namespace App\Http\Controllers;

use App\Models\{
    User,
    Token
};
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->only(['name', 'email', 'password', 'password_confirmation']);
        $data = array_map('trim', $data);

        $validatedData = validator($data, [
            'name' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ])->validate();

        if ($validatedData['password'] !== $data['password_confirmation']) {
            return response()->json(['error' => true, 'message' => 'As senhas informadas não são iguais!'], 401);
        }

        $validatedData['password'] = bcrypt($validatedData['password']);

        $existsUser = User::where('email', $validatedData['email'])->first();
        if ($existsUser) {
            return response()->json(['error' => true, 'message' => 'Email já cadastrado!'], 401);
        }

        $user = User::create($validatedData);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user', 'token'), 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => true, 'message' => 'Credenciais inválidas!'], 401);
        }

        $user = auth()->user();

        Token::create([
            'user_id' => $user->id,
            'token' => $token,
            'expires_at' => Carbon::now()->addHours(10),
        ]);

        return response()->json(compact('token'));
    }

    public function logout()
    {
        try {
            $token = JWTAuth::getToken();

            Token::where('token', $token)->update([
                'expires_at' => Carbon::now()
            ]);

            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json(['message' => 'Usuário deslogado com sucesso!']);
        } catch (JWTException $e) {
            return response()->json(['error' => true, 'message' => 'Falha ao invalidar o token!'], 500);
        }
    }

    public function validateToken(Request $request)
    {
        $token = JWTAuth::getToken();
        $storedToken = Token::where('token', $token)->first();

        if (!$storedToken || $storedToken->expires_at < Carbon::now()) {
            return response()->json(['error' => true, 'message' => 'Token inválido ou expirado!'], 401);
        }

        return response()->json(['message' => 'Token válido']);
    }
}
