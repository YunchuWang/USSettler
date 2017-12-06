function myMap() {
    var locationA = { lat: 35.901353, lng: -78.9594240 };
    var curimage = 'https://www.manchesterdigital.com/sites/default/files/icon-rectangle-with-spacing.png';
    var map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 12,
        center: locationA
    });
    var marker1 = new google.maps.Marker({
        position: locationA,
        map: map
    });
    
    var AString = 'LOCATION A';

    var awindow = new google.maps.InfoWindow({
        content: AString
    });
    marker1.addListener('click', function () {
        awindow.open(map, marker1);
    });
}