#!/usr/bin/env python
import multiprocessing
import webbrowser
import time
import os

class Server(multiprocessing.Process):
    def run(self):
        os.system("~/google_appengine/dev_appserver.py ./")
        raise

httpd = Server()
httpd.start()
time.sleep(1)
webbrowser.open_new("http://localhost:8080/")
time.sleep(1)
httpd.terminate()
httpd.join()
print "End"
