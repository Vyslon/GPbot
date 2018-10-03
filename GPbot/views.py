from flask import Flask

app = Flask(__name__)

app.config.from_object('config')

@app.route('/')
def index():
    return "var from config.py  :  " + app.config['TEST_VAR']

if __name__ == "__main__":
    app.run()
