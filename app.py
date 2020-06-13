from flask import Flask, render_template, redirect
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, MetaData
import pandas as pd
from flask import Flask, jsonify



#################################################
# Database Setup
#################################################
engine = create_engine(
    f'postgresql://postgres:postgres@database-2.cwsizsgvjvsz.us-east-2.rds.amazonaws.com:5432/plastic')
# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

key = Base.classes.keys()
print(key)




# p=inspect(engine)
# print(p.get_table_names())
from sqlalchemy.engine import reflection

insp = reflection.Inspector.from_engine(engine)
x = insp.get_table_names()
print(x)

# Save reference to the table


#################################################
# Flask Setup
#################################################
app = Flask(__name__)

table =[]
@app.route("/")
def index():
    
    connection = engine.connect()
    table1 = pd.read_sql(sql=f"Select * FROM {x[0]}", con=connection).to_json(orient='records')
    table2 = pd.read_sql(sql=f"Select * FROM {x[1]}", con=connection).to_json(orient='records')
    table3 = pd.read_sql(sql=f"Select * FROM {x[2]}", con=connection).to_json(orient='records')
    table4 = pd.read_sql(sql=f"Select * FROM {x[3]}", con=connection).to_json(orient='records')
    table5 = pd.read_sql(sql=f"Select * FROM {x[4]}", con=connection).to_json(orient='records')
    table6 = pd.read_sql(sql=f"Select * FROM {x[5]}", con=connection).to_json(orient='records')
    table7 = pd.read_sql(sql=f"Select * FROM {x[6]}", con=connection).to_json(orient='records')
    #table8 = pd.read_sql(sql=f"Select * FROM {x[7]}", con=connection).to_json(orient='index')
    return render_template("index.html",table1=table1, table2=table2,table3=table3,table4=table4,table5=table5,table6=table6 ,table7=table7  )
  

if __name__ == "__main__":
    app.run(debug=True)
