from pyramid.view import view_config
import pymongo
from pymongo import MongoClient


@view_config(route_name='home', renderer='templates/layout.jinja2')
def my_view(request):
	# cur = request.db['users'].find()
	return {'project': 'inf551'}

@view_config(route_name='search', request_method='GET', renderer='json')
def search(request):
	query_dict = dict(request.GET)

	mongo_client = MongoClient('18.207.211.25', 27017)
	db = mongo_client.metadata

	if 'field'in query_dict:
		if 'key' not in query_dict or query_dict['key'] == "" and query_dict['key'] == None :
			return {'api_success': False, 'msg': 'Search key is empty'}
		else:
			search_field = query_dict['field']
			search_key = query_dict['key']

			cur = db.records.find({search_field: {'$regex': ".*" + search_key + ".*", '$options': 'i'}}, {'_id':0})
			songs = [x for x in cur]
			cur.close()
			return {'api_success': True, 'data': songs, 'count': len(songs), 'msg': 'Search is successful'}
	else:
		if 'key' not in query_dict or query_dict['key'] == "" and query_dict['key'] == None :
			return {'api_success': False, 'msg': 'Search key is empty'}
		else:
			search_song = query_dict['key']

			cur = db.records.find({'$or': [{'ALBUM': {'$regex': ".*" + search_song + ".*", '$options': 'i'}}, {'TITLE': {'$regex': ".*" + search_song + ".*", '$options': 'i'}}, {'ARTIST': {'$regex': ".*" + search_song + ".*", '$options': 'i'}}, {'COMPOSER': {'$regex': ".*" + search_song + ".*", '$options': 'i'}}]}, {'_id':0})
			songs = [x for x in cur]
			cur.close()

			return {'api_success': True, 'data': songs, 'count': len(songs), 'msg': 'Search is successful'}