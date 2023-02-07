<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Admin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function register(Request $request)
    {
        //Validate inputs
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed',



        ]);
        if ($validator->fails()) {
            return response($validator->messages());
        } else {
            if (Admin::where('email', $request->email)->first()) {
                return response([
                    'message' => 'Email already exists',
                    'status' => 'failed'
                ], 400);
            }
            $admin = Admin::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
        }



        if ($admin) {
            return response()->json([$admin, 'status' => 'success'], 200);
        } else {
            return response()->json([$admin, 'status' => 'failed'], 424);
        }
    }


    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);
        if (!$token = auth()->guard('admin-api')->attempt($credentials)) {
            return response()->json(['result' => 'wrong email or password.'], 424);
        }
        return response()->json(['result' => $token], 200);
    }
    public function me()
    {
        return response()->json(auth()->guard('admin-api')->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->guard('admin-api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
