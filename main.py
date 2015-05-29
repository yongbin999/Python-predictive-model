#!/usr/bin/env python
import httplib2
from google.appengine.ext import webapp
import json
import pickle

from google.appengine.api import memcache
from apiclient.discovery import build
from oauth2client.client import AccessTokenRefreshError
from oauth2client.client import OAuth2WebServerFlow
from oauth2client.appengine import StorageByKeyName
from oauth2client.appengine import CredentialsModel


client_id = '243659480938-dhm2hfpti0gmvbvsntue8ipgcq9gnb1h.apps.googleusercontent.com'
client_secret = 'wdwckrdBZTK0ypOOjm7m_7JB'
score = 'https://www.googleapis.com/auth/prediction'
USER_AGENT = 'testlang'

class MainPage(webapp.RequestHandler):
  def post(self):
    '''Use the same logic for posts and gets.'''
    self.get()

  def get(self):

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

     try:
	#"2nd around after getting auth, now do the query"
	print("2nd around after getting auth, now do the query")
	
	http = credentials.authorize(httplib2.Http())
	service = build('prediction', 'v1.6', http=http)
	print(service)

	result = service.trainedmodels().predict(project='243659480938', id='testlang', body={'input': {'csvInstance': ['hello']}}).execute()
	print("whats the problem")
	print(service)
	
	self.response.headers['Content-Type'] = 'text/plain'
     	self.response.out.write('Result: ' + json.dumps(result['outputLabel']))
     except Exception, err:
	err_str = str(err)
	self.response.out.write(err_str)


class AuthHandler(webapp.RequestHandler):
  def get(self):
    flow = pickle.loads(memcache.get('a'))
    if flow:
      credentials = flow.step2_exchange(self.request.params)
      StorageByKeyName(CredentialsModel, USER_AGENT,
                       'credentials').locked_put(credentials)
      self.redirect('/')
    else:
      raise('unable to obtain OAuth 2.0 credentials')

app = webapp.WSGIApplication([
    ('/', MainPage),
    ('/auth_return', AuthHandler),
], debug=True)




