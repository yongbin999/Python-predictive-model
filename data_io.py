import json
import csv

#Data-Handling Methods

#return list of query strings
def readquery(filename):
	result = []
	csvquery = readcsv(filename)
	#print(csvquery)
	
	for item in csvquery:
		result.append({'input': {'csvInstance': item}})
	return result

# returns list
def readcsv(filename):
	reader = csv.reader(open(filename))
	
	result = []
	for row in reader:
	    key = row[0]
	    if key in result:
	        pass
	    result.append(row[1:])
	return result

def outputdata(data, filename):
	with open('./'+filename+'.csv', 'wb') as f:
    		writer = csv.writer(f)
		writer.writerow()
   		writer.writerows(filename)


