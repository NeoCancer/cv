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
mapboxgl.accessToken = 'pk.eyJ1Ijoic2V0aDE1MyIsImEiOiJja3R4NTgzd3cwZGYyMm5xaGUxc3VxYW95In0.shbWxVbmet5A96TlNVzBOQ';
const apiKey = "AAPK1da567acb2764009a071005d3f493cd1QAkJyWU_loGOkkvaVJm_MPiqMX-9mbKqWie8bKfI4qgLOZe8wT10sEaeDS5NLv8N";
const basemapEnum = "ArcGIS:DarkGray";
const marker = new mapboxgl.Marker();
const map = new mapboxgl.Map({
        container: 'map', // container id
        style: `https://basemaps-api.arcgis.com/arcgis/rest/services/styles/${basemapEnum}?type=style&token=${apiKey}`,
        center: [121.05354831199543, 14.495977031084877], // starting position
        zoom: 12 // starting zoom
    });
// for switch map
const baseUrl = "https://basemaps-api.arcgis.com/arcgis/rest/services/styles";
const url = (name) => `${baseUrl}/${name}?type=style&token=${apiKey}`;
const setBasemap = (name) => {
        map.setStyle(url(name));
    };setBasemap("ArcGIS:DarkGray");
    
// const basemapsSelectElement = document.querySelector("#basemaps");
// basemapsSelectElement.addEventListener("change", (e) => {
//      setBasemap(e.target.value);
//    });

   map.on('load', function(e) {
          map.resize();
          
    });

    map.on('click', (e) => {
          document.getElementById('lon').value = JSON.stringify(e.lngLat['lng']);
          document.getElementById('lat').value =  JSON.stringify(e.lngLat['lat']);


          const coords = e.lngLat.toArray();

         const authentication = new arcgisRest.ApiKey({
                 key: apiKey
               });

               arcgisRest.reverseGeocode(coords, {
                   authentication
                 })
                 .then((result) => {
                  const lngLat = [result.location.x, result.location.y];
                  document.getElementById('t_addr').value = result.address.LongLabel;
                  const label = `${result.address.LongLabel}<br>${JSON.stringify(e.lngLat['lat'])}, ${JSON.stringify(e.lngLat['lng'])}`;
                  new mapboxgl
                     .Popup()
                     .setLngLat(lngLat)
                     .setHTML(label)
                     .addTo(map);

                }).catch((error) => {
                alert("There was a problem using the reverse geocode service. See the console for details.");
                console.error(error);
        });
          
    });

    var updateID = 0;
    var database = firebase.database();
    
    $('.updateTesting').on('click', function (e) {
        e.preventDefault();
        var values = $(".testing-update-record-model").serializeArray();
        var postData = {
            t_name: values[0].value,
            t_addr: values[1].value,
            t_contact: parseInt(values[2].value),
            t_email: values[3].value,
            t_capacity: values[4].value,
            t_lon: parseFloat(values[5].value),
            t_lat: parseFloat(values[6].value),
        };

        var updates = {};
        updates['/testings/' + updateID] = postData;

        firebase.database().ref().update(updates);
        
        window.location.href = '/testing';
    });


let searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('update') && searchParams.get('update') == "testing" ) {

        var id_up_q = searchParams.get('id');
        updateID = id_up_q;
        firebase.database().ref('testings/' + id_up_q).on('value', function (snapshot) {
            
            const values = snapshot.val();
            console.log(values);

            var updateData = '\
            <div class="form-group">\
                <label for="t_name" class="col-md-12 col-form-label">Hospital Name</label>\
                <div class="col-md-12">\
                    <input id="t_name" type="text" class="form-control" name="t_name" value="' + values.t_name + '" required autofocus>\
                </div>\
            </div>\
            <div class="form-group">\
                <label for="t_addr" class="col-md-12 col-form-label">Hospital Address</label>\
                <div class="col-md-12">\
                    <input id="t_addr" type="text" class="form-control" name="t_addr" value="' + values.t_addr + '" required autofocus>\
                </div>\
            </div>\
            <div class="form-group">\
                <label for="t_e_contact" class="col-md-12 col-form-label">Hospital Contact</label>\
                <div class="col-md-12">\
                    <input id="t_e_contact" type="text" class="form-control" name="t_e_contact" value="' + values.t_contact + '" required autofocus>\
                </div>\
            </div>\
            <div class="form-group">\
                <label for="t_e_email" class="col-md-12 col-form-label">Hospital Email</label>\
                <div class="col-md-12">\
                    <input id="t_e_email" type="email" class="form-control" name="t_e_email" value="' + values.t_email + '" required autofocus>\
                </div>\
            </div>\
            <div class="form-group">\
                <label for="t_e_cap" class="col-md-12 col-form-label">Hospital Bed Capacity</label>\
                <div class="col-md-12">\
                    <input id="t_e_cap" type="number" class="form-control" name="t_e_cap" value="' + values.t_capacity + '" required autofocus>\
                </div>\
            </div>\
            <div class="form-group">\
                <label for="lon" class="col-md-12 col-form-label">Longitude</label>\
                <div class="col-md-12">\
                    <input id="lon" type="text" class="form-control" name="lon" value="' + values.t_lon + '" required autofocus>\
                </div>\
            </div>\
            <div class="form-group">\
                <label for="lat" class="col-md-12 col-form-label">Latitude</label>\
                <div class="col-md-12">\
                    <input id="lat" type="text" class="form-control" name="lat" value="' + values.t_lat + '" required autofocus>\
                </div>\
            </div>\
            ';

            const marker1 = new mapboxgl.Marker({ color: 'red' })
            .setLngLat([values.t_lon, values.t_lat])
            .addTo(map);
            map.flyTo({
                center: [
                values.t_lon,
                values.t_lat
                ],zoom: 15 ,
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });
             $('#updateBody').append(updateData);
        });

        

    }