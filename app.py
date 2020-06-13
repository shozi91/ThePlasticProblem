from flask import Flask
from flask_restful import Resource, Api
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func


#################################################
# Database Setup
#################################################
engine = create_engine(f'postgresql://postgres:postgres@database-2.cwsizsgvjvsz.us-east-2.rds.amazonaws.com:5432/plastic')
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
x = Base.classes.keys()
# Save reference to the table


#################################################
# Flask Setup
#################################################
app = Flask(__name__)
api = Api(app)


#################################################
# Flask classes/routes
#################################################

class get_data(Resource):
    def get(self):
        connection = engine.connect()
        if table1 != " ":
            next
        else:
            table1 = pd.read_sql(sql=f"Select * FROM {x[0]}", con=connection) 
            table2 = pd.read_sql(sql=f"Select * FROM {x[1]}", con=connection) 
            table3 = pd.read_sql(sql=f"Select * FROM {x[2]}", con=connection) 
            table4 = pd.read_sql(sql=f"Select * FROM {x[3]}", con=connection) 
            table5 = pd.read_sql(sql=f"Select * FROM {x[4]}", con=connection)
            table6 = pd.read_sql(sql=f"Select * FROM {x[5]}", con=connection) 
            table7 = pd.read_sql(sql=f"Select * FROM {x[6]}", con=connection) 
            table8 = pd.read_sql(sql=f"Select * FROM {x[7]}", con=connection) 
        return render_template("index.html", table1=table1, table2=table2,table3=table3,table4=table4,table5=table5,table6=table6,table7=table7,table8=table8  )


api.add_resource(get_data, '/')


if __name__ == '__main__':
    app.run(debug=True)