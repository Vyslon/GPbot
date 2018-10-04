import requests

def get_lat_lng(adress, municipality, region):
    """
        Get latitude and longitude from an Adress using google maps api
        - Return a tuple : (latitude, longitude)
    """
    adress.replace(" ", "+")
    municipality.replace(" ", "+")
    region.replace(" ", "+")
    URL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + adress + "," + municipality + "," + region + "&key=APIKEY"
    geocoding_maps_return = requests.get(URL).json()
    lat = geocoding_maps_return['results'][0]['geometry']['location']['lat']
    lng = geocoding_maps_return['results'][0]['geometry']['location']['lng']
    return (lat, lng)
