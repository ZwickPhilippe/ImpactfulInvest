from flask import Flask, jsonify, request
from flask_cors import CORS

import numpy as np
import pandas as pd
from repository import ESGData, FinancialDataAPI
from util.RecommenderSystem import Recommender
from typing import List
import json
from openAI_service import AIService

app = Flask(__name__)
CORS(app)
esgData = pd.read_csv("../data/Data_Full.csv", delimiter=";")

esg = ESGData(esgData)
fin = FinancialDataAPI("../api-keys")
recommender = Recommender(esgData[["ISIN_BC","Biodiversity","Environmental","Fossil fuels","Greenhouse gas emissions","Scoping according to SFDR annex template","Social","Waste","Water"]], gamma=0.2)
aiService = AIService()

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
    data = esg.getESGdata(isin)
    print(data, flush=True)
    data['stock_data'] = fin.provideEndOfDayHistory("ISIN_BC", isin, "2023-03-21", "2024-03-21")
    return jsonify(data)

@app.route('/api/recommendation', methods=['GET'])
def getRecommendations():
    n = request.args.get("n", default=5, type=int)
    recommendations = list(recommender.getRecommendation(n=n, deterministic=True))
    return getWholeData(recommendations)

@app.route('/api/compare-suggestion', methods=['GET'])
def getCompareSuggestion():
    suggestion = recommender.getCompareSuggestion()
    print(suggestion)
    data = json.loads(getWholeData(suggestion))
    temp = fin.provideEndOfDayHistoryMult("ISIN_BC", list(suggestion), "2023-03-21", "2024-03-21")
    for i, d in enumerate(data):
        d["stock_data"] = temp[list(temp.keys())[i]]
    return jsonify(data)

@app.route('/api/update-preferences', methods=['POST'])
def updatePreferences():
    data = request.get_json()
    pair = data["pair"]
    preference = data["preference"]
    recommender.updatePreferences(pair, preference)
    return "OK"

@app.route('/api/openAI', methods=['GET'])
def getOpenAI():
    isin = request.args.get("isin")
    data = getWholeData([isin])[0]
    print(data, flush=True)
    return aiService.getSummaryOfESGData(data)

@app.route('/api/portfolio-summary', methods=['GET'])
def getPortfolioSummary():
    data = request.get_json()
    portfolio = data["portfolio"]
    portfolio = getWholeData(portfolio)
    return aiService.getPortfolioSummary(portfolio)

@app.route('/api/preferences', methods=['GET'])
def getPreferences():
    prefs = recommender.getPreferences()
    print(prefs)
    return jsonify(prefs)


if __name__ == '__main__':
    app.run(debug=True)
