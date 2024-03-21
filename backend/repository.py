import pandas as pd
import urllib.request
import ssl
import json
from typing import List, Dict, Any

class ESGData:
    def __init__(self, dataset):
        self.data = dataset

    def getESGdata(self, isin: str) -> Dict[str, any]:
        esg_data_row = self.data[self.data["ISIN_BC"] == isin]
        esg_data = esg_data_row.to_dict("records")[0]
        return esg_data


class APIError(Exception):
    def __init__(self, message: str, correlation_id: str = None):
        self.message = message
        self.correlation_id = correlation_id
        super().__init__(message)


class FinancialDataAPI:
    def __init__(self, certificate_path: str):
        self.url = 'https://web.api.six-group.com/api/findata'
        self.headers = {
            "accept": "application/json"
        }
        self.context = ssl.SSLContext()
        self.context.load_cert_chain(f'{certificate_path}/signed-certificate.pem', f'{certificate_path}/private-key.pem')

    def _http_request(self, end_point: str, query_string: Dict[str, Any]) -> Dict[str, Any]:
        """
        Make an HTTP request and send the raw response.
        """
        complete_url = f"{self.url}{end_point}?{urllib.parse.urlencode(query_string)}"
        try:
            request = urllib.request.Request(complete_url, headers=self.headers)
            with urllib.request.urlopen(request, context=self.context) as response:
                return json.loads(response.read())
        except urllib.error.HTTPError as err:
            correlation_id = err.headers.get('X-CorrelationID')
            raise APIError("An error occurred during the API request.", correlation_id) from err

    def _http_request_with_scheme_id(self, end_point: str, scheme: str, ids: List[str]) -> Dict[str, Any]:
        """
        Make an HTTP request using scheme and ids.
        """
        query_string = {
            'scheme': scheme,
            'ids': ",".join(ids)
        }
        return self._http_request(end_point, query_string)

    def instrumentBase(self, scheme: str, instruments: List[str]) -> Dict[str, Any]:
        """
        Retrieve instrument basic attributes using scheme and ids.
        """
        end_point = "/v1/instruments/referenceData/instrumentBase"
        return self._http_request_with_scheme_id(end_point, scheme, instruments)

    def getEndOfDayHistory(self, scheme: str, listing: str, dateFrom: str, dateTo: str = '') -> Dict[str, Any]:
        """
        Retrieve End of Day Timeseries data.
        """
        end_point = "/v1/listings/marketData/endOfDayHistory"
        query_string = {
            'scheme': scheme,
            'ids': listing,
            'dateFrom': dateFrom,
            'dateTo': dateTo
        }
        return self._http_request(end_point, query_string)

    def provideEndOfDayHistory(self, scheme: str, listing: str, dateFrom: str = '', dateTo: str = '') -> Dict[str, Any]:
        data = self.getEndOfDayHistory(scheme, listing, dateFrom, dateTo)["data"]["listings"][0]
        data_dict = {}
        if data["lookupStatus"] == "FOUND":
            for day in data["marketData"]["endOfDayHistory"]:
                if "closingBid" in day:
                    data_dict[day["sessionDate"]] = day["closingBid"]
                elif "last" in day:
                    data_dict[day["sessionDate"]] = day["last"]
                elif "close" in day:
                    data_dict[day["sessionDate"]] = day["close"]
        return data_dict
