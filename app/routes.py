import json
from flask import jsonify, request
from app import app, mongo


@app.route('/getserlist',  methods=['POST'])
def getserlist():
    listL = mongo.db.rutez.find({}, {'_id': 0, 'serial_name': 1, 'sim_class': 1})
    dictL = {}
    for it in listL:
        dictL[it['serial_name']] = it['sim_class']
    return jsonify(json.dumps(dictL)), 200

@app.route('/search',  methods=['POST'])
def search():
    content = request.get_json()
    listL = mongo.db.rutez.find({'$text': {'$search': content['formVal']}},
                                {'score': {'$meta': "textScore"}}).sort([ ['score', {'$meta': "textScore"}] ])
    resArr = []
    for it in listL:
        resArr.append(it['serial_name'])
    return jsonify(json.dumps(resArr)), 200

@app.route('/getsimular',  methods=['POST'])
def getsimular():
    content = request.get_json()
    listL = mongo.db.rutez.find_one({'serial_name': content['serName']})
    resArr = []
    searchRez = listL['sim_class']
    simArr =  mongo.db.rutez.find({'sim_class': searchRez}, {'_id': 0, 'serial_name': 1})
    for it in simArr:
        if it['serial_name'] != content['serName']:
            resArr.append(it['serial_name'])
    return jsonify(json.dumps(resArr)), 200