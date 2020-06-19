from flask import Flask, render_template, redirect
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, MetaData
import pandas as pd
from flask import Flask, jsonify
import requests



#################################################
# Database Setup
#################################################
engine = create_engine(
    f'postgresql://postgres:postgres@database-2.cwsizsgvjvsz.us-east-2.rds.amazonaws.com:5432/plastic')
# # reflect an existing database into a new model
# Base = automap_base()

# # reflect the tables
# Base.prepare(engine, reflect=True)






# p=inspect(engine)
# print(p.get_table_names())
from sqlalchemy.engine import reflection

insp = reflection.Inspector.from_engine(engine)
x = insp.get_table_names()


# Save reference to the table


#################################################
# Flask Setup
#################################################
app = Flask(__name__)

@app.route("/")
def index():
    print('test')
    return render_template("index.html" )

@app.route("/cleanup")
def t1():
    connection = engine.connect()
    table1 = pd.read_sql(sql=f"Select * FROM {x[0]}", con=connection).to_json(orient='records')
    connection.close()
    
    return table1

@app.route("/global_plastic_production")
def t2():
    connection = engine.connect()
    table2 = pd.read_sql(sql=f"Select * FROM {x[1]}", con=connection).to_json(orient='records')    
    connection.close()
    return table2

@app.route("/source")
def source():
    return render_template("source_final.html")

@app.route("/impactstudies")
def t3():
    connection = engine.connect()
    table3 = pd.read_sql(sql=f"Select * FROM {x[2]}", con=connection).to_json(orient='records')
    connection.close()
    return table3

@app.route("/plastic_fate")
def t4():
    connection = engine.connect()
    table4 = pd.read_sql(sql=f"Select * FROM {x[3]}", con=connection).to_json(orient='records')
    connection.close()
    return table4

@app.route("/plastic_waste_by_sector")
def t5():
    connection = engine.connect()
    table5 = pd.read_sql(sql=f"Select * FROM {x[4]}", con=connection).to_json(orient='records')
    connection.close()
    return table5

@app.route("/plastic_waste_generation_total")
def t6():
    connection = engine.connect()
    country_df = pd.read_sql_query(sql=f"Select * FROM {x[5]}", con=connection)
    connection.close()

    response = requests.get("http://enjalot.github.io/wwsd/data/world/world-110m.geojson")

    geoData = response.json()

    for feature in geoData["features"]:
        country_name = feature["properties"]['name']
        plastic_waste = country_df.loc[country_df["Entity"] == country_name]["Plastic_Waste_Generation_tonnes"].values    
  
        if len(plastic_waste) > 0:
            feature["properties"]["plastic_waste"] = int(plastic_waste[0])
        else:
            feature["properties"]["plastic_waste"] = None

            

    table6 = jsonify(geoData)

    return table6

@app.route("/summary_earth")
def t7():
    connection = engine.connect()
    table7 = pd.read_sql(sql=f"Select * FROM {x[6]}", con=connection).to_json(orient='records')
    connection.close()
    return table7

@app.route("/surface_plastic_mass_by_ocean")
def t8():
    connection = engine.connect()
    table8 = pd.read_sql(sql=f"Select * FROM {x[7]}", con=connection).to_json(orient='records')
    connection.close()
    return table8

if __name__ == "__main__":
    app.run(debug=True)
