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
