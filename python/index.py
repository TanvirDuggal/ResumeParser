# -*- coding: utf-8 -*-a
"""
Created on Wed Apr  3 16:41:07 2019

@author: Duggal
"""

import PyPDF2
import numpy as np
import pandas as pd

from operator import xor

import json

from os import listdir
from os.path import isfile, join

class GetPDF:
    sizeOfFile = 0
    Links      = set()
    content    = []
    usedWords  = ''
    avoidWords = ''
    points     = 0
    path       = ""
    
    def __init__(self, filePath):
        self.path = filePath
        self.usedWords  = pd.read_csv('trainingSet/include.csv',    index_col=None)
        self.avoidWords = pd.read_csv('trainingSet/avoidWords.csv', index_col=None)
        self.usedWords  = self.usedWords.values.reshape(self.usedWords.shape[0])
        self.avoidWords = self.avoidWords.values.reshape(self.avoidWords.shape[0])
        
        fileObj = open(filePath, 'rb')
        pdfObj  = PyPDF2.PdfFileReader(fileObj)
#        print(pdfObj.numPages)
        for i in range(pdfObj.numPages):
            self.content.append(pdfObj.getPage(i).extractText())
        fileObj.close()
        self.parseLinks()
        
    def parseLinks(self):
        for c in self.content:
            c = c.split('\n') 
            for statem in c :
                self.points -= len([word for word in statem.split(' ') if word in self.avoidWords])
                self.points += len([word for word in statem.split(' ') if word in self.usedWords])        
        self.updateJson()
        
    def updateJson(self):
        data = {}
        data[str(self.path)] = self.points
        
        with open('result.txt') as js:
            dt = json.load(js)
#            print(dt)
        
        dt[str(self.path)] = self.points
        
        with open('result.txt', 'w') as js:
            json.dump(dt, js)
        

def Main():
    pdfPath = "Sample/sample4.pdf"    
    pdfObj = GetPDF(pdfPath)
    
if __name__ == '__main__':
    Main()