import httplib2, webapp2

from oauth2client.appengine import AppAssertionCredentials
from apiclient.discovery import build

scope = 'https://www.googleapis.com/auth/prediction'

class MakePrediction(webapp2.RequestHandler):
  def get(self):
     try:
      http = AppAssertionCredentials(scope).authorize(httplib2.Http())
      service = build('prediction', 'v1.6', http=http)
   
      result = service.trainedmodels().predict(project='243659480938', id='testlang', body={'input': {'csvInstance': ['hello']}}).execute()
      print("whats the problem" +result)

      self.response.headers['Content-Type'] = 'text/plain'
      self.response.out.write('Result: ' + repr(result))
     except Exception, err:
     	err_str = str(err)
	self.response.out.write(err_str)


app = webapp2.WSGIApplication([
      ('/makePrediction', MakePrediction),
], debug=True)