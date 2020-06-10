#!/usr/bin/env python
# coding: utf-8

# In[2]:


import pandas as pd


# In[3]:


oil_consumption_url = 'http://en.wikipedia.org/wiki/List_of_countries_by_oil_consumption'
oil_production_url = 'http://en.wikipedia.org/wiki/List_of_countries_by_oil_production'
oil_reserves_url = 'http://en.wikipedia.org/wiki/List_of_countries_by_proven_oil_reserves'


# In[7]:


oil_consumption_df = pd.read_html(oil_consumption_url)[0]
oil_consumption_df.rename(columns={'Oil consumption(bbl/day)':'Barrel consumption/day'},inplace=True)
oil_consumption_df['Rank'].replace('-','NaN',inplace=True)
oil_consumption_df['Barrel consumption/day'] = oil_consumption_df['Barrel consumption/day'].apply(lambda x: x.split('[')[0])
oil_consumption_df['Year'] = oil_consumption_df['Year'].apply(lambda x: x.split(' ')[0])

def remove_tags(x):
    split_string = x.split(']')
    if len(split_string[0]) != 4:
        return split_string[1]
    else:
        return split_string[0]

oil_consumption_df['Year'] = oil_consumption_df['Year'].apply(lambda x: remove_tags(x))
oil_consumption_df['Country/Region'] = oil_consumption_df['Country/Region'].apply(lambda x: x.split('(')[0])
oil_consumption_df.set_index('Country/Region',drop=True,inplace=True)
oil_consumption_df.to_csv('completed_flow/data/oil_consumption_scrape_data.csv')
oil_consumption_df


# In[6]:


oil_production_df = pd.read_html(oil_production_url)[0]
oil_production_df.drop(oil_production_df.columns[oil_production_df.columns.str.contains('unnamed',case = False)],axis = 1, inplace = True)
oil_production_df.rename(columns={'Oil production2019 (bbl/day)[1]':'2019 Crude Oil Barrel production/day',
                                 'Oil production per capita2017 (bbl/day/million people)[5]':
                                  '2017 Crude Oil Barrel production/day/million people'},inplace=True)
oil_production_df['Country'] = oil_production_df['Country'].apply(lambda x: x.split('[')[0])
oil_production_df['Country'] = oil_production_df['Country'].apply(lambda x: x.split('(')[0])
oil_production_df['Country'].replace('World production','World',inplace=True)
oil_production_df.set_index('Country',drop=True,inplace=True)
oil_production_df.to_csv('completed_flow/data/oil_production_scrape_data.csv')
oil_production_df


# In[17]:


oil_reserves_df = pd.read_html(oil_reserves_url)[0]

countries_list = oil_reserves_df['Proven reserves (millions of barrels)']['Country']
countries_list = countries_list.apply(lambda x: x.split('(')[0])
countries_list

start_2017_reserves_df = oil_reserves_df['U.S. EIA (start of 2017)[2]']
start_2017_reserves_df['Country'] = countries_list
start_2017_reserves_df['Country'].replace('World total','World',inplace=True)
start_2017_reserves_df.set_index('Country',inplace=True)

end_2017_reserves_df = oil_reserves_df['OPEC (end of 2017)[3]']
end_2017_reserves_df['Country'] = countries_list
end_2017_reserves_df['Country'].replace('World total','World',inplace=True)
end_2017_reserves_df.set_index('Country',inplace=True)

end_2015_reserves_df = oil_reserves_df['BP (end of 2015)[4]']
end_2015_reserves_df['Country'] = countries_list
end_2015_reserves_df['Country'].replace('World total','World',inplace=True)
end_2015_reserves_df.set_index('Country',inplace=True)

compiled_oil_reserves_data = pd.concat([start_2017_reserves_df,end_2017_reserves_df,end_2015_reserves_df],
                                       keys=['start_2017','end_2017','end_2015'])
compiled_oil_reserves_data.index.rename(['Year','Country'],inplace=True)
compiled_oil_reserves_data.to_csv('completed_flow/data/compiled_oil_reserves_scraped_data.csv')

compiled_oil_reserves_data = pd.read_csv('completed_flow/data/compiled_oil_reserves_scraped_data.csv')
compiled_oil_reserves_data = compiled_oil_reserves_data[['Country',  'Rank', 'Reserves', 'Year']]
compiled_oil_reserves_data.set_index('Country',drop=True,inplace=True)
compiled_oil_reserves_data.to_csv('completed_flow/data/compiled_oil_reserves_scraped_data.csv')
compiled_oil_reserves_data


# In[ ]:





# In[ ]:




