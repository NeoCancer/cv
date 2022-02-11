var  firebaseConfig = {
              apiKey: "AIzaSyCmW6-mhuYpZ71In_A-z-fwDUGINL7VupY",
              authDomain: "covtract.firebaseapp.com",
              databaseURL: "https://covtract-default-rtdb.asia-southeast1.firebasedatabase.app/",
              projectId: "covtract",
              storageBucket: "covtract.appspot.com",
              messagingSenderId: "432111250138",
              appId: "1:432111250138:web:88e7e5aacfd69bdeccd3e3",
              measurementId: "G-X1LL38CW54"
        };
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var lastIndex = 0;
  
   firebase.database().ref('hospitals/').on('value', function (snapshot) {
        var value = snapshot.val();
        
       
        var htmls = [];
        $.each(value, function (index, value) {
            if (value) {
                htmls.push('<tr>\
                <td>' + value.h_name + '</td>\
                <td>' + value.h_addr + '</td>\
                <td>' + value.h_email +"<br/>  "+ value.h_contact + '</td>\
                <td align="center">' + value.h_capacity + '</td>\
                <td> Lon:' + value.h_lon+"<br/> Lat:"+ value.h_lat + '</td>\
                <td align="center"><a href="/update/hospital?id=' + index + '&update=hospital"><button class="btn btn-info" data-id="' + index + '">Update</button></a>\
                <button data-toggle="modal" data-target="#remove-modal" class="btn btn-danger removeData" data-id="' + index + '">Delete</button></td>\
            </tr>');
            }
            lastIndex = index;
        });
        $('.sample').html("refresh "+ lastIndex );
        $('#table_pagination').DataTable();
        $('#table_pagination').DataTable().destroy();
        $('#hopital_data').empty();
        $('#hopital_data').html(htmls);
    
        $('#table_pagination').DataTable();
        $('#submitUser').removeClass('desabled');
    });

    // Remove Data
    $("body").on('click', '.removeData', function (e) {
        e.preventDefault();
        var id = $(this).attr('data-id');
        $('body').find('.hospital-remove-record-model').append('<input name="id" type="hidden" value="' + id + '">');
    });

    $('.deleteRecord').on('click', function (e) {
        e.preventDefault();
        var values = $(".hospital-remove-record-model").serializeArray();
        var id = values[0].value;
        firebase.database().ref('hospitals/' + id).remove();
        $('body').find('.hospital-remove-record-model').find("input").remove();
        $("#remove-modal").modal('hide');
       
    });

    $('.remove-data-from-delete-form').click(function (e) {
        e.preventDefault();
        $('body').find('.hospital-remove-record-model').find("input").remove();
    });
