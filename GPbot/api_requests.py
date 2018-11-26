# coding: utf-8
import requests
from unicodedata import normalize


def get_lat_lng_formated_name(address):
    """
        Get latitude, longitude and formated address name
        from an Address using google maps api
        - Return a tuple : (latitude, longitude, formatted_name)
    """
    address.replace(" ", "+")
    URL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + \
    address.title() + "&key=APIKEY"
    geocoding_maps = requests.get("https://maps.googleapis.com/maps/api/geocode/json", params={"address" : "Openclassrooms", "key" : "APIKEY"}, headers={"content-type" : "application/json;charset=UTF-8", "Accept-language" : "fr"})
    try:
        geocoding_maps = geocoding_maps.json()
    except:
        pass
    try:
        lat = float(geocoding_maps['results'][0]['geometry']['location']['lat'])
        lng = float(geocoding_maps['results'][0]['geometry']['location']['lng'])
        address = geocoding_maps['results'][0]['formatted_address']
    except:
        lat, lng, address = 0, 0, 0
    return (lat, lng, address)


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
                                  "&utf8&indexpageids")
    try:
        location_infos = location_infos.json()
    except:
        pass
    page_id = str(location_infos['query']['pageids'][0])
    returned_info = location_infos['query']['pages'][page_id]['extract']

    return returned_info
