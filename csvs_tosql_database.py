#!/usr/bin/env python
# coding: utf-8

# In[27]:



# ----- Example Python program to create a database in PostgreSQL using Psycopg2 -----

# import the PostgreSQL client for Python

import psycopg2

from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

 
username = 'postgres' #input('Enter your postgres username!')
password = 'postgres' #input('Enter your postgres password!')
# Connect to PostgreSQL DBMS

con = psycopg2.connect(user = f"{username}",
                                  password = f"{password}",
                                  host = "database-2.cwsizsgvjvsz.us-east-2.rds.amazonaws.com",
                                  port = "5432",
                                  database = 'plastic');

con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT);

# Obtain a DB Cursor

cursor          = con.cursor();

name_Database   = "plastic";






# Create table statement

sqlCreateDatabase = "create database "+name_Database+";"



# Create a table in PostgreSQL database
try:

    cursor.execute(sqlCreateDatabase);

    con.close()
except Exception:
    con.close()


# In[28]:


# Connect to PostgreSQL DBMS
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

engine = create_engine(f'postgresql://postgres:postgres@database-2.cwsizsgvjvsz.us-east-2.rds.amazonaws.com:5432/postgres')
# import psycopg2
# engine = psycopg2.connect(
#     database="postgres",
#     user="postgres",
#     password="postgres",
#     host="database-2.cwsizsgvjvsz.us-east-2.rds.amazonaws.com",
#     port='5432'
# )
connection = engine.connect()


# In[29]:


# Python program to explain os.listdir() method  
    
# importing os module  
import os 
import pandas as pd
  
# Get the list of all files and directories 
# in the root directory 
path = "data"
dir_list = os.listdir(path) 
csv_list = []
for item in dir_list:
    item_split = item.split('.')
    if item_split[1] == 'csv':
        try:
            df = pd.read_csv(f'{path}/{item}')
            csv_list.append(item)
            print(item_split[0])
        except Exception:
            next
csv_list


# In[30]:


for x in csv_list:
    df = pd.read_csv(f'{path}/{x}')
    item_split = x.split('.')
    df.to_sql(item_split[0],con=connection,if_exists='append')


# In[31]:


for x in csv_list:
    df = pd.read_csv(f'{path}/{x}')
    item_split = x.split('.')
    check=engine.has_table(item_split[0])
    print(check) #boolean
    if check == False:
        df.to_sql(item_split[0],con=connection,if_exists='replace')
    else:
        table_name = item_split[0]
        print(table_name)
        firstcolumn = df.columns[1]
        print(firstcolumn)
        
        df.to_sql(item_split[0],con=connection,if_exists='append')

        sql1 = f'DELETE FROM {table_name} T1         USING   {table_name} T2         WHERE   T1.ctid < T2.ctid          -- delete the older versions         AND T1.{firstcolumn}  = T2.{firstcolumn};          -- add more columns if needed'

    
        connection.execute(sql1)
       
        


# In[ ]:




