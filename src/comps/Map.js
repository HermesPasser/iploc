import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useMap } from 'react-leaflet'

export default  function Map({coord, name}) {
    
    function ChangeMapView({ coords }) {
        const map = useMap();
        map.setView(coords, map.getZoom());
        return null;
    }
    
	return ( 
        <MapContainer center={coord} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={coord}>
                <Popup>{name}
                </Popup>
            </Marker>
            
            <ChangeMapView coords={coord} zoom={13} />
        </MapContainer>
	)
}
