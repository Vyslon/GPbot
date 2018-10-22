# coding: utf-8
import requests
from GPbot.api_requests import get_lat_lng_formated_name, \
    get_location_info
from unicodedata import normalize


def test_api_return(monkeypatch):
    location_desc = "Le Googleplex est le siège social de Google,"
    result = \
    get_lat_lng_formated_name("1600 amphitheatre parkway")

    assert isinstance(result[0], float) and \
    isinstance(result[1], float) and isinstance(result[2], str)

    assert get_location_info("googleplex")[0:45] == location_desc

#TODO : test formatted_adress result with a society name on input
