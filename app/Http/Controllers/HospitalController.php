<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class HospitalController extends Controller
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
    public function stats()
    {
        return view('layouts.stats');
    }
    public function index()
    {
        return view('layouts.data_mapping');
    }
    public function data_hospital()
    {
        return view('hospital_main');
    }
    public function new_hospital()
    {
        return view('h_new');
    }
    public function update_hospital()
    {
        return view('h_update');
    }
}
