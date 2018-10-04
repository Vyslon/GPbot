import requests
from GPbot.api_requests import get_lat_lng

def test_api_return(monkeypatch):
    lat_lng_result = (37.4231778, -122.0852514)

    assert get_lat_lng("1600 amphitheatre parkway", "mountain view", "ca") == lat_lng_result
