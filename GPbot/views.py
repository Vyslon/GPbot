from flask import Flask, render_template, request
from .parsing import parseIt
from .api_requests import get_lat_lng_formated_name, get_location_info
import json

app = Flask(__name__)

app.config.from_object('config')


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == "__main__":
    app.run()


@app.route('/parse', methods=['POST'])
def parse():
    text = request.form['text']
    parsedText = parseIt(text)
    lat_lng_name = get_lat_lng_formated_name(parsedText)
    try:
        info = get_location_info(parsedText)
    except NameError:
        info = ""
    return json.dumps({"parsedText": parsedText, "latitude": lat_lng_name[0],
                       "longitude": lat_lng_name[1],
                       "formatted_name": lat_lng_name[2],
                       "info": info})
