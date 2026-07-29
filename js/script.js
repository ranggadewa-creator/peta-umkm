// ===============================
// MEMBUAT PETA
// ===============================

var map = L.map('map');


// ===============================
// BASEMAP
// ===============================

var osm = L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
    attribution:'© OpenStreetMap'
});

var satellite = L.tileLayer(
'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
{
    attribution:'Esri'
});

osm.addTo(map);


// ===============================
// STYLE BATAS DESA
// ===============================

function styleBatas(feature){

    return{
        color:'green',
        weight:3,
        fill:false
    };

}


// ===============================
// LOAD BATAS DESA
// ===============================

var batasLayer;

fetch("data/batas_desa.geojson")
.then(response=>response.json())
.then(function(data){

    batasLayer=L.geoJSON(data,{
        style:styleBatas
    }).addTo(map);

    map.fitBounds(batasLayer.getBounds());

});

// ===============================
// LOAD DATA UMKM
// ===============================

var umkmLayer;

fetch("data/UMKM_Geojson.geojson")
.then(response => response.json())
.then(function(data){

    umkmLayer = L.geoJSON(data,{

        pointToLayer:function(feature,latlng){

            return L.circleMarker(latlng,{
                radius:7,
                fillColor:"red",
                color:"white",
                weight:2,
                fillOpacity:1
            });

        },

        onEachFeature:function(feature,layer){

            var p = feature.properties;

            layer.bindPopup(
                `
                <center>

                <img src="${p.Foto}" width="220"><br><br>

                <b>${p["Nama Usaha"]}</b><br>

                Pemilik : ${p.Pemilik}<br><br>

                ${p.Deskripsi}

                </center>
                `
            );

        }

    }).addTo(map);

});
