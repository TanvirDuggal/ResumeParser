# -*- coding: utf-8 -*-a
"""
Created on Wed Apr  3 16:41:07 2019

@author: Duggal
"""

import PyPDF2
import re
import predict
import numpy as np
import json

from os import listdir
from os.path import isfile, join

class GetPDF:
    pdfPath     = ""
    pdf         = ""
    numPages    = 0
    content     = set()
    links       = set()
    phonenum    = set()
    email       = set()
    pointScored = []
    finalScored = {}
    fileName    = ""
    
    def __init__(self, pdfPath):
    
        files = [f for f in listdir(pdfPath) if isfile(join(pdfPath, f))]
        self.pdfPath = pdfPath
        for i in files:
            filePath = pdfPath + '/'+ str(i)
#        -------------- READING AND SETTING VALUES
            with open(filePath,'rb') as pdfObj:
                pdfReader = PyPDF2.PdfFileReader(pdfObj)
                print("===============" + " WORKING ON " + i + " ===============")
                self.fileName = i
                self.setNumPages(pdfReader.numPages)
                
                for i in range(self.getNumPages()):
                    self.setContent(pdfReader.getPage(i).extractText())
                    
                self.extractText()
        with open('Result/result.json', 'w') as fp:
            json.dump(self.finalScored, fp)
       
#        ------------------ EXTRACTING TEXT FROM PDF
        
    def extractText(self):
        for i in range(len(self.content)):
            lines = list(self.content)[i]
            lines = lines.split('\n')
            for i in lines:
                i = i.strip()
                if len(i) > 0:
                    print(i)
                    points = predict.predict(i)
                    print(points)
                    self.setPoints(points[0])
                    if len(self.FindEmail(i)) != 0:
                        self.setemail(i)
                    
                    if len(self.FindURL(i)) != 0:
    #                    print("=> " + i)
                        self.setLinks(i)
                    
        print(self.getemail())
        print(self.getLink())
        self.pointMaker()
    
#    ---------------- REGULAR EXPRESSSION FOR URL AND EMAIL
        
    def FindURL(self, string):  
        url = re.findall('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\), ]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', string)
#        url = re.findall("[-a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)", string) 
        return url 
    
    def FindEmail(self, string):
        emails = re.findall("([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)", string)
        return emails
    
    
    def pointMaker(self):
        if self.getNumPages() == 1:
            self.setPoints(2)
        elif self.getNumPages() == 2:
            self.setPoints(1)
            
        if(len(self.getemail()) > 0):
            self.setPoints(1)
            
        if(len(self.getContent()) > 1):
            self.setPoints(1)
            
        self.exportJSON()
            
#    --------------- RELEASE TO JSON FILE
            
    def exportJSON(self):
        self.finalScored[self.fileName] = self.getPoint()
    
#    -------------- GETTER SETTER OF CLASS
    def setNumPages(self, numPages):
        self.numPages = numPages
    
    def getNumPages(self):
        return self.numPages
    
    def setContent(self, content):
        self.content.add(content.strip())
    
    def getContent(self):
        return self.content
    
    def setLinks(self, link):
        self.links.add(link.strip())
    
    def getLink(self):
        return self.links
    
    def setemail(self, email):
        self.email.add(email.strip())
    
    def getemail(self):
        return self.email
    
    def setPoints(self, points):
        self.pointScored.append(points)
    
    def getPoint(self):
        return np.sum(self.pointScored)
    
    
def Main():
    pdfPath = "Sample"
    
    pdfObj = GetPDF(pdfPath)
#    print(pdfObj.getPoint())

    
if __name__ == '__main__':
    Main()