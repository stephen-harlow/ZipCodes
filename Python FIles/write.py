import csv     # imports the csv module
import sys      # imports the sys module
import json
import os
import requests
from pprint import pprint
from tqdm import tqdm

f = open("main.csv", 'rt', encoding='latin1') # opens the csv file
test = True
link = "https://rocky-sands-63107.herokuapp.com"
if test:
    link = "http://localhost:5000"
try:
    reader = csv.reader(f)  # creates the reader object
    keys = []
    items = []
    cou = 0
    prevstate = "PR"
    curstate = "PR"
    index = 0
    flag = False
    data = list(reader)
    pbar = tqdm(total=len(data)-1)
    while(index < len(data)):
        row = data[index]
        if(len(row) > 0):
            i = 0
            if(cou == 0):
                while(i < len(row)):
                    keys.append(row[i])
                    i += 1
            else:
                if row[3] == prevstate:
                    bod = {}
                    while(i < len(row)):
                        bod[keys[i]] =  row[i]
                        i += 1
                    if(bod["Zip"] == "77546"):
                        print("HEY< WHY ARENT YOU IN THE LIST")
                    items.append(bod)
                    index += 1
                else:
                    flag = True
                    curstate = prevstate
                    prevstate = row[3]
            cou += 1
        if(cou % 40 == 0 or flag):
            pbar.update(len(items))
            flag = False
            headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

            r = requests.post(link+'/api/v1/'+curstate+'/expAll', data = json.dumps(items), headers=headers)
            # t = requests.post('https://rocky-sands-63107.herokuapp.com/api/v1/'+curstate+'/updateAll', data = json.dumps(items), headers=headers)

            items = []
            cou = 0
    pbar.close()


except Exception as e:
    exc_type, exc_obj, exc_tb = sys.exc_info()
    fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
    print(exc_type, fname, exc_tb.tb_lineno)

    print("error")
