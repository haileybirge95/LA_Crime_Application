from flask import Flask, jsonify, render_template
import json

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('stats.html') # Introduction Page

@app.route('/map')
def map_view():
    return render_template('map.html')  # Victim Statistics Page

@app.route('/table')
def table_view():
    return render_template('table.html')  # Interactive Map and Table Page

@app.route('/data')
def data():
    # Load your JSON data from a file or database
    with open('data.json') as f:
        data = json.load(f)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)