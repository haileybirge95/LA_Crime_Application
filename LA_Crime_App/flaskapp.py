from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("homepage.html")  # Render the homepage template

@app.route("/stats")
def stats_view():
    return render_template("stats.html")  # Assuming you have a stats.html template

@app.route("/map")
def map_view():
    return "This is the Map View!"

@app.route("/table")
def table_view():
    return "This is the Table View!"

if __name__ == "__main__":
    app.run(debug=True)