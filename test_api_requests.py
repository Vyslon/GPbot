# coding: utf-8
import requests
from GPbot.api_requests import get_lat_lng, get_location_info
from unicodedata import normalize


def test_api_return(monkeypatch):
    lat_lng_result = (37.4224629, -122.0855711)
    location_desc = "Le Googleplex est le siège social de Google,"
    adress = "1600 amphitheatre parkway"

    assert get_lat_lng(adress, "mountain view", "ca") == lat_lng_result

    assert get_location_info("googleplex")[0:45] == location_desc