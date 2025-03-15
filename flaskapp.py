from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("homepage.html")

@app.route("/stats")
def stats_view():
    return render_template("stats.html")

@app.route("/map")
def map_view():
    return render_template("map.html")

if __name__ == "__main__":
    app.run(debug=True)