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

var esri = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
        attribution:'Tiles © Esri'
    }
);

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
var umkmLayer;

Promise.all([
    fetch("data/batas_desa.geojson").then(r => r.json()),
    fetch("data/UMKM_Geojson.geojson").then(r => r.json())
]).then(([batasData, umkmData]) => {

    // ======================
    // BATAS DESA
    // ======================
    batasLayer = L.geoJSON(batasData, {
        style: styleBatas
    }).addTo(map);

    map.fitBounds(batasLayer.getBounds());

    // ======================
    // UMKM
    // ======================
    umkmLayer = L.geoJSON(umkmData, {

        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng,{
                radius:7,
                fillColor:"red",
                color:"white",
                weight:2,
                fillOpacity:1
            });
        },

        onEachFeature:function(feature, layer){

            var p = feature.properties;

            layer.bindPopup(`
                <center>
                    <img src="${p.Foto}" width="220"><br><br>
                    <b>${p["Nama Usaha"]}</b><br>
                    Pemilik : ${p.Pemilik}<br><br>
                    ${p.Deskripsi}
                </center>
            `);

        }

    }).addTo(map);

    // ======================
    // LAYER CONTROL
    // ======================

    var baseMaps = {
        "OpenStreetMap": osm,
        "Citra Satelit": esri
    };

    var overlayMaps = {
        "Batas Desa": batasLayer,
        "UMKM": umkmLayer
    };

    L.control.layers(baseMaps, overlayMaps).addTo(map);

});
