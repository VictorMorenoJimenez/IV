from flask import Flask

app = Flask(__name__)

@app.route('/') # root folder.
def home():
    return "Hello World"

app.run(port=8080)


