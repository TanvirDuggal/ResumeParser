# -*- coding: utf-8 -*-
"""
Created on Thu Nov  7 19:10:39 2019

@author: Bashkar Sampath
"""

from flask import Flask
index = Flask(__name__)

import pathlib
pathlib.Path('./uploads').mkdir(parents=True, exist_ok=True) 
UPLOAD_FOLDER = './uploads'

app = Flask(__name__)
app.secret_key = "secret key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

@index.route("/")
def home():
    return "Hello, World!"
    
if __name__ == "__main__":
    index.run(debug=True)