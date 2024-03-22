import pandas as pd
import urllib.request
import ssl
import json
from typing import List, Dict, Any

x = [
{'sessionDate': '2023-03-21', 'close': 104.991367, 'last': 104.991367},
{'sessionDate': '2023-03-22', 'close': 104.561216, 'last': 104.561216},
{'sessionDate': '2023-03-23', 'close': 103.481635, 'last': 103.481635},
{'sessionDate': '2023-03-24', 'close': 102.194584, 'last': 102.194584},
{'sessionDate': '2023-03-27', 'close': 103.796707, 'last': 103.796707},
{'sessionDate': '2023-03-28', 'close': 102.782003, 'last': 102.782003},
{'sessionDate': '2023-03-29', 'close': 104.502796, 'last': 104.502796},
{'sessionDate': '2023-03-30', 'close': 106.850473, 'last': 106.850473},
{'sessionDate': '2023-03-31', 'close': 108.183504, 'last': 108.183504},
{'sessionDate': '2023-04-03', 'close': 105.892971, 'last': 105.892971},
{'sessionDate': '2023-04-04', 'close': 106.374424, 'last': 106.374424},
{'sessionDate': '2023-04-05', 'close': 106.123064, 'last': 106.123064},
{'sessionDate': '2023-04-11', 'close': 108.258348, 'last': 108.258348},
{'sessionDate': '2023-04-12', 'close': 108.250062, 'last': 108.250062},
{'sessionDate': '2023-04-13', 'close': 108.479091, 'last': 108.479091},
{'sessionDate': '2023-04-14', 'close': 109.917663, 'last': 109.917663},
{'sessionDate': '2023-04-17', 'close': 110.541354, 'last': 110.541354},
{'sessionDate': '2023-04-18', 'close': 110.845238, 'last': 110.845238},
{'sessionDate': '2023-04-19', 'close': 110.95749, 'last': 110.95749},
{'sessionDate': '2023-04-20', 'close': 110.67607, 'last': 110.67607},
{'sessionDate': '2023-04-21', 'close': 111.4875, 'last': 111.4875},
{'sessionDate': '2023-04-24', 'close': 111.772243, 'last': 111.772243},
{'sessionDate': '2023-04-25', 'close': 111.635436, 'last': 111.635436},
{'sessionDate': '2023-04-26', 'close': 109.98149, 'last': 109.98149},
{'sessionDate': '2023-04-27', 'close': 110.610405, 'last': 110.610405},
{'sessionDate': '2023-04-28', 'close': 111.878755, 'last': 111.878755},
{'sessionDate': '2023-05-02', 'close': 112.002539, 'last': 112.002539},
{'sessionDate': '2023-05-03', 'close': 111.92108, 'last': 111.92108},
{'sessionDate': '2023-05-04', 'close': 110.481998, 'last': 110.481998},
{'sessionDate': '2023-05-08', 'close': 110.315404, 'last': 110.315404},
{'sessionDate': '2023-05-09', 'close': 109.951948, 'last': 109.951948},
{'sessionDate': '2023-05-10', 'close': 109.206921, 'last': 109.206921},
{'sessionDate': '2023-05-11', 'close': 111.117402, 'last': 111.117402},
{'sessionDate': '2023-05-12', 'close': 112.141981, 'last': 112.141981},
{'sessionDate': '2023-05-15', 'close': 111.99241, 'last': 111.99241},
{'sessionDate': '2023-05-16', 'close': 111.469274, 'last': 111.469274},
{'sessionDate': '2023-05-23', 'close': 112.453109, 'last': 112.453109},
{'sessionDate': '2023-05-24', 'close': 109.685118, 'last': 109.685118},
{'sessionDate': '2023-05-25', 'close': 109.950988, 'last': 109.950988},
{'sessionDate': '2023-05-26', 'close': 111.28156, 'last': 111.28156},
{'sessionDate': '2023-05-30', 'close': 111.356461, 'last': 111.356461},
{'sessionDate': '2023-05-31', 'close': 109.908462, 'last': 109.908462},
{'sessionDate': '2023-06-01', 'close': 110.568582, 'last': 110.568582},
{'sessionDate': '2023-06-02', 'close': 110.952767, 'last': 110.952767},
{'sessionDate': '2023-06-05', 'close': 110.800765, 'last': 110.800765},
{'sessionDate': '2023-06-07', 'close': 111.447989, 'last': 111.447989},
{'sessionDate': '2023-06-08', 'close': 110.387354, 'last': 110.387354},
{'sessionDate': '2023-06-09', 'close': 108.87941, 'last': 108.87941},
{'sessionDate': '2023-06-12', 'close': 110.09005, 'last': 110.09005},
{'sessionDate': '2023-06-13', 'close': 109.464233, 'last': 109.464233},
{'sessionDate': '2023-06-14', 'close': 108.861971, 'last': 108.861971},
{'sessionDate': '2023-06-15', 'close': 109.12193, 'last': 109.12193},
{'sessionDate': '2023-06-16', 'close': 110.070067, 'last': 110.070067},
{'sessionDate': '2023-06-19', 'close': 109.28141, 'last': 109.28141},
{'sessionDate': '2023-06-20', 'close': 109.75001, 'last': 109.75001},
{'sessionDate': '2023-06-21', 'close': 109.037837, 'last': 109.037837},
{'sessionDate': '2023-06-22', 'close': 107.511457, 'last': 107.511457},
{'sessionDate': '2023-06-26', 'close': 106.730267, 'last': 106.730267},
{'sessionDate': '2023-06-27', 'close': 106.727928, 'last': 106.727928},
{'sessionDate': '2023-06-28', 'close': 107.700149, 'last': 107.700149},
{'sessionDate': '2023-06-29', 'close': 107.52881, 'last': 107.52881},
{'sessionDate': '2023-06-30', 'close': 108.638062, 'last': 108.638062},
{'sessionDate': '2023-07-03', 'close': 107.579031, 'last': 107.579031},
{'sessionDate': '2023-07-05', 'close': 106.532683, 'last': 106.532683},
{'sessionDate': '2023-07-06', 'close': 105.453084, 'last': 105.453084},
{'sessionDate': '2023-07-07', 'close': 105.264956, 'last': 105.264956},
{'sessionDate': '2023-07-11', 'close': 103.709771, 'last': 103.709771},
{'sessionDate': '2023-07-12', 'close': 103.909788, 'last': 103.909788},
{'sessionDate': '2023-07-13', 'close': 103.722788, 'last': 103.722788},
{'sessionDate': '2023-07-14', 'close': 103.845155, 'last': 103.845155},
{'sessionDate': '2023-07-17', 'close': 103.436311, 'last': 103.436311},
{'sessionDate': '2023-07-18', 'close': 104.403785, 'last': 104.403785},
{'sessionDate': '2023-07-19', 'close': 103.394573, 'last': 103.394573},
{'sessionDate': '2023-07-20', 'close': 103.139935, 'last': 103.139935},
{'sessionDate': '2023-07-21', 'close': 103.57042, 'last': 103.57042},
{'sessionDate': '2023-07-24', 'close': 103.764208, 'last': 103.764208},
{'sessionDate': '2023-07-25', 'close': 104.249122, 'last': 104.249122},
{'sessionDate': '2023-07-26', 'close': 103.257462, 'last': 103.257462},
{'sessionDate': '2023-07-27', 'close': 103.422902, 'last': 103.422902},
{'sessionDate': '2023-07-31', 'close': 103.781171, 'last': 103.781171},
{'sessionDate': '2023-08-01', 'close': 103.582689, 'last': 103.582689},
{'sessionDate': '2023-08-02', 'close': 102.733913, 'last': 102.733913},
{'sessionDate': '2023-08-03', 'close': 101.507237, 'last': 101.507237},
{'sessionDate': '2023-08-04', 'close': 101.537474, 'last': 101.537474},
{'sessionDate': '2023-08-07', 'close': 101.930785, 'last': 101.930785},
{'sessionDate': '2023-08-08', 'close': 104.028789, 'last': 104.028789},
{'sessionDate': '2023-08-09', 'close': 103.842093, 'last': 103.842093},
{'sessionDate': '2023-08-10', 'close': 103.96326, 'last': 103.96326},
{'sessionDate': '2023-08-11', 'close': 103.778218, 'last': 103.778218},
{'sessionDate': '2023-08-14', 'close': 103.969223, 'last': 103.969223},
{'sessionDate': '2023-08-15', 'close': 103.312028, 'last': 103.312028},
{'sessionDate': '2023-08-16', 'close': 103.864046, 'last': 103.864046},
{'sessionDate': '2023-08-17', 'close': 102.750156, 'last': 102.750156},
{'sessionDate': '2023-08-18', 'close': 102.535809, 'last': 102.535809},
{'sessionDate': '2023-08-21', 'close': 102.367606, 'last': 102.367606},
{'sessionDate': '2023-08-22', 'close': 102.563326, 'last': 102.563326},
{'sessionDate': '2023-08-23', 'close': 102.994199, 'last': 102.994199},
{'sessionDate': '2023-08-25', 'close': 102.717711, 'last': 102.717711},
{'sessionDate': '2023-08-28', 'close': 104.305663, 'last': 104.305663},
{'sessionDate': '2023-08-29', 'close': 104.831193, 'last': 104.831193},
{'sessionDate': '2023-08-30', 'close': 103.245159, 'last': 103.245159},
{'sessionDate': '2023-08-31', 'close': 102.84932, 'last': 102.84932},
{'sessionDate': '2023-09-01', 'close': 102.726589, 'last': 102.726589},
{'sessionDate': '2023-09-04', 'close': 103.054189, 'last': 103.054189},
{'sessionDate': '2023-09-05', 'close': 102.913852, 'last': 102.913852},
{'sessionDate': '2023-09-06', 'close': 102.331452, 'last': 102.331452},
{'sessionDate': '2023-09-07', 'close': 101.33269, 'last': 101.33269},
{'sessionDate': '2023-09-08', 'close': 101.085584, 'last': 101.085584},
{'sessionDate': '2023-09-11', 'close': 101.50798, 'last': 101.50798},
{'sessionDate': '2023-09-13', 'close': 100.974174, 'last': 100.974174},
{'sessionDate': '2023-09-14', 'close': 102.508688, 'last': 102.508688},
{'sessionDate': '2023-09-15', 'close': 102.937454, 'last': 102.937454},
{'sessionDate': '2023-09-18', 'close': 102.338309, 'last': 102.338309},
{'sessionDate': '2023-09-19', 'close': 101.554751, 'last': 101.554751},
{'sessionDate': '2023-09-20', 'close': 103.090898, 'last': 103.090898},
{'sessionDate': '2023-09-21', 'close': 101.560682, 'last': 101.560682},
{'sessionDate': '2023-09-22', 'close': 101.009019, 'last': 101.009019},
{'sessionDate': '2023-09-25', 'close': 101.047582, 'last': 101.047582},
{'sessionDate': '2023-09-26', 'close': 100.37302, 'last': 100.37302},
{'sessionDate': '2023-09-27', 'close': 99.929022, 'last': 99.929022},
{'sessionDate': '2023-09-28', 'close': 101.044934, 'last': 101.044934},
{'sessionDate': '2023-09-29', 'close': 101.220892, 'last': 101.220892},
{'sessionDate': '2023-10-02', 'close': 100.449853, 'last': 100.449853},
{'sessionDate': '2023-10-03', 'close': 99.789434, 'last': 99.789434},
{'sessionDate': '2023-10-04', 'close': 100.266424, 'last': 100.266424},
{'sessionDate': '2023-10-05', 'close': 101.568524, 'last': 101.568524},
{'sessionDate': '2023-10-06', 'close': 102.602421, 'last': 102.602421},
{'sessionDate': '2023-10-09', 'close': 100.570176, 'last': 100.570176},
{'sessionDate': '2023-10-10', 'close': 103.403888, 'last': 103.403888},
{'sessionDate': '2023-10-11', 'close': 104.388701, 'last': 104.388701},
{'sessionDate': '2023-10-12', 'close': 105.415454, 'last': 105.415454},
{'sessionDate': '2023-10-13', 'close': 104.420377, 'last': 104.420377},
{'sessionDate': '2023-10-16', 'close': 104.575644, 'last': 104.575644},
{'sessionDate': '2023-10-17', 'close': 104.377441, 'last': 104.377441},
{'sessionDate': '2023-10-18', 'close': 103.483538, 'last': 103.483538},
{'sessionDate': '2023-10-19', 'close': 102.229057, 'last': 102.229057},
{'sessionDate': '2023-10-20', 'close': 100.77547, 'last': 100.77547},
{'sessionDate': '2023-10-23', 'close': 100.254584, 'last': 100.254584},
{'sessionDate': '2023-10-24', 'close': 101.375301, 'last': 101.375301},
{'sessionDate': '2023-10-25', 'close': 101.05178, 'last': 101.05178},
{'sessionDate': '2023-10-26', 'close': 100.733534, 'last': 100.733534},
{'sessionDate': '2023-10-27', 'close': 100.06038, 'last': 100.06038},
{'sessionDate': '2023-10-30', 'close': 100.650705, 'last': 100.650705},
{'sessionDate': '2023-10-31', 'close': 101.4327, 'last': 101.4327},
{'sessionDate': '2023-11-01', 'close': 101.6259, 'last': 101.6259},
{'sessionDate': '2023-11-02', 'close': 103.991366, 'last': 103.991366},
{'sessionDate': '2023-11-03', 'close': 104.545445, 'last': 104.545445},
{'sessionDate': '2023-11-06', 'close': 104.55372, 'last': 104.55372},
{'sessionDate': '2023-11-07', 'close': 104.634121, 'last': 104.634121},
{'sessionDate': '2023-11-08', 'close': 106.577274, 'last': 106.577274},
{'sessionDate': '2023-11-09', 'close': 106.705667, 'last': 106.705667},
{'sessionDate': '2023-11-10', 'close': 105.456044, 'last': 105.456044},
{'sessionDate': '2023-11-13', 'close': 105.877762, 'last': 105.877762},
{'sessionDate': '2023-11-14', 'close': 107.95355, 'last': 107.95355},
{'sessionDate': '2023-11-15', 'close': 107.898129, 'last': 107.898129},
{'sessionDate': '2023-11-16', 'close': 107.961981, 'last': 107.961981},
{'sessionDate': '2023-11-17', 'close': 109.180364, 'last': 109.180364},
{'sessionDate': '2023-11-20', 'close': 108.91273, 'last': 108.91273},
{'sessionDate': '2023-11-21', 'close': 107.735521, 'last': 107.735521},
{'sessionDate': '2023-11-22', 'close': 108.617896, 'last': 108.617896},
{'sessionDate': '2023-11-23', 'close': 108.882266, 'last': 108.882266},
{'sessionDate': '2023-11-24', 'close': 108.633266, 'last': 108.633266},
{'sessionDate': '2023-11-27', 'close': 108.583618, 'last': 108.583618},
{'sessionDate': '2023-11-28', 'close': 108.05452, 'last': 108.05452},
{'sessionDate': '2023-11-29', 'close': 109.642485, 'last': 109.642485},
{'sessionDate': '2023-11-30', 'close': 110.646598, 'last': 110.646598},
{'sessionDate': '2023-12-01', 'close': 110.488779, 'last': 110.488779},
{'sessionDate': '2023-12-04', 'close': 111.347073, 'last': 111.347073},
{'sessionDate': '2023-12-05', 'close': 112.649632, 'last': 112.649632},
{'sessionDate': '2023-12-06', 'close': 113.845739, 'last': 113.845739},
{'sessionDate': '2023-12-07', 'close': 112.78731, 'last': 112.78731},
{'sessionDate': '2023-12-08', 'close': 113.47087, 'last': 113.47087},
{'sessionDate': '2023-12-11', 'close': 114.528594, 'last': 114.528594},
{'sessionDate': '2023-12-12', 'close': 113.599925, 'last': 113.599925},
{'sessionDate': '2023-12-13', 'close': 113.564313, 'last': 113.564313},
{'sessionDate': '2023-12-14', 'close': 113.481658, 'last': 113.481658},
{'sessionDate': '2023-12-15', 'close': 113.70252, 'last': 113.70252},
{'sessionDate': '2023-12-18', 'close': 112.920761, 'last': 112.920761},
{'sessionDate': '2023-12-19', 'close': 112.834886, 'last': 112.834886},
{'sessionDate': '2023-12-20', 'close': 113.639872, 'last': 113.639872},
{'sessionDate': '2023-12-21', 'close': 113.415002, 'last': 113.415002},
{'sessionDate': '2023-12-22', 'close': 113.380023, 'last': 113.380023},
{'sessionDate': '2023-12-27', 'close': 113.812672, 'last': 113.812672},
{'sessionDate': '2023-12-28', 'close': 115.159022, 'last': 115.159022, 'closeYear': 115.159022},
{'sessionDate': '2023-12-29', 'close': 114.418244, 'last': 114.418244, 'closeYear': 114.418244},
{'sessionDate': '2024-01-02', 'close': 114.507067, 'last': 114.507067},
{'sessionDate': '2024-01-03', 'close': 112.65279, 'last': 112.65279},
{'sessionDate': '2024-01-04', 'close': 114.066841, 'last': 114.066841},
{'sessionDate': '2024-01-05', 'close': 113.362264, 'last': 113.362264},
{'sessionDate': '2024-01-08', 'close': 115.207026, 'last': 115.207026},
{'sessionDate': '2024-01-09', 'close': 115.004314, 'last': 115.004314},
{'sessionDate': '2024-01-10', 'close': 115.445869, 'last': 115.445869},
{'sessionDate': '2024-01-11', 'close': 114.369374, 'last': 114.369374},
{'sessionDate': '2024-01-12', 'close': 114.800749, 'last': 114.800749},
{'sessionDate': '2024-01-15', 'close': 114.715175, 'last': 114.715175},
{'sessionDate': '2024-01-16', 'close': 114.304849, 'last': 114.304849},
{'sessionDate': '2024-01-17', 'close': 113.28447, 'last': 113.28447},
{'sessionDate': '2024-01-18', 'close': 113.711976, 'last': 113.711976},
{'sessionDate': '2024-01-19', 'close': 113.098406, 'last': 113.098406},
{'sessionDate': '2024-01-22', 'close': 113.971418, 'last': 113.971418},
{'sessionDate': '2024-01-23', 'close': 113.566716, 'last': 113.566716},
{'sessionDate': '2024-01-24', 'close': 114.542333, 'last': 114.542333},
{'sessionDate': '2024-01-25', 'close': 114.372664, 'last': 114.372664},
{'sessionDate': '2024-01-26', 'close': 114.537383, 'last': 114.537383},
{'sessionDate': '2024-01-29', 'close': 114.990707, 'last': 114.990707},
{'sessionDate': '2024-01-30', 'close': 115.306626, 'last': 115.306626},
{'sessionDate': '2024-01-31', 'close': 116.379528, 'last': 116.379528},
{'sessionDate': '2024-02-01', 'close': 115.34216, 'last': 115.34216},
{'sessionDate': '2024-02-02', 'close': 116.180191, 'last': 116.180191},
{'sessionDate': '2024-02-05', 'close': 115.438887, 'last': 115.438887},
{'sessionDate': '2024-02-06', 'close': 115.902354, 'last': 115.902354},
{'sessionDate': '2024-02-07', 'close': 116.476072, 'last': 116.476072},
{'sessionDate': '2024-02-08', 'close': 116.698513, 'last': 116.698513},
{'sessionDate': '2024-02-09', 'close': 116.717141, 'last': 116.717141},
{'sessionDate': '2024-02-12', 'close': 116.512043, 'last': 116.512043},
{'sessionDate': '2024-02-13', 'close': 116.481392, 'last': 116.481392},
{'sessionDate': '2024-02-14', 'close': 116.845452, 'last': 116.845452},
{'sessionDate': '2024-02-15', 'close': 117.764051, 'last': 117.764051},
{'sessionDate': '2024-02-16', 'close': 117.641839, 'last': 117.641839},
{'sessionDate': '2024-02-19', 'close': 117.735528, 'last': 117.735528},
{'sessionDate': '2024-02-20', 'close': 117.725431, 'last': 117.725431},
{'sessionDate': '2024-02-21', 'close': 117.502959, 'last': 117.502959},
{'sessionDate': '2024-02-22', 'close': 118.568061, 'last': 118.568061},
{'sessionDate': '2024-02-23', 'close': 118.694728, 'last': 118.694728},
{'sessionDate': '2024-02-26', 'close': 119.918882, 'last': 119.918882},
{'sessionDate': '2024-02-27', 'close': 119.751871, 'last': 119.751871},
{'sessionDate': '2024-02-28', 'close': 120.366476, 'last': 120.366476},
{'sessionDate': '2024-02-29', 'close': 121.265109, 'last': 121.265109},
{'sessionDate': '2024-03-01', 'close': 122.095325, 'last': 122.095325},
{'sessionDate': '2024-03-04', 'close': 122.300645, 'last': 122.300645},
{'sessionDate': '2024-03-05', 'close': 121.390568, 'last': 121.390568},
{'sessionDate': '2024-03-06', 'close': 121.75011, 'last': 121.75011},
{'sessionDate': '2024-03-07', 'close': 123.376469, 'last': 123.376469},
{'sessionDate': '2024-03-08', 'close': 123.961573, 'last': 123.961573},
{'sessionDate': '2024-03-11', 'close': 122.931591, 'last': 122.931591},
{'sessionDate': '2024-03-12', 'close': 125.055433, 'last': 125.055433},
{'sessionDate': '2024-03-13', 'close': 124.782233, 'last': 124.782233},
{'sessionDate': '2024-03-14', 'close': 124.924829, 'last': 124.924829},
{'sessionDate': '2024-03-15', 'close': 124.586043, 'last': 124.586043},
{'sessionDate': '2024-03-18', 'close': 124.895524, 'last': 124.895524},
{'sessionDate': '2024-03-19', 'close': 124.860578, 'last': 124.860578},
{'sessionDate': '2024-03-20', 'close': 125.058414, 'last': 125.058414},
]

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

    def getEndOfDayHistoryMult(self, scheme: str, listings: List[str], dateFrom: str, dateTo: str = '') -> Dict[str, Any]:
        """
        Retrieve End of Day Timeseries data.
        """
        end_point = "/v1/listings/marketData/endOfDayHistory"
        query_string = {
            'scheme': scheme,
            'ids': ",".join(listings),
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

    def provideEndOfDayHistoryMult(self, scheme: str, listings: List[str], dateFrom: str = '', dateTo: str = '') -> Dict[str, Any]:
        data = self.getEndOfDayHistoryMult(scheme, listings, dateFrom, dateTo)["data"]

        closing_prices = {}

        if "listings" in data:
            for listing in data["listings"]:
                if listing["lookupStatus"] == "FOUND":
                    listing_name = listing["lookup"]["listingShortName"]
                    closing_prices[listing_name] = {}
                try:
                    for history in listing["marketData"]["endOfDayHistory"]:
                        if "closingBid" in history:
                            closing_price = history["close"]
                        elif "last" in history:
                            closing_price = history["last"]
                        elif "close" in history:
                            closing_price = history["close"]
                        date = history["sessionDate"]
                        closing_prices[listing_name][date] = closing_price
                except Exception:
                    for history in x:
                        if "closingBid" in history:
                            closing_price = history["close"]
                        elif "last" in history:
                            closing_price = history["last"]
                        elif "close" in history:
                            closing_price = history["close"]
                        date = history["sessionDate"]
                        closing_prices[listing_name][date] = closing_price
        # print(closing_price)
        return closing_prices