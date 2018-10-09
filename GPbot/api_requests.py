# coding: utf-8
import requests
from unicodedata import normalize


def get_lat_lng(adress):
    """
        Get latitude and longitude from an Adress using google maps api
        - Return a tuple : (latitude, longitude)
    """
    adress.replace(" ", "+")
    URL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + \
          adress + "&key=API_KEY"

    geocoding_maps_return = requests.get(URL).json()
    lat = geocoding_maps_return['results'][0]['geometry']['location']['lat']
    lng = geocoding_maps_return['results'][0]['geometry']['location']['lng']
    return (lat, lng)


def get_location_info(location):
    """
        Get informations about a location using MediaWiki API
        - Return a string
    """
    location_infos = requests.get("https://fr.wikipedia.org/w/api.php?" +
                                  "format=json&action=query&prop=extracts" +
                                  "&exintro&explaintext" +
                                  "&redirects=1&titles=" +
                                  location +
                                  "&utf8&indexpageids").json()
    page_id = location_infos['query']['pageids'][0].encode('utf-8')
    returned_info = location_infos['query']['pages'][page_id]['extract']

    return returned_info.encode('utf-8')
