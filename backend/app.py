from flask import Flask, jsonify
import numpy as np
from six_api import FinancialDataAPI


app = Flask(__name__)

# Simulate stock time series data as a list of 100 numbers
def generate_stock_data():
    # Using numpy to generate 100 random prices around a mean of 100 with some volatility
    np.random.seed(42)  # For consistent results, remove in real applications
    prices = np.random.normal(loc=100, scale=10, size=100).tolist()
    return prices

@app.route('/api/stock-data', methods=['GET'])
def get_stock_data():
    stock_data = generate_stock_data()
    return jsonify(stock_data)

if __name__ == '__main__':
    app.run(debug=True)
