import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import pickle
dataset = pd.read_csv("frontend/src/Components/ML_MODEL/Autisam/modified_Autism.csv")
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)
from sklearn.linear_model import LinearRegression
regressor = LinearRegression()
regressor.fit(X_train, y_train)
with open("ML/ml.pkl","wb") as fout:
    pickle.dump(regressor,fout)
