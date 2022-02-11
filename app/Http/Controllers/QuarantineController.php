<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QuarantineController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('q.quarantine_main');
    }
    public function new_quarantine()
    {
        return view('q.q_new');
    }

    public function update_quarantine()
    {
        return view('q.q_update');
    }
}
