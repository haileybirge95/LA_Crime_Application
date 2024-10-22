import requests
from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("stats.html")

@app.route('/data')
def get_data():    
    response = requests.get('https://data.lacity.org/resource/2nrs-mtv8.json')
    
    if response.status_code == 200:
        data = response.json()
        return jsonify(data), render_template("data.html")
        
    else:
        return jsonify({'error': 'Failed to fetch data'}), 500

if __name__ == '__main__':
       app.run(debug=True)


# import os
# from flask import Flask, request, abort, render_template
# from flask_sqlalchemy import SQLAlchemy

# app = Flask(__name__)

# @app.route("/")
# def home():
#     return render_template("stats.html")

@app.route("/map")
def map_view():
    return "This is the Map View!"

@app.route("/table")
def table_view():
    return "This is the Table View!"

if __name__ == "__main__":
    app.run(debug=True)