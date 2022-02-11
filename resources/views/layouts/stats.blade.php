@extends('layouts.dash')

@section('content')

<div class="row justify-content-center">
        <div class="col-lg-9">
            <div class="card">
            <canvas id="canvas" height="280" width="600"></canvas>
         </div>
     </div>
     <div class="col-sm-3">
        <div class="justify-content-center">
            <div class="card" >
                <canvas id="canvas1" height="200" width="400"></canvas>
             </div>
         </div> 
         <div class="justify-content-center">
            <div class="card">
                <canvas id="canvas2" height="200" width="400"></canvas>
             </div>
        </div>
     </div>
      <div class="col-lg-9">
            <div class="card">
            <canvas id="canvas3" height="280" width="600"></canvas>
         </div>
     </div>
      <div class="col-sm-3">
        
     </div> 

</div>
               <!-- /.container-fluid -->
            </section>
            <!-- /.content -->
         </div>
         <!-- /.content-wrapper -->
      </div>
      <!-- jQuery -->
   <script src="https://www.gstatic.com/firebasejs/7.15.0/firebase.js"></script>
   <script src="https://unpkg.com/@esri/arcgis-rest-request@3.0.0/dist/umd/request.umd.js"></script>
   <script src="https://unpkg.com/@esri/arcgis-rest-geocoding@3.0.0/dist/umd/geocoding.umd.js"></script>
   <script src="https://unpkg.com/@esri/arcgis-rest-auth@3.0.0/dist/umd/auth.umd.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"></script>
   <script src="{{ url('asset/jquery/jquery.min.js') }}" ></script>
   <script src="{{ url('asset/js/adminlte.js') }}" ></script>
   <script src="{{ url('asset/js/chart.js') }}" ></script>
   <script src="{{ url('js/stats.js') }}" ></script>
@endsection