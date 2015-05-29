#!/usr/bin/env python
import webapp2
from predict import *

from apiclient.discovery import build
from oauth2client.client import AccessTokenRefreshError
from oauth2client.client import OAuth2WebServerFlow

client_id = '243659480938-dhm2hfpti0gmvbvsntue8ipgcq9gnb1h.apps.googleusercontent.com'
client_secret = 'wdwckrdBZTK0ypOOjm7m_7JB'
scope = 'https://www.googleapis.com/auth/prediction'


class MainPage(webapp2.RequestHandler):
    def get(self):
	flow = OAuth2WebServerFlow(
			client_id=client_id,
			client_secret=client_secret,
                        scope=scope,
			access_type = 'offline',
			approval_prompt='force',
			redirect_uri=self.request.relative_url('/auth_return')
		)
	authorize_url = flow.step1_get_authorize_url()

	print("lallaaalalala  " + authorize_url)
	self.redirect(authorize_url)


app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/auth_return', MakePrediction),
], debug=True)