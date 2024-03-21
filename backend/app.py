from flask import Flask, jsonify, request
import numpy as np
from repository import ESGData, FinancialDataAPI


app = Flask(__name__)

esg = ESGData("../data/ESGData.csv")
fin = FinancialDataAPI("../api-keys")

# Simulate stock time series data as a list of 100 numbers
def generate_stock_data():
    # Using numpy to generate 100 random prices around a mean of 100 with some volatility
    np.random.seed(42)  # For consistent results, remove in real applications
    prices = np.random.normal(loc=100, scale=10, size=100).tolist()
    return prices

@app.route('/api/stock-data', methods=['GET'])
def get_stock_data():
    isin = request.args.get("isin")
    dateFrom = request.args.get("dateFrom")
    dateTo = request.args.get("dateTo")
    stock_data = fin.provideEndOfDayHistory("ISIN_BC", isin, dateFrom, dateTo)
    return jsonify(stock_data)

@app.route('/api/esg-data', methods=['GET'])
def get_esg_data():
    isin = request.args.get("isin")
    esg_data = esg.getESGdata(isin)
    return jsonify(esg_data)

if __name__ == '__main__':
    app.run(debug=True)
