import requests

def get_lat_lng(adress, municipality, region):
    #replace
    #Number and name of the street
    URL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + adress + "," + municipality + "," + region + "&key=APIKEY")
    geocoding_maps_return = requests.get(URL).content
    print(geocoding_maps_return["results"]["geometry"]["location"]["lat"] + geocoding_maps_return["results"]["geometry"]["location"]["lng"])
