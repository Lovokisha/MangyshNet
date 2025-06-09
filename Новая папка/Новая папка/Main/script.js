document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map');

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Загрузка и отображение GeoJSON с контуром области
    fetch('map.geojson')
        .then(response => response.json())
        .then(data => {
            var geoLayer = L.geoJSON(data, {
                style: {
                    color: '#2196F3',
                    weight: 3,
                    fillOpacity: 0.1
                }
            }).addTo(map);

            // Автоматически подгоняем камеру под границы контура
            map.fitBounds(geoLayer.getBounds());
        })
        .catch(err => {
            console.warn('GeoJSON not loaded:', err);
            // Если нет geojson, можно выставить дефолтный вид
            map.setView([44.5908, 50.0115], 8);
        });
});