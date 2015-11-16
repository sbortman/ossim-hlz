/**
 * Created by sbortman on 11/13/15.
 */
//= require jquery
//= require webjars/bootswatch-superhero/3.3.5/js/bootstrap.js
//= require webjars/openlayers/3.10.1/ol.js
//= require_self

ossimHLZ = (function ()
{
    "use strict";

    var lat, lon, radiusROI, radiusLZ, roughness, slope, map, layers;


    function updateHLZ()
    {
        map.getLayers().forEach( function ( layer )
        {
            if ( layer.get( 'name' ) == 'hlz' )
            {
                // Do with layer
                var source = layer.getSource();
                var params = source.getParams();
                params.lat = lat;
                params.lon = lon;
                params.radiusROI = radiusROI;
                params.radiusLZ = radiusLZ;
                params.roughness = roughness;
                params.slope = slope;

                source.updateParams( params );
            }
        } );

    }

    function onMoveEnd( evt )
    {
        var center = map.getView().getCenter();

        //console.log( center );

        lat = center[1];
        lon = center[0];

        $( '#lat' ).val( lat );
        $( '#lon' ).val( lon );

        updateHLZ();
    }

    function initialize( initParams )
    {
        lat = initParams.lat;
        lon = initParams.lon;
        radiusROI = initParams.radiusROI;
        radiusLZ = initParams.radiusLZ;

        roughness = initParams.roughness;
        slope = initParams.slope;

        layers = [
            new ol.layer.Tile( {
                name: 'reference',
                source: new ol.source.TileWMS( {
                    url: 'http://geoserver-demo01.dev.ossim.org/geoserver/ged/wms?',
                    params: {
                        LAYERS: 'osm-group'
                    }
                } )
            } ),
            new ol.layer.Tile( {
                name: 'omar-mosaic',
                source: new ol.source.TileWMS( {
                    url: 'http://omar.ossim.org/omar/ogc/wms?',
                    params: {
                        VERSION: '1.1.1',
                        LAYERS: '313'
                    }
                } )
            } ),
            new ol.layer.Image( {
                name: 'hlz',
                source: new ol.source.ImageWMS( {
                    url: '/ossim-hlz/hlz/renderHLZ',
                    params: {
                        LAYERS: '',
                        VERSION: '1.1.1',
                        lat: lat,
                        lon: lon,
                        radiusROI: radiusROI,
                        radiusLZ: radiusLZ,
                        roughness: roughness,
                        slope: slope
                    }
                } )
            } )
        ];

        map = new ol.Map( {
            controls: ol.control.defaults().extend( [
                new ol.control.ScaleLine( {
                    units: 'degrees'
                } )
            ] ),
            layers: layers,
            target: 'map',
            view: new ol.View( {
                projection: 'EPSG:4326'//,
                //center: [initParams.lon, initParams.lat],
                //zoom: 2
            } )
        } );

        map.on( 'moveend', onMoveEnd );
        var extent = ol.extent.boundingExtent( initParams.extent );
        //console.log( extent );
        map.getView().fit( extent, map.getSize() );

        $( '#lat' ).val( lat );
        $( '#lon' ).val( lon );
        $( '#radiusROI' ).val( radiusROI );
        $( '#radiusLZ' ).val( radiusLZ );
        $( '#roughness' ).val( roughness );
        $( '#slope' ).val( slope );

        $( '#updateHLZ' ).on( 'click', function ( e )
        {
            lat = $( '#lat' ).val();
            lon = $( '#lon' ).val();
            radiusROI = $( '#radiusROI' ).val();
            radiusLZ = $( '#radiusLZ' ).val();
            roughness = $( '#roughness' ).val();
            slope = $( '#slope' ).val();


            updateHLZ();
            map.getView().setCenter( [lon, lat] );

        } );
    }

    return {
        initialize: initialize
    };
})();
