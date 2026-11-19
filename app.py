"""Vesli website - Flask app.

Day 1: every page has a route and a placeholder template.
The contact form backend (POST /contact) is added on day 3.
"""
import json
from datetime import date
from pathlib import Path

from flask import Flask, render_template

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"

app = Flask(__name__)

# ==========Vesli Email============
CONTACT_EMAIL = "contactvesli@gmail.com"


def load_json(filename):
    """Read a JSON file from the data folder, e.g. services.json."""
    with open(DATA_DIR / filename, encoding="utf-8") as f:
        return json.load(f)


@app.context_processor
def inject_globals():
    """Values every template can use, such as the year in the footer."""
    return {"current_year": date.today().year, "contact_email": CONTACT_EMAIL}


@app.route("/")
def home():
    return render_template("index.html", active="home",
                           services=load_json("services.json"),
                           projects=load_json("portfolio.json"))


@app.route("/diensten")
def services():
    return render_template("diensten.html", active="diensten",
                           services=load_json("services.json"))


@app.route("/portfolio")
def portfolio():
    return render_template("portfolio.html", active="portfolio",
                           projects=load_json("portfolio.json"))


@app.route("/over-ons")
def about():
    team = load_json("team.json")
    # Only show a photo if the file is really there; otherwise show initials.
    for person in team:
        person["has_photo"] = (BASE_DIR / "static" / person["photo"]).is_file()
    return render_template("over-ons.html", active="over-ons", team=team)


@app.route("/contact")
def contact():
    return render_template("contact.html", active="contact")


@app.route("/privacy")
def privacy():
    return render_template("privacy.html", active="privacy")


@app.errorhandler(404)
def page_not_found(error):
    return render_template("404.html"), 404


if __name__ == "__main__":
    app.run(debug=True)
