import React, { useRef, useState, useEffect } from 'react';
import axios from "axios";
import { loadModules } from 'esri-loader';

import { useAuth0 } from "@auth0/auth0-react";

function Map() {
    const MapEl = useRef(null);
    const [bunkers, setBunkers] = useState([]);
    const [userData, setUserData] = useState('');
    const { user } = useAuth0();

    useEffect(() => {

        const identifyId = user['sub'].split("|")[1];
        axios
            .get("http://localhost:8080/bunker/all")
            .then((response) => {
                console.log(response)
                setBunkers(response.data);
            })
            .catch((response) => {
            });

        axios
            .get("http://localhost:8080/user/identityId?" + "identifyId=" + identifyId)
            .then((response) => {
                setUserData(response.data);
                console.log(response.data);
            })
            .catch((response) => {
            });
    }, []);


    useEffect(() => {
        let view;
        loadModules(["esri/config", "esri/views/MapView", "esri/Map", "esri/widgets/Locate", "esri/widgets/Track", "esri/Graphic", "esri/layers/GraphicsLayer", "esri/widgets/Search", "esri/rest/locator", "esri/rest/route", "esri/rest/support/RouteParameters", "esri/rest/support/FeatureSet", "esri/geometry/Point", "esri/geometry/SpatialReference", "esri/geometry/support/webMercatorUtils", "esri/geometry/geometryEngine", "esri/rest/geometryService", "esri/geometry/Polyline"],
            {
                css: true
            }).then(([esriConfig, MapView, Map, Locate, Track, Graphic, GraphicsLayer, Search, locator, route, RouteParameters, FeatureSet, Point, SpatialReference, webMercatorUtils, geometryEngine, geometryService, Polyline]) => {

                esriConfig.apiKey = "AAPKd2c442e5d05649f4923d425e291bd3fbHCXDAwjcHdHRbTZPZILHg0agLZnA0V6V3v9dHslDZAjeyOrjVqr59N6B0THwkB1x";

                const serviceUrl = "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

                const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

                const webMap = new Map({
                    basemap: 'arcgis-navigation'
                })

                view = new MapView({
                    map: webMap,
                    center: [-118, 35],
                    zoom: 2,
                    container: MapEl.current
                })

                if (bunkers.length > 0) {
                    bunkers.map(function (bunker) {

                        let [lat, lng] = bunker.location.split(";");

                        const point = {
                            type: "point",
                            longitude: lng,
                            latitude: lat
                        };
                        addGraphic("red", point);
                    });
                }

                let [latUser, lngUser] = userData.address.split(";");
                {

                    const point = {
                        type: "point",
                        longitude: lngUser,
                        latitude: latUser
                    };
                    addGraphic("green", point);
                }

                const locate = new Locate({
                    view: view,
                    useHeadingEnabled: false,
                    goToOverride: function (view, options) {
                        options.target.scale = 1500;
                        return view.goTo(options.target);
                    }
                });
                view.ui.add(locate, "top-left");

                view.on("click", function (event) {
                    const latPoint = event.mapPoint.latitude;
                    const lngPoint = event.mapPoint.longitude;



                    if (bunkers.length > 0) {
                        bunkers.map(function (bunker) {

                            let [lat, lng] = bunker.location.split(";");

                            let paths = [
                                [  // first path
                                    [latUser, lngUser],
                                    [lat, lng]
                                ],
                            ];

                            let line = new Polyline({
                                hasZ: false,
                                hasM: false,
                                paths: paths,
                                spatialReference: { wkid: 4326 }
                            });


                            let kilo = geometryEngine.geodesicLength(line, "kilometers");

                            let precision = 1;
                            if ((Math.abs(Number(lat).toFixed(precision) - latPoint.toFixed(precision)) < 0.001) && (Math.abs(Number(lng).toFixed(precision) - lngPoint.toFixed(precision)) < 0.001)) {
                                const params = {
                                    location: event.mapPoint
                                };

                                locator.locationToAddress(serviceUrl, params)
                                    .then(function (response) { // Show the address found
                                        const address = response.address;
                                        console.log(address);
                                        showInfo(bunker.name, bunker.free_slots, bunker.max_capacity, bunker.utilities, kilo, event.mapPoint);
                                    }, function (err) { // Show no address found
                                        console.log("nuu");
                                    });
                                getRoute(lngUser, latUser, lng, lat);
                            }
                        });


                    }
                });

                function addGraphic(type, point) {
                    const graphic = new Graphic({
                        symbol: {
                            type: "simple-marker",
                            color: type,
                            size: "8px"
                        },
                        geometry: point
                    });
                    view.graphics.add(graphic);
                }

                function getRoute(lng, lat, lng2, lat2) {
                    let point = {
                        type: "point",  // autocasts as new Point()
                        longitude: lng,
                        latitude: lat
                    };

                    // Create a symbol for drawing the point
                    let markerSymbol = {
                        type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                        color: [226, 119, 40]
                    };

                    // Create a graphic and add the geometry and symbol to it
                    let pointGraphic1 = new Graphic({
                        geometry: point,
                        symbol: markerSymbol
                    });

                    let point2 = {
                        type: "point",  // autocasts as new Point()
                        longitude: lng2,
                        latitude: lat2
                    };

                    // Create a symbol for drawing the point
                    let markerSymbol2 = {
                        type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                        color: [226, 119, 40]
                    };

                    // Create a graphic and add the geometry and symbol to it
                    let pointGraphic2 = new Graphic({
                        geometry: point2,
                        symbol: markerSymbol2
                    });

                    let my_feature = new FeatureSet({
                        features: [pointGraphic1, pointGraphic2]
                    });

                    const routeParams = new RouteParameters({
                        stops: my_feature,
                        returnDirections: true
                    });

                    console.log(routeParams)

                    route.solve(routeUrl, routeParams)
                        .then(function (data) {
                            data.routeResults.forEach(function (result) {
                                result.route.symbol = {
                                    type: "simple-line",
                                    color: [5, 150, 255],
                                    width: 3
                                };
                                view.graphics.add(result.route);
                            });
                            if (data.routeResults.length > 0) {
                                const directions = document.createElement("ol");
                                directions.classList = "esri-widget esri-widget--panel esri-directions__scroller";
                                directions.style.marginTop = "0";
                                directions.style.padding = "15px 15px 15px 30px";
                                const features = data.routeResults[0].directions.features;

                                // Show each direction
                                features.forEach(function (result, i) {
                                    const direction = document.createElement("li");
                                    direction.innerHTML = result.attributes.text + " (" + result.attributes.length.toFixed(2) + " miles)";
                                    directions.appendChild(direction);
                                });

                                view.ui.empty("top-right");
                                view.ui.add(directions, "top-right");
                            }

                        })
                        .catch(function (error) {
                            console.log(error);
                        })

                }

                function showInfo(bunkerName, free_slots, max_capacity, utilities, kilo, pt) {
                    view.popup.open({
                        title: `${bunkerName}`,
                        content: `${free_slots} / ${max_capacity} - capacity \n${utilities} - kilo - ${kilo}`,
                        location: pt
                    });
                }

            })


    }, [bunkers]);

    return (
        <div className='absolute top-[20%] left-[10%] w-[85%] h-[78%]'>
            <div ref={MapEl} style={{ height: "75vh", width: "95%" }}>
            </div>
        </div>
    )

}

export default Map;