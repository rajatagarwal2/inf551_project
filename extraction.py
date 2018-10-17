import os
import taglib
import pdb
import pymongo
from pymongo import MongoClient
import json


client = MongoClient('18.207.211.25', 27017)
db = client.metadata

files = os.listdir("Songs-II") 


for file in files:
	song = taglib.File("/Users/rajat/Movies/Songs-II/" + file)
	song_tag = song.tags
	dic_tags = {}
	try: 
		for key, val in song_tag.items():
			if isinstance(val, list):
				dic_tags[key] = val[0]
			else:
				dic_tags[key] = val
	except:
		print(file)
	r = json.dumps(dic_tags)
	loaded_r = json.loads(r)
	try:
		db.records.insert(loaded_r)
	except:
	    print(file)
