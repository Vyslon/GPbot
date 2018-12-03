# coding: utf-8
import json
import requests
from GPbot.api_requests import get_lat_lng_formated_name, \
    get_location_info
from unicodedata import normalize


class mock_response:
    def __init__(self, path):
        self.path = path

    def json(self):
        response_maps_open = open(self.path)
        response_maps_read = response_maps_open.read()
        return json.loads(response_maps_read)


def test_api_return(monkeypatch):
    lat = 37.422617
    long = -122.0853839
    formatted_address = "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA"
    location_desc = "Le Googleplex est le siège social de Google,"

    def maps_return(*args, **kwargs):
        return mock_response('json/lat_lng_address_response.json')

    monkeypatch.setattr(requests, 'get', maps_return)
    result = get_lat_lng_formated_name("1600 amphitheatre parkway")
    assert result[0] == lat
    assert result[1] == long
    assert result[2] == formatted_address

    def mediawiki_return(URL):
        return mock_response('json/location_info_response.json')

    monkeypatch.setattr(requests, 'get', mediawiki_return)
    assert get_location_info("googleplex")[0:44] == location_desc
