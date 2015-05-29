import httplib2, webapp2

from oauth2client.appengine import AppAssertionCredentials
from apiclient.discovery import build

scope = 'https://www.googleapis.com/auth/prediction'

http = AppAssertionCredentials(scope).authorize(httplib2.Http())
service = build('prediction', 'v1.6', http=http)
    
class MakePrediction(webapp2.RequestHandler):
    def get(self):
      result = service.trainedmodels().predict(project='243659480938', id='trainlang', body={'input': {'csvInstance': ['hello']}}).execute()

      self.response.headers['Content-Type'] = 'text/plain'
      self.response.out.write('Result: ' + repr(result))

app = webapp2.WSGIApplication([
      ('/makePrediction', MakePrediction),
], debug=True)