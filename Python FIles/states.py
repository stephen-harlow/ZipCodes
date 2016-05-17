import requests
import json
from urllib.request import urlopen
test = True
link = "https://rocky-sands-63107.herokuapp.com"
if test:
    link = "http://localhost:5000"
def addAll():
    file = open('states.txt', 'r')

    for line in file.readlines():
        t = requests.post(link + '/api/v1/addState/' + line.rstrip())

def removeAll():
    #https://rocky-sands-63107.herokuapp.com/api/v1/states
    t = requests.delete(link + "/api/deleteState")
    #
    # response = urlopen(link + "/api/v1/states").read().decode('utf8')
    # obj = json.loads(response)
    # for item in obj:
    #     t = requests.delete(link + "/api/deleteState/" + item["state"])
removeAll()
addAll()
