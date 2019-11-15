# -*- coding: utf-8 -*-
"""
Created on Tue Oct 15 22:48:57 2019

@author: Tanvy
"""

from index import GetPDF

from flask import Flask
#from flask import render_template, url_for, flash, redirect
#
#from flask_form import RegestrationForm, LoginForm

app = Flask(__name__)

app.config['SECRET_KEY'] = '185552ee79b95239f18ed7c222d3ca5f'

posts = [
            {
                    'autor'   : 'Tanvy',
                    'title'   : 'ANN',
                    'content' : 'blog'
            },
            {
                    'autor'   : 'Tanvir',
                    'title'   : 'RNN',
                    'content' : 'blog2'
            }
        ]

@app.route('/upload')
def upload():
    pdfPath = "uploads/sample.pdf"    
    pdfObj = GetPDF(pdfPath)
    return(pdfObj.updateJson())

#@app.route("/about")
#def about():
#    return render_template('about.html', title='about')

if __name__ == '__main__':
    app.run(debug=True)