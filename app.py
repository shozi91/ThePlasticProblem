import copy
import json
import os
import re
from datetime import datetime
from functools import lru_cache
from pathlib import Path

import pandas as pd
import requests
from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine, inspect, text

#################################################
# Database Setup
#################################################
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@database-2.cwsizsgvjvsz.us-east-2.rds.amazonaws.com:5432/plastic",
)
WORLD_GEOJSON_URL = os.getenv(
    "WORLD_GEOJSON_URL",
    "https://enjalot.github.io/wwsd/data/world/world-110m.geojson",
)
WORLD_GEOJSON_FILE = Path(
    os.getenv("WORLD_GEOJSON_FILE", "static/choropleth/myfile.geojson")
)
PREFER_LOCAL_DATA = os.getenv("PREFER_LOCAL_DATA", "0").lower() in {"1", "true", "yes"}

# Some providers still return postgres:// which SQLAlchemy does not accept.
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# Prefer explicit table names, but keep old index-based fallback for compatibility.
TABLE_CANDIDATES = {
    "cleanup": ("cleanup", "summary_earth_cleanup"),
    "global_plastic_production": ("global_plastic_production",),
    "impactstudies": ("impactstudies",),
    "plastic_fate": ("plastic_fate",),
    "plastic_waste_by_sector": ("plastic_waste_by_sector",),
    "plastic_waste_generation_total": ("plastic_waste_generation_total",),
    "summary_earth": ("summary_earth",),
    "surface_plastic_mass_by_ocean": ("surface_plastic_mass_by_ocean",),
}
LEGACY_TABLE_INDEX = {
    "cleanup": 0,
    "global_plastic_production": 1,
    "impactstudies": 2,
    "plastic_fate": 3,
    "plastic_waste_by_sector": 4,
    "plastic_waste_generation_total": 5,
    "summary_earth": 6,
    "surface_plastic_mass_by_ocean": 7,
}
LOCAL_DATA_FILES = {
    "cleanup": Path("data/mws/cleanup.csv"),
    "global_plastic_production": Path("data/global_plastics_production.csv"),
    "impactstudies": Path("data/impactstudies.csv"),
    "plastic_fate": Path("data/plastic_fate.csv"),
    "plastic_waste_by_sector": Path("data/plastic_waste_by_sector.csv"),
    "plastic_waste_generation_total": Path("data/plastic_waste_generation_total.csv"),
    "summary_earth": Path("data/summary_earth.csv"),
    "surface_plastic_mass_by_ocean": Path("data/surface_plastic_mass_by_ocean.csv"),
}

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


@lru_cache(maxsize=1)
def available_tables():
    """Cache table names to avoid repeated reflection overhead."""
    return tuple(inspect(engine).get_table_names())


def resolve_table_name(dataset_key):
    table_names = available_tables()

    for candidate in TABLE_CANDIDATES.get(dataset_key, ()):
        if candidate in table_names:
            return candidate

    fallback_index = LEGACY_TABLE_INDEX.get(dataset_key)
    if fallback_index is not None and fallback_index < len(table_names):
        return table_names[fallback_index]

    raise KeyError(f"Unable to resolve table for dataset '{dataset_key}'")


def read_table(dataset_key):
    if PREFER_LOCAL_DATA:
        return read_local_table(dataset_key)

    try:
        table_name = resolve_table_name(dataset_key)
        if not table_name.replace("_", "").isalnum():
            raise ValueError(f"Unexpected table name: {table_name}")

        query = text(f'SELECT * FROM "{table_name}"')
        with engine.connect() as connection:
            return pd.read_sql_query(query, con=connection)
    except Exception:
        # Keep development unblocked if the original RDS database is unavailable.
        return read_local_table(dataset_key)


def normalize_columns(dataframe):
    dataframe.columns = [
        re.sub(r"[^0-9A-Za-z_]+", "_", col).strip("_") for col in dataframe.columns
    ]
    return dataframe


def read_local_table(dataset_key):
    local_file = LOCAL_DATA_FILES.get(dataset_key)
    if not local_file or not local_file.exists():
        raise FileNotFoundError(f"No local fallback file for dataset '{dataset_key}'")

    data = pd.read_csv(local_file)
    return normalize_columns(data)


def dataframe_records_response(dataframe):
    return app.response_class(dataframe.to_json(orient="records"), mimetype="application/json")


@lru_cache(maxsize=1)
def world_geojson():
    try:
        response = requests.get(WORLD_GEOJSON_URL, timeout=15)
        response.raise_for_status()
        return response.json()
    except Exception:
        if WORLD_GEOJSON_FILE.exists():
            with WORLD_GEOJSON_FILE.open("r", encoding="utf-8") as file:
                return json.load(file)
        raise


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/gal")
def gal():
    return render_template("gal.html")


@app.route("/gal2")
def gal2():
    return render_template("gal2.html")


@app.route("/resolution")
def resolution():
    return render_template("cleanUpSummary.html")


@app.route("/source")
def source():
    return render_template("source_final.html")


@app.route("/creators")
def creators():
    return render_template("creators.html")


@app.route("/river")
def river():
    return render_template("river.html")


@app.route("/data")
def data():
    return render_template("data.html")


@app.route("/cleanup")
def t1():
    data = read_table("cleanup")
    cutoff = datetime.strptime("12/31/18 13:55:26", "%m/%d/%y %H:%M:%S")
    data["DateOriginal"] = pd.to_datetime(data["DateOriginal"])
    filtered_data = data.loc[data["DateOriginal"] > cutoff]
    return dataframe_records_response(filtered_data)


@app.route("/global_plastic_production")
def t2():
    table = read_table("global_plastic_production")
    return dataframe_records_response(table)


@app.route("/impactstudies")
def t3():
    table = read_table("impactstudies")
    return dataframe_records_response(table)


@app.route("/plastic_fate")
def t4():
    table = read_table("plastic_fate")
    return dataframe_records_response(table)


@app.route("/plastic_waste_by_sector")
def t5():
    table = read_table("plastic_waste_by_sector")
    return dataframe_records_response(table)


@app.route("/plastic_waste_generation_total")
def t6():
    country_df = read_table("plastic_waste_generation_total")

    # Build country lookup once (O(n)) instead of filtering dataframe for each feature (O(n*m)).
    waste_by_country = {}
    for _, row in country_df.iterrows():
        entity = row.get("Entity")
        amount = row.get("Plastic_Waste_Generation_tonnes")
        if entity is None or pd.isna(amount):
            continue
        try:
            waste_by_country[str(entity)] = int(amount)
        except (TypeError, ValueError):
            continue

    geo_data = copy.deepcopy(world_geojson())
    for feature in geo_data.get("features", []):
        properties = feature.get("properties", {})
        country_name = properties.get("name")
        properties["plastic_waste"] = waste_by_country.get(country_name)

    return jsonify(geo_data)


@app.route("/summary_earth")
def t7():
    table = read_table("summary_earth")
    return dataframe_records_response(table)


@app.route("/surface_plastic_mass_by_ocean")
def t8():
    table = read_table("surface_plastic_mass_by_ocean")
    return dataframe_records_response(table)


if __name__ == "__main__":
    app.run(debug=True)
