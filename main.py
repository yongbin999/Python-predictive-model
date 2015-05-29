#!/usr/bin/env python
import httplib2
import json
import pickle
import pprint
from data_io import *
from google.appengine.ext import webapp
from google.appengine.api import memcache
from apiclient.discovery import build
from oauth2client.client import AccessTokenRefreshError
from oauth2client.client import OAuth2WebServerFlow
from oauth2client.appengine import StorageByKeyName
from oauth2client.appengine import CredentialsModel

# my project access info
from access import *


# main default handler
class MainPage(webapp.RequestHandler):
  def post(self):
    self.get()

  def get(self):
     # check if credential already setup
     credentials = StorageByKeyName(CredentialsModel, USER_AGENT,
                                   'credentials').locked_get()

     if not credentials or credentials.invalid:
	flow = OAuth2WebServerFlow(
			client_id=client_id,
			client_secret=client_secret,
                        scope=scope,
			user_agent=USER_AGENT,
			access_type = 'offline',
			approval_prompt='force',
			redirect_uri=self.request.relative_url('/auth_return')
		)
	authorize_url = flow.step1_get_authorize_url()

	memcache.set('a', pickle.dumps(flow))
	self.redirect(authorize_url)

     else:  
       try:
	#"2nd around after getting auth, now do the query"
	print("2nd around after getting auth, now do the query\n")


	# read query.csv returns list of query bodys
	bodyitems = readquery('query.csv')
	print("query lines: " +json.dumps(bodyitems) +'\n')

	http = credentials.authorize(httplib2.Http())
	service = build('prediction', 'v1.6', http=http)	


	for items in bodyitems:
		result = service.trainedmodels().predict(
			project=projid, id=modelid, body=items).execute()

		querystring = json.dumps(items['input']['csvInstance'])
		response_result = 'Result: ' + json.dumps(result['outputLabel'])
		# cant write in appengine outputdata(result, 'output')
		print(querystring + " " +response_result +'\n')

		self.response.headers['Content-Type'] = 'text/plain'
     		self.response.out.write(querystring + " " +response_result +'\n')

       except Exception, err:
	err_str = str(err)
	self.response.out.write(err_str)


# auth handeler
class AuthHandler(webapp.RequestHandler):
  def get(self):
    # loads credential from memory, if valid then allset to make query
    flow = pickle.loads(memcache.get('a'))
    if flow:
      credentials = flow.step2_exchange(self.request.params)
      StorageByKeyName(CredentialsModel, USER_AGENT,
                       'credentials').locked_put(credentials)
      self.redirect('/')
    else:
      raise('unable to obtain OAuth 2.0 credentials')


# apps route handler
app = webapp.WSGIApplication([
    ('/', MainPage),
    ('/auth_return', AuthHandler),
], debug=True)




