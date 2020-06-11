import datetime

from dataflows import Flow, PackageWrapper, ResourceWrapper, validate, filter_rows
from dataflows import add_metadata, dump_to_path, load, set_type, printer


def rename_resources(package: PackageWrapper):
    package.pkg.descriptor['resources'][0]['name'] = 'brent-daily'
    package.pkg.descriptor['resources'][0]['path'] = 'brent_daily.csv'
    package.pkg.descriptor['resources'][1]['name'] = 'wti-daily'
    package.pkg.descriptor['resources'][1]['path'] = 'wti_daily.csv'


    yield package.pkg
    res_iter = iter(package)
    for res in  res_iter:
        yield res.it
    yield from package


def filter_out_empty_rows(rows):
    for row in rows:
        if row['Date']:
            yield row


oil_prices = Flow(
    add_metadata(
        name="oil-prices",
        title= "Brent and WTI Spot Prices",
        descriptor="A variety of temporal granularities for Europe Brent and WTI (West Texas Intermediate) Spot Prices.",
        sources=[
            {
                "name": "Daily Europe Brent Spot Price",
                "path": "https://www.eia.gov/dnav/pet/hist_xls/RBRTEd.xls",
                "title": "Daily Europe Brent Spot Price"
            },
            {
                "name": "Daily Cushing, OK WTI Spot Price",
                "path": "http://www.eia.gov/dnav/pet/hist_xls/RWTCd.xls",
                "title": "Daily Cushing, OK WTI Spot Price"
            },
            {
                "name": "OPEC: Monthly Oil Market Report",
                "path": "https://www.opec.org/opec_web/static_files_project/media/downloads/publications/MOMR%20Appendix%20Tables%20(April%202020).xlsx",
                "title": "OPEC: Monthly Oil Market Report"
            },
        ],
        licenses=[
            {
                "name": "ODC-PDDL-1.0",
                "path": "http://opendatacommons.org/licenses/pddl/",
                "title": "Open Data Commons Public Domain Dedication and License v1.0"
            }
        ],
        keywords=["Oil","Brent","WTI","Oil Prices","eia","oil eia"],
        views=[
            {
                "name": "graph",
                "title": "Europe Brent Spot Price FOB (Dollars per Barrel)",
                "resourceName": "brent-day",
                "specType": "simple",
                "spec": {
                "type": "line",
                    "group": "Date",
                    "series": ["Brent Spot Price"]
                }
            }
        ]
    ),
    load(
        load_source='https://www.eia.gov/dnav/pet/hist_xls/RBRTEd.xls',
        format='xls',
        sheet=2,
        skip_rows=[1,2,3],
        headers=['Date', 'Price']
    ),
    load(
        load_source='http://www.eia.gov/dnav/pet/hist_xls/RWTCd.xls',
        format='xls',
        sheet=2,
        skip_rows=[1,2,3],
        headers=['Date', 'Price']
    ),
    
    
    rename_resources,
    set_type('Date', resources=None, type='date', format='any'),
    validate(),
    printer(),
    filter_out_empty_rows,
    dump_to_path('completed_flow/Extract/oil_prices')
)


oil_prices.process()