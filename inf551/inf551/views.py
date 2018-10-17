from pyramid.view import view_config


@view_config(route_name='home', renderer='templates/layout.jinja2')
def my_view(request):
	# cur = request.db['users'].find()
	return {'project': 'inf551'}
