var renderMap = (lg, lt)=>{
    var latlong = new tt.LngLat(lg, lt);
    var map = tt.map({
        key: 'PGoU54kuG7mGC31MVAf6gG2m9iNT1B1C',
        container: 'map',
        dragPan: !isMobileOrTablet(),
        center: latlong,
        zoom: 18
    });
    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());
}

//captura latitudeitude e longitudeitude do usuário
//e renderiza o mapa
var longitude = 0;
var latitude = 0;
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((posic)=>{
        longitude = posic.coords.longitude;
        latitude = posic.coords.latitude;
        renderMap(longitude, latitude);
    });
}