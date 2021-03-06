import csv
import requests

url = "http://www.nasdaq.com/quotes/nasdaq-100-stocks.aspx?render=download"

def get_data():
    r = requests.get(url)
    data = r.text
    stock_data = {'children': []}
    for line in csv.DictReader(data.splitlines(), skipinitialspace=True):
        stock_data['children'].append({
            'name': line['Name'],
            'symbol': line['Symbol'],
            'symbol': line['Symbol'],
            'price': line['lastsale'],
            'net_change': line['netchange'],
            'percent_change': line['pctchange'],
            'volume': line['share_volume'],
            'value': line['Nasdaq100_points']
        })

    return stock_data

# print get_data()
