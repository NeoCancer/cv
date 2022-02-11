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
const basemapEnum = "ArcGIS:Navigation";
var map = new mapboxgl.Map({
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
    var database = firebase.database();
    var places = {
            'type': 'FeatureCollection',
            'features': []
        };

    var filterGroup = document.getElementById('filter-group');
    filterGroup.innerHTML = '';

    
    firebase.database().ref().on('value', function (snapshot) {   
        var value = snapshot.val(); 

        $.each(value.hospitals, function (index, value) {
            if (value) {
                places.features.push(
                    {
                        'type': 'Feature',
                        'properties': {
                            'name': 'hospitals',
                            'description':
                    `<div align="center"><img src="../images/h.png" height=50px width=100px></div>
                      <table>
                       <tr align="center">
                        <strong>`+value.h_name+`</strong>
                      </tr>
                      <tr>
                        <td>address:</td><td>`+value.h_addr+`</td>
                      </tr>
                      <tr>
                        <td>Email:</td><td>`+value.h_email+`</td>
                      </tr>
                      <tr> 
                       <td>Contact:</td><td>`+value.h_contact+`</td>
                      </tr>
                      <tr> 
                       <td>Capacity:</td><td>`+value.h_capacity+`</td>
                      </tr>
                    </table>`
                         },
                         'geometry': {
                             'type': 'Point',
                             'coordinates': [value.h_lon,value.h_lat]
                         }
                    }        
                )
            }   
        });
        $.each(value.quarantines, function (index, value) {
            if (value) {
                places.features.push(
                    {
                        'type': 'Feature',
                        'properties': {
                            'name': 'quarantines',
                            'description':
                     `<div align="center"><img src="../images/h.png" height=50px width=100px></div>
                      <table>
                       <tr align="center">
                        <strong>`+value.q_name+`</strong>
                      </tr>
                      <tr>
                        <td>Address:</td><td>`+value.q_addr+`</td>
                      </tr>
                      <tr>
                        <td>Email:</td><td>`+value.q_email+`</td>
                      </tr>
                      <tr> 
                       <td>Contact:</td><td>`+value.q_contact+`</td>
                      </tr>
                      <tr> 
                       <td>Capacity:</td><td>`+value.q_capacity+`</td>
                      </tr>
                    </table>`
                         },
                         'geometry': {
                             'type': 'Point',
                             'coordinates': [value.q_lon,value.q_lat]
                         }
                    }        
                )
            }   
        });

        $.each(value.testings, function (index, value) {
            if (value) {
                places.features.push(
                    {
                        'type': 'Feature',
                        'properties': {
                            'name': 'testings',
                            'description':
                        `<div align="center"><img src="../images/q.jpg" height=50px width=100px></div>
                      <table>
                       <tr align="center">
                        <strong>`+value.t_name+`</strong>
                      </tr>
                      <tr>
                        <td>Address:</td><td>`+value.t_addr+`</td>
                      </tr>
                      <tr>
                        <td>Email:</td><td>`+value.t_email+`</td>
                      </tr>
                      <tr> 
                       <td>Contact:</td><td>`+value.t_contact+`</td>
                      </tr>
                      <tr> 
                       <td>Capacity:</td><td>`+value.t_capacity+`</td>
                      </tr>
                    </table>`
                         },
                         'geometry': {
                             'type': 'Point',
                             'coordinates': [value.t_lon,value.t_lat]
                         }
                    }        
                )
            }   
        });

        console.log(JSON.stringify(places)); 
        map.loadImage(
            '../images/hospital.png',
            (error, image) => {
                if (error) throw error;
                 
                // Add the image to the map style.
                map.addImage('hospital', image);
        });
        map.loadImage(
            '../images/quarantine1.png',
            (error, image) => {
                if (error) throw error;
                 
                // Add the image to the map style.
                map.addImage('quarantine', image);
        });
        map.loadImage(
            '../images/testing.png',
            (error, image) => {
                if (error) throw error;
                 
                // Add the image to the map style.
                map.addImage('testing', image);
        });

        map.addSource('facilities', {'type': 'geojson','data': places});

        for (const feature of places.features) {
            const symbol = feature.properties.name;
            const layerID = `${symbol}`;
             
            // Add a layer for this symbol type if it hasn't been added already.
            if (!map.getLayer(layerID)) {

                 if (layerID == "hospitals") {
                    map.addLayer({
                    'id': layerID,
                    'type': 'symbol',
                    'source': 'facilities', // reference the data source
                    'layout': {
                        'icon-image': 'hospital', // reference the image
                        'icon-size': 0.06,
                        'icon-allow-overlap': true
                    },
                    'filter': ['==', 'name', symbol]
                    });
                    var img = document.createElement('img');
                    img.src = '../images/hospital.png';
                 }
                 if (layerID == "quarantines") {
                    map.addLayer({
                    'id': layerID,
                    'type': 'symbol',
                    'source': 'facilities', // reference the data source
                    'layout': {
                        'icon-image': 'quarantine', // reference the image
                        'icon-size': 0.06,
                        'icon-allow-overlap': true
                    },
                    'filter': ['==', 'name', symbol]
                    });
                    var img = document.createElement('img');
                    img.src = '../images/quarantine1.png';
                 }
                 if (layerID == "testings") {
                    map.addLayer({
                    'id': layerID,
                    'type': 'symbol',
                    'source': 'facilities', // reference the data source
                    'layout': {
                        'icon-image': 'testing', // reference the image
                        'icon-size': 0.06,
                        'icon-allow-overlap': true
                    },
                    'filter': ['==', 'name', symbol]
                    });
                    var img = document.createElement('img');
                    img.src = '../images/testing.png';
                 }
                 
                 
                // Change the cursor to a pointer when the mouse is over the places layer.
                map.on('mouseenter', 'facilities', () => {
                map.getCanvas().style.cursor = 'pointer';
                });
                 
                // Change it back to a pointer when it leaves.
                map.on('mouseleave', 'facilities', () => {
                map.getCanvas().style.cursor = '';
                });
                // Add checkbox and label elements for the layer.
                const input = document.createElement('input');

                input.type = 'checkbox';
                input.id = layerID;
                input.checked = true;

                filterGroup.appendChild(input);
                 
                const label = document.createElement('label');
                
                img.style.width = "30px";
                img.style.height = "30px";
                label.setAttribute('for', layerID);
                label.style.cssText = "background-color:#800000;"
                label.textContent = symbol;
                label.appendChild(img);
                filterGroup.appendChild(label);
                 
                // When the checkbox changes, update the visibility of the layer.
                input.addEventListener('change', (e) => {
                    map.setLayoutProperty(
                    layerID,
                    'visibility',
                    e.target.checked ? 'visible' : 'none'
                    );
                    });
                }
            }

    });
};

setBasemap("ArcGIS:Navigation");
    


map.on('click', 'hospitals', (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    map.flyTo({
                center: [
                e.features[0].geometry.coordinates[0],
                e.features[0].geometry.coordinates[1]
                ],zoom: 15 ,
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });            
    new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(map);
});
map.on('click', 'testings', (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    map.flyTo({
                center: [
                e.features[0].geometry.coordinates[0],
                e.features[0].geometry.coordinates[1]
                ],zoom: 15 ,
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });            
    new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(map);
});
map.on('click', 'quarantines', (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    map.flyTo({
                center: [
                e.features[0].geometry.coordinates[0],
                e.features[0].geometry.coordinates[1]
                ],zoom: 15 ,
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
            }); 
                 
    new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(map);
});


 // map.on('load', function(e) {
 //        console.log(JSON.stringify(places));

          
 //    });