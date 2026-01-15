const map = L.map('map',{
  zoomSnap: 0.5,	
  maxZoom:16,
	minZoom:10,
	zoomSnap:1,
  zoomControl:false});

map.setView([50, 20.65], 10);

//Extend ZoomBar - Adbutton "Start map"
L.Control.MyZoomBar = L.Control.Zoom.extend({
	onAdd: function(map) {
				const container = L.Control.Zoom.prototype.onAdd.call(this, map);
				// Dodaj nowy przycisk
				const startMap = L.DomUtil.create('a', 'leaflet-control-zoom-bar', container);
				startMap.innerHTML = '<img src="css/images/home.png" style="margin-top:2px">';
				startMap.href = '#';
				startMap.title = 'Mapa startowa';
				L.DomEvent.on(startMap, 'click', this._zoomToStart, this);
				container.prepend(startMap);
				return container;
			},
	_zoomToStart: function(e) {
        L.DomEvent.stopPropagation(e);
        L.DomEvent.preventDefault(e);
        map.setView([50, 20.65], 10);
    }
});
	
map.addControl(new L.Control.MyZoomBar());
L.control.scale({imperial:false}).addTo(map);


const openStreet=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
const beztla = L.tileLayer('',{maxZoom: 18});

const baseMaps = {
	'OpenStreet': openStreet,
 	'Brak': beztla};

  const layerControl = L.control.layers(baseMaps).addTo(map);

