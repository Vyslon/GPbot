# coding: utf-8
import requests
from unicodedata import normalize


def get_lat_lng_formated_name(address):
    """
        Get latitude, longitude and formated adress name
        from an Address using google maps api
        - Return a tuple : (latitude, longitude, formatted_name)
    """
    address.replace(" ", "+")
    URL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + \
          address.title() + "&key=APIKEY"

    geocoding_maps = requests.get(URL).json()
    try:
        lat = float(geocoding_maps['results'][0]['geometry']['location']['lat'])
        lng = float(geocoding_maps['results'][0]['geometry']['location']['lng'])
        address = geocoding_maps['results'][0]['formatted_address'].encode('utf-8')
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
                                  "&utf8&indexpageids").json()
    page_id = location_infos['query']['pageids'][0].encode('utf-8')
    returned_info = location_infos['query']['pages'][page_id]['extract']

    return returned_info.encode('utf-8')
