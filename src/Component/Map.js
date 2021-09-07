import L from 'leaflet';
import {MapContainer, TileLayer, Marker, Popup, GeoJSON} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import {sparql} from "d3-sparql";
import {useEffect, useState} from "react";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import axios from 'axios';
import React from "react";

const MapComponent = () => {

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    function Point(props) {
        const [marker, setMarker] = useState(undefined);
        const valeur = props.entity.Id_geonames;
        const query =
            `prefix gn: <http://www.geonames.org/ontology#>` +
            `prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>` +
            `prefix wgs84_pos: <http://www.w3.org/2003/01/geo/wgs84_pos#>` +
            `select ?name ?officialName ?latitude ?longitude ?altitude ?alternateName ?nameParentFeature ?nameParentCountry` +
            `where` +
            `{` +
            `  <https://sws.geonames.org/${valeur}/> gn:name ?name;` +
            ` wgs84_pos:lat ?latitude;` +
            ` wgs84_pos:long ?longitude;` +
            ` gn:featureCode ?type.` +
            `  OPTIONAL { <https://sws.geonames.org/${valeur}/> gn:officialName ?officialName}.` +
            `  OPTIONAL { <https://sws.geonames.org/${valeur}/> wgs84_pos:alt ?altitude}.` +
            `  OPTIONAL { <https://sws.geonames.org/${valeur}/> gn:alternateName ?alternateName}.` +
            `  OPTIONAL { <https://sws.geonames.org/${valeur}/> gn:parentCountry ?parentCountry.` +
            ` ?parentCountry gn:name ?nameParentCountry}.` +
            `   OPTIONAL { <https://sws.geonames.org/${valeur}/> gn:parentFeature ?parentFeature.` +
            `  ?parentFeature gn:name ?nameParentFeature}.` +
            `}`
        const url = 'http://localhost:8890/sparql'

        useEffect(() => {
            if (marker === undefined){
                sparql(url, query).then((data) => {
                    if (data.length > 0) {
                        let ent = {};
                        ent.latitude = data[0].latitude;
                        ent.longitude = data[0].longitude;
                        if (data[0].altitude !== undefined) {
                            ent.altitude = data[0].altitude;
                        }
                        if (data[0].nameParentCountry !== undefined) {
                            ent.parent_country = data[0].nameParentCountry;
                        }
                        if (data[0].alternateName !== undefined) {
                            ent.alternate_names = [];
                            for (let e of data) {
                                if (!ent.alternate_names.includes(e.alternateName)) {
                                    ent.alternate_names.push(e.alternateName);
                                }
                            }
                        }
                        if (data[0].nameParentFeature !== undefined) {
                            ent.parent_names = [];
                            for (let e of data) {
                                if (!ent.parent_names.includes(e.nameParentFeature)) {
                                    ent.parent_names.push(e.nameParentFeature);
                                }
                            }
                        }


                        ent.confidence_score = props.entity.confidence_score;
                        ent.wikipediaExternalRef = props.entity.wikipediaExternalRef;
                        ent.wikidataId = props.entity.wikidataId;
                        ent.text_location = props.entity.text_location;
                        ent.name = props.entity.rawName;
                        ent.Id_geonames = valeur;

                        setMarker(ent);
                    }
                });}
        }, [marker, query, valeur,props.entity]);


        return marker !== undefined ? props.shapes[marker.Id_geonames] === undefined ? <Marker position={[marker.latitude, marker.longitude]}>
            <Popup>
                <h3>{marker.name}</h3>
                <div><span className="font-weight-bold">Latitude</span>: {marker.latitude}</div>
                <div><span className="font-weight-bold">Longitude</span> : {marker.longitude}</div>
                {marker.altitude !== undefined ? <div><span className="font-weight-bold">Altitude</span> : {marker.altitude}</div> : null}
                {marker.alternate_names !== undefined ? <div><span className="font-weight-bold">Alternative names</span>: {marker.alternate_names.map(
                    e => <span>{e}, </span>
                )} </div> : null}
                {marker.parent_country !== undefined ? <div><span className="font-weight-bold">Country</span>: {marker.parent_country}</div> : null}
                {marker.parent_names !== undefined ? <div><span className="font-weight-bold">Parents</span>: {marker.parent_names.map(
                        e => <span>{e}, </span>)
                }</div> : null}
                <div><span className="font-weight-bold">Score</span>: {marker.confidence_score}</div>
                <div><a href={"https://" + props.lang + ".wikipedia.org/wiki?curid=" + marker.wikipediaExternalRef}
                       target="_blank" rel="noreferrer">Wikipedia</a></div>
            </Popup>
        </Marker> :<GeoJSON data = {props.shapes[marker.Id_geonames]}>
            <Popup>
                <h3>{marker.name}</h3>
                <ul>
                    <li>Latitude : {marker.latitude}</li>
                    <li>Longitude : {marker.longitude}</li>
                    {marker.altitude !== undefined ? <li>Altitude : {marker.altitude}</li> : null}
                    {marker.alternate_names !== undefined ? <li> Noms alternatifs : <ul> {marker.alternate_names.map(
                        e => <li>{e}</li>
                    )} </ul></li> : null}
                    {marker.parent_country !== undefined ? <li>Pays : {marker.parent_country}</li> : null}
                    {marker.parent_names !== undefined ? <li> Parents : <ul> {marker.parent_names.map(
                        e => <li>{e}</li>
                    )} </ul></li> : null}
                    <li>Score : {marker.confidence_score}</li>
                    <li><a href={"https://" + props.lang + ".wikipedia.org/wiki?curid=" + marker.wikipediaExternalRef}
                           target="_blank" rel="noreferrer"> wikipedia</a></li>

                </ul>
            </Popup>
        </GeoJSON>: null;
    }

    const [geonames, setGeonames] = useState(undefined);
    const [shapes, setShapes] = useState(undefined);

    useEffect(() => {
        if (geonames === undefined){
            axios("http://localhost:66/597393Complet.json")
                .then(response => {
                    setGeonames(response.data)

                })
        }
    }, [geonames]);

    useEffect(() => {
        if (shapes === undefined){
            axios("http://localhost:66/Laos.txt")
                .then(response => {
                    setShapes(response.data.split('\n').slice(1).map(x => x.split('\t')).reduce((a,x) => ({...a,[x[0]]:JSON.parse(x[1])}), {}))

                })
        }
    }, [shapes]);

    return (

            <div className="component">
                <span className="content_header">Map :</span>
                <MapContainer center={[18, 105]} zoom={5} scrollWheelZoom={true} style={{ height: '300px' }}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        /*url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"*/
                        url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
                    />
                    {geonames !== undefined && shapes !== undefined &&
                    geonames.entities.map((entity) => {
                            if (entity.Id_geonames !== undefined) {
                                return <Point key={entity.rawName} lang = {geonames.lang} shapes = {shapes} entity={entity}/>
                            } else {
                                return null;
                            }
                        }
                    )
                    }
                </MapContainer>
            </div>

    );
};

export default MapComponent;
