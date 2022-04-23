import React from "react";
import { Map } from "ol";
import Layer from "ol/layer/Layer";
import VectorSource from "ol/source/Vector";
import 'ol/ol.css';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import {fromLonLat, toLonLat} from 'ol/proj';
import {ZoomToExtent, defaults as defaultControls} from 'ol/control';
import { format } from "ol/coordinate";
import GeoJSON from 'ol/format/GeoJSON';
import VectorImageLayer from 'ol/layer/VectorImage';
import mapGeoJSONdata from "./map.geojson";


function App() {

React.useEffect(()=> {
  const map = new Map({
    controls: defaultControls().extend([
      new ZoomToExtent({
        extent: [7577458.802601964, 1716750.8097641077, 9021581.180584617, 2928042.4237656747,]
      }),
    ]),
    layers: [
      new TileLayer({source: new OSM()})
    ],
    view: new View({
      center: fromLonLat([77.79389109276235, 21.15863687034279]),
      zoom: 5
    }),
    target: 'map-container'
  });

  map.on('click', (e)=> {
    var lonlat  = toLonLat(e.coordinate);
    console.log(e.coordinate)
  })

  const GeoJSONlayer = new VectorImageLayer({
    source: new VectorSource({
      url: mapGeoJSONdata,
      format: new GeoJSON()
    }),
    visible: true,
    title: 'GeoJSONlayer'
  })

  map.addLayer(GeoJSONlayer)
},[])

  return (
    <div className="App">
      <div id="map-container" style={{width:"98vw", height:"96vh"}} ></div>
    </div>
  );
}

export default App;
