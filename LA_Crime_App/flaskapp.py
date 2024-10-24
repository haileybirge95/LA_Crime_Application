from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("stats.html")

@app.route("/map")
def map_view():
    return "This is the Map View!"

@app.route("/table")
def table_view():
    return "This is the Table View!"

if __name__ == "__main__":
    app.run(debug=True)