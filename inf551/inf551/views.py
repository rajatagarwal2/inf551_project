from pyramid.view import view_config
import pymongo
from pymongo import MongoClient


@view_config(route_name='home', renderer='templates/layout.jinja2')
def my_view(request):
	# cur = request.db['users'].find()
	return {'project': 'inf551'}

@view_config(route_name='search', request_method='POST', renderer='json')
def search(request):
	try:
		post_data = request.json_body
	except ValueError:
		post_data = data(request.POST)


	mongo_client = MongoClient('18.207.211.25', 27017)
	db = mongo_client.metadata
	
	if 'key' not in post_data or post_data['key'] == "" and post_data['key'] == None :
		return {'api_success': False, 'msg': 'illa'}
	
    
	if 'key' in post_data and post_data['key'] != "" and post_data['key'] is not None :
		#pdb.set_trace()
		search_song = post_data['key']
		#search_song = "Talaash"
		songs_res = db.records.find({'ALBUM' : search_song})
		#count_x =  db.records.find({'ALBUM' : search_song}).count()	
		#print(count_x)
		if songs_res:
			data = [songs for songs in songs_res]
		res_data = []
		for i in range(len(data)):
			return_data = {'album' : data[i]['ALBUM'],'artist' : data[i]['ARTIST'],'albumartist' : data[i]['ALBUMARTIST'], 'genre' : data[i]['GENRE'], 
			'title' : data[i]['TITLE']}
			res_data.append(return_data)

		return {'api_success': True, 'data': res_data}