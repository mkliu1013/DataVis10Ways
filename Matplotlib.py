%matplotlib inline
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

data = pd.read_csv("/Users/minkunliu/Desktop/cars/cars-sample.csv");
groups = data.groupby('Manufacturer');
fig, ax = plt.subplots()
color = {
    "bmw": "Pink",
    "ford": "Olive",
    "honda": "Green",
    "mercedes": "Cyan",
    "toyota": "Violet",
}

for i, (name, group) in enumerate(groups):
    group.plot(kind='scatter',
               x='Weight',
               y='MPG',
               alpha=0.5,
               ylim=((9, 52)),
               xlim=((1500, 5000)),
               label=name,
               ax=ax,
               s=group['Weight']*0.01,
               color=color[name]);
