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
