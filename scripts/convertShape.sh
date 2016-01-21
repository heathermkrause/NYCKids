#!/bin/bash
ogr2ogr -f GeoJSON -t_srs epsg:4326 data/nycd.json data/source/shape/nycd.shp
topojson -o data/nycd.topo.json -p BoroCD -- data/nycd.json