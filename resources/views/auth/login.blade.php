@extends('layouts.app')

@section('content')
<div class="container">
    <div class="login-box">
         <!-- /.login-logo -->
         <div class="card card-outline ">
            <div class="card-header">
               
               <img src="{{url('asset/img/covid.png')}}" alt="DSMS Logo" width="150">
               <h1>COVTRACT</h1>

               
            </div>
            <div class="card-body" >
               <form action="{{ route('login') }}" method="post">
                  @csrf
                  <div class="input-group mb-3">
                     <input id="email" type="email" placeholder="Email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                     <div class="input-group-append">
                        <div class="input-group-text">
                           <span class="fas fa-user"></span>
                        </div>
                     </div>
                      @error('email')
                        <span class="invalid-feedback" role="alert">
                           <strong>{{ $message }}</strong>
                        </span>
                     @enderror
                  </div>
                  <div class="input-group mb-3">
                     <input id="password" type="password" placeholder="Password"s class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">     
                     <div class="input-group-append">
                        <div class="input-group-text">
                           <span class="fas fa-lock"></span>
                        </div>
                     </div>
                      @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                  </div>
                  <div class="row">
                     <div class="col-6 offset-3" >
                        <button type="submit" class="btn btn-block btn-bg" style="background-color: maroon;color: white;">Login</button>
                        <button class="btn btn-block btn-bg" style="background-color: maroon;"><a href="{{ route('register') }}" style="color: white;">Register</a></button>
                     </div>
                  </div>
               </form>
            </div>
            <!-- /.card-body -->
         </div>
         <!-- /.card -->
      </div>
</div>
@endsection
