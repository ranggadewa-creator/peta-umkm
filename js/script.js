// ======================================
// WEBGIS UMKM DESA TANJUNG NIARA
// ======================================

// -------------------------
// Membuat peta
// -------------------------

var map = L.map("map", {
    zoomControl: true
});

// -------------------------
// Basemap OpenStreetMap
// -------------------------

var osm = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 22
    }
);

// -------------------------
// Basemap Citra Satelit Esri
// -------------------------

var satellite = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
        attribution: "Tiles &copy; Esri",
        maxZoom: 22
    }
);

// Basemap awal
osm.addTo(map);

// Variabel layer
var batasLayer;
var umkmLayer;

// ======================================
// STYLE BATAS DESA
// ======================================

function styleBatas() {
    return {
        color: "#00aa00",
        weight: 3,
        fillColor: "#00ff00",
        fillOpacity: 0.10
    };
}

// ======================================
// MEMUAT DATA
// ======================================

Promise.all([
    fetch("data/batas_desa.geojson").then(res => res.json()),
    fetch("data/UMKM_Geojson.geojson").then(res => res.json())
])

.then(([batasData, umkmData]) => {

    // ===============================
    // BATAS DESA
    // ===============================

    batasLayer = L.geoJSON(batasData, {
        style: styleBatas
    });

    batasLayer.addTo(map);

    map.fitBounds(batasLayer.getBounds());

    // ===============================
    // UMKM
    // ===============================

    umkmLayer = L.geoJSON(umkmData, {

        pointToLayer: function(feature, latlng){

            return L.circleMarker(latlng,{
                radius:7,
                fillColor:"#ff0000",
                color:"#ffffff",
                weight:2,
                fillOpacity:1
            });

        },

        onEachFeature:function(feature,layer){

            let p = feature.properties;

            layer.bindPopup(`
                <center>
                    <img src="${p.Foto}" width="220"><br><br>
                    <b>${p["Nama Usaha"]}</b><br><br>
                    <b>Pemilik :</b> ${p.Pemilik}<br><br>
                    ${p.Deskripsi}
                </center>
            `);

        }

    });

    umkmLayer.addTo(map);

});
