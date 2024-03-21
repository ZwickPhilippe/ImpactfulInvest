# This is a basic sample to use Azure OpenAI
# 3 configurations are available in the file openAI_config.json
#
# pre-requisites:
#   - pip install --upgrade openai

import os
from openai import AzureOpenAI
import json


class AIService:
    def __init__(self) -> None:
        # Load config values
        with open(r'openAI_config.json') as config_file:
            openAI_config = json.load(config_file)

        my_config = openAI_config['openAIConfigs'][2]

        print(f"use openAI config {my_config['configName']}")

        # Setting up the deployment name
        self.chatgpt_model_name = my_config['model']

        self.client = AzureOpenAI(
            api_key=my_config['apiKey'],
            api_version=my_config['apiVersion'],
            azure_endpoint=my_config['urlBase']
        )
        

    def getSummaryOfESGData(self, esgData):
        prompt = f"""Briefly summarize The following fund. You will be provided a json summary of its ISIN, Name and several ESG Factor scores which are mapped between 0 and 1. THe description is as follows:\n"""
        
        response = self.client.chat.completions.create(
            model=self.chatgpt_model_name,
            messages=[{"role": "assistant", "content": prompt}])
        
        return response.choices[0].message.content
    

    def getPortfolioSummary(self, portfolio):
        prompt = f"""Briefly explain how ESG compliant my Porfolio of Funds is (You get the portfolio as a list of strings of ISINs): \n {portfolio}."""
        
        response = self.client.chat.completions.create(
            model=self.chatgpt_model_name,
            messages=[{"role": "assistant", "content": prompt}])
        
        return response.choices[0].message.content
    


if __name__ == "__main__":
    ai = AIService()
    print(ai.getSummaryOfESGData("esgData"))