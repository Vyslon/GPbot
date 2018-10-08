from flask import Flask, render_template

app = Flask(__name__)

app.config.from_object('config')

@app.route('/')
def index():
    # return "var from config.py  :  " + app.config['TEST_VAR']
    return render_template('index.html')

if __name__ == "__main__":
    app.run()
