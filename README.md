# Python-predictive-model
using google predictive model API and output prediction with python script
<hr>

<h3>Traning Docs</h3>
<hr>
<h4>-sample training on language prediction api</h4>
https://cloud.google.com/prediction/docs/hello_world
<br>
<h4>-try out the cloud predictive spreadsheet</h4>
https://docs.google.com/spreadsheet/ccc?key=0AisEGDqMba8MdFlMSmcyaXBfT1dUN1dPLTZXNUd3WUE#gid=7
<br>
<h4>-try out the hosted models examples </h4>
projectnumber:414649711441
<br>model:sample.languageid
<br>https://developers.google.com/apis-explorer/?hl=en_US#p/prediction/v1.6/prediction.hostedmodels.predict

<h4>-clone and modified to work with clientid/secret </h4>
https://github.com/GoogleCloudPlatform/prediction-try-java-python

<br> figured out flow in OAuth2.0 to allow request access
<br> once have access stored in backend, then you can make requests

<hr>
<h3> my python script: main.py</h3>
usage:
<li> script: use the ./run.py to automate below</li>
<li> manual: while inside the folder and have google_appengine at home directory, in terminal run
<br> ~/google_appengine/dev_appserver.py ./ </li>
<br> open browser at http://localhost:8080
<li> it would ask to auth access for OAuth2 for the first time</li>
<li> click accpet and it would query and display results</li>
<li> to add/modify the query prediction, change the query.csv </li>

<br> file description:
<li> run.py - script to start server and browser</li>
<li> main.py - codes for server and query</li>
<li> data_io.py - codes for processing csv query</li>
<li> access.py - variable for accessing models in google prediction api</li>
<li> dataset sat scores- https://catalog.data.gov/dataset/sat-results-e88d7

<br> functional design:
<li> routes setup at the bottom</li>
<li> on default /, directs to MainPage </li>
<li> if credential doesnt exist, opens up flow in OAuth and redirects to AuthHandler
<br> AuthHandler checks if credential exists, if so returns to main</li>
<li> if credential already done, then process those the query for each row in query.csv</li>
