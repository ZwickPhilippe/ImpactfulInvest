from flask import Flask, jsonify, request
import numpy as np
import pandas as pd
from repository import ESGData, FinancialDataAPI
from util.RecommenderSystem import Recommender
from typing import List

app = Flask(__name__)

esgData = pd.read_csv("../data/ESGData.csv", delimiter=";")

esg = ESGData(esgData)
fin = FinancialDataAPI("../api-keys")
recommender = Recommender(esgData, gamma=0.2)

# Simulate stock time series data as a list of 100 numbers
def generate_stock_data():
    # Using numpy to generate 100 random prices around a mean of 100 with some volatility
    np.random.seed(42)  # For consistent results, remove in real applications
    prices = np.random.normal(loc=100, scale=10, size=100).tolist()
    return prices


def getWholeData(isins: List[str]):
    return esgData[esgData['ISIN_BC'].isin(isins)].to_json(orient="records")


@app.route('/api/stock-data', methods=['GET'])
def get_stock_data():
    isin = request.args.get("isin")
    dateFrom = request.args.get("dateFrom")
    dateTo = request.args.get("dateTo")

    print(isin, dateFrom, dateTo)
    stock_data = fin.provideEndOfDayHistory("ISIN_BC", isin, dateFrom, dateTo)
    return jsonify(stock_data)

@app.route('/api/esg-data', methods=['GET'])
def get_esg_data():
    isin = request.args.get("isin")
    esg_data = esg.getESGdata(isin)
    return jsonify(esg_data)

@app.route('/api/recommendation', methods=['GET'])
def getRecommendations():
    n = request.args.get("n", default=5, type=int)
    recommendations = list(recommender.getRecommendation(n=n, deterministic=True))
    return getWholeData(recommendations)

@app.route('/api/compare-suggestion', methods=['GET'])
def getCompareSuggestion():
    suggestion = recommender.getCompareSuggestion()
    return getWholeData(suggestion)

@app.route('/api/update-preferences', methods=['POST'])
def updatePreferences():
    data = request.get_json()
    pair = data["pair"]
    preference = data["preference"]
    recommender.updatePreferences(pair, preference)
    return "OK"

if __name__ == '__main__':
    app.run(debug=True)
