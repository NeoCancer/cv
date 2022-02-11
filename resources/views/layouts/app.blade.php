<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>Hospital-Resources-and-Room-Utilization-System</title>
   <!-- Font Awesome -->
   <link rel="stylesheet" href="{{url('asset/fontawesome/css/all.min.css')}}">
   <link rel="stylesheet" href="{{url('asset/css/adminlte.min.css')}}">
   <link rel="stylesheet" href="{{url('asset/tables/datatables-bs4/css/dataTables.bootstrap4.min.css')}}">
   <link rel="stylesheet" href="{{url('asset/css/style.css')}}">
    <script src="https://www.google.com/recaptcha/api.js?render=reCAPTCHA_6LdSJz8eAAAAAB_qVqfkbSRrt0v2l8csgYvJx2LD"></script>
</head>

<body class="hold-transition sidebar-mini layout-fixed">
   <div class="content">
      <nav class="navbar navbar-light" style="background-color: maroon;">
         <ul class="navbar-nav">
            <li class="nav-item" style="padding-left: 10px;">
               <a  href="#" style="color: white;"><h3>Covtrack</h3></a>
            </li>
         </ul>
      </nav>
      <div class="content" align="center">
         <section class="content" style="padding-top: 50px;" >
               <div class="container-fluid">
                @yield('content')
               </div>
         </section>
      </div>
   </div>
   <!-- jQuery -->
   <script src="../asset/jquery/jquery.min.js"></script>
   <script src="../asset/js/adminlte.js"></script>
 <script>
      function onClick(e) {
        e.preventDefault();
        grecaptcha.ready(function() {
          grecaptcha.execute('reCAPTCHA_site_key', {action: 'submit'}).then(function(token) {
              // Add your logic to submit to your backend server here.
          });
        });
      }
  </script>
</body>

</html>
