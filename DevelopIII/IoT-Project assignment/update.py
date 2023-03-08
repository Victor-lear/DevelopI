

import random
import time
import pymongo
from pymongo import MongoClient
import pandas as pd
import csv
import os
import time
from datetime import datetime, timedelta
mongo_url_01 = "mongodb://admin:bmwee8097218@140.118.122.115:30415/"

conn = MongoClient(mongo_url_01)
db = conn["AP_test"]
collection = db["Develop"]
while(1):
    temp = random.randint(22, 29)
    data={'temp':temp,
          'time':datetime.now()}
    collection.insert(data)
    time.sleep(1)