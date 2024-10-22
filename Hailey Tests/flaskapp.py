from flask import Flask, jsonify, render_template, request  # Import request
import json

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('homepage.html')  # Introduction Page

@app.route('/stats')
def stats_view():
    return render_template('stats.html')  # Victim Statistics Page

@app.route('/map')
def map_view():
    return render_template('map.html')  # Map Page

@app.route('/table')
def table_view():
    return render_template('table.html')  # Interactive Table Page

@app.route('/data') # Data page 
def data():
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=100, type=int)  # Number of records per page
    start = (page - 1) * per_page
    end = start + per_page

    with open('static/data/data.json') as f:
        data = json.load(f)
    
    # Return only the requested page of data due to large file size
    return jsonify(data[start:end])

if __name__ == '__main__':
    app.run(debug=True)