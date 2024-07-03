<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function logout(Request $req)
    {
        auth()->logout();
        return redirect(route('login'));
    }

    // public function register(Request $req){
    //     $data = $req->validate([
    //         'username' => 'required|unique:users,username',
    //         'password' => 'required|min:8'
    //     ]);

    //     User::create($data);
    //     return back();
    // }

    public function login(Request $req)
    {
        $credentials = $req->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        if (auth()->attempt($credentials)) {
            $req->session()->regenerate();
            return redirect(route('dashboard'));
        }

        return back()->withErrors([
            'error' => 'Username or password is incorrect!',
        ]);
    }

    public function updateUsername(Request $req)
    {
        if (!auth()->check()) {
            return back()->withErrors([
                'username' => 'You are not logged in!',
            ]);
        }

        $data = $req->validate([
            'username' => 'required|unique:users,username',
        ]);

        User::find(auth()->user()->id)->update($data);

        $req->session()->regenerate();

        return back();
    }

    public function updatePassword(Request $req)
    {
        if (!auth()->check()) {
            return back()->withErrors([
                'username' => 'You are not logged in!',
            ]);
        }

        $data = $req->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8',
        ]);

        $username = auth()->user()->username;
        if (!auth()->attempt(['username' => $username, 'password' => $data['current_password']])) {
            return back()->withErrors([
                'current_password' => 'Current password is incorrect!',
            ]);
        }

        User::find(auth()->user()->id)->update([
            'password' => $data['new_password'],
        ]);

        $req->session()->regenerate();

        return back();
    }
}
