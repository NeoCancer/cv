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
                  document.getElementById('q_addr').value = result.address.LongLabel;
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
    var lastIndex = 0;
    firebase.database().ref('quarantines/').orderByKey().limitToLast(1).on('value', function (snapshot) {
        var value = snapshot.val();
        $.each(value, function (index, value) {
                
            lastIndex = parseInt(index) + 1;
            alert(lastIndex);
        });
    });

    $('#submitQuarantine').on('click', function (e) {
        e.preventDefault();
        var values = $("#addQuarantine").serializeArray();
  
        var q_name = values[0].value;
        var q_addr = values[1].value;
        var q_contact = values[2].value;
        var q_email = values[3].value;
        var q_capacity = values[4].value;
        var q_lon = values[5].value;
        var q_lat = values[6].value;
        var QuarantineID = lastIndex + 1;

       

        firebase.database().ref('quarantines/' + QuarantineID).set({
            q_name: q_name,
            q_addr: q_addr,
            q_contact: parseInt(q_contact),
            q_email: q_email,
            q_capacity: q_capacity,
            q_lon: parseFloat(q_lon),
            q_lat: parseFloat(q_lat),
        });

        // Reassign lastID value
        lastIndex = QuarantineID;
        $("#addQuarantine input").val("");
        window.location.href = '/quarantine';

    });