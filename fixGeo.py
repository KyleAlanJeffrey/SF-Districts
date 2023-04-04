import json
from typing import List
with open("./GeoData.json") as f:
    geodata = json.load(f)

for feature in geodata['features']:
    polygon: List[List] = feature['geometry']['coordinates'][0][0]
    polygon_lat_lng = [{"lat": tup[1], "lng":tup[0]}for tup in polygon]
    feature['geometry']['coordinates'] = polygon_lat_lng
with open('geodata_lat_lng.json', 'w') as f:
    json.dump(geodata, f)
