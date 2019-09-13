# -*- coding: utf-8 -*-
"""
Created on Wed Nov 15 14:27:57 2017

@author: Duggal
"""

import pandas as pd
import re

from nltk.corpus import stopwords
import nltk.stem.porter as port
from nltk.tokenize import word_tokenize

import sklearn.feature_extraction.text as fex
import sklearn.model_selection as mdl
import sklearn.naive_bayes as NB

def predict(predict):
    df = pd.read_csv("trainingSet/Reviews.tsv", delimiter='\t', quoting=3)
#    ------------ CLEANING DATA---------------
    corpus = []
    for i in range(df.shape[0]):
        r  = df["Review"][i]
        review = re.sub('[^a-zA-Z]', ' ', r)
        review = review.lower()
        review = review.split()
        ps     = port.PorterStemmer()
        review = [ps.stem(word) for word in review if not word in set(stopwords.words('english'))]
        review = ' '.join(review)
        corpus.append(review)
    
#    --------------- BAG OF DATA ------------
    cv = fex.CountVectorizer(max_features=1500)
    X  = cv.fit_transform(corpus).toarray()
    Y  = df.iloc[:, -1].values
    
    X_train, X_test, Y_train, Y_test = mdl.train_test_split(X, Y, random_state=0)
    
    classifier = NB.GaussianNB()
    classifier.fit(X_train, Y_train)
    predic     = classifier.predict(X_test)
    
#    score      = mdl.cross_val_score(classifier, X, Y)
#    print(np.mean(score)*100)
    
    rv = predict
    review = re.sub('[^a-zA-Z]', ' ', rv)
    review = review.lower()
    review = review.split()
    ps     = port.PorterStemmer()
    stop_words = set(stopwords.words('english'))
    removeStopWords = ["not" ,"needn't", "weren", "shouldn", "mightn't", "nor", "hadn", "shouldn't", "shan't", "aren't", "hadn't", "wasn", "wasn't", "don't", "haven't", "isn", "mustn't", "weren't", "wouldn", "no", "didn't", "hasn", "won't", "isn't", "ain", "wouldn't", "don", "couldn't", "didn", "hasn't"]
    addStopWords    = [""]
    ([stop_words.remove(i) for i in removeStopWords])
    ([stop_words.add(i) for i in addStopWords])
    review = [ps.stem(word) for word in review if not word in stop_words]
#    review = [ps.stem(word) for word in review if not word in set(stopwords.words('english'))]
    review = ' '.join(review)
    corpus.append(review)
    X      = cv.fit_transform(corpus).toarray()
    review = X[-1]
    predic = classifier.predict([review])
    return predic
    
if __name__ == '__main__':
    predict("Not Good")
