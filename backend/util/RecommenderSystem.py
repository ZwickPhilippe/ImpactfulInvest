import pandas as pd
import numpy as np
from typing import List, Tuple


ItemPairType = Tuple[str, str]
IDENTIFIER = 'ISIN_BC'


class Recommender:
    items: pd.DataFrame
    model: np.ndarray

    def __init__(self, data_source: pd.DataFrame, gamma: float = 0.4):
        self.items = data_source
        self.gamma = gamma
        self.model = None
    
    
    def getCompareSuggestion(self) -> ItemPairType:
        if self.model is None:
            data = self.items.values[:, 1:]
        else:
            data = self.items.values[:, 1:]
            vector_proj = (np.dot(data, self.model) / np.dot(self.model, self.model))[:, None] * self.model
            # Subtract the projection from the original vector to get the vector in the plane
            data = data - vector_proj

        max_distance = 0
        farthest_pair_indices = (None, None)
        
        for i in range(len(data)):
            # Calculate the distances from the current point to all other points
            distances = np.linalg.norm((data[i] - data).astype(np.float32), axis=1)
            
            # Find the farthest point from the current one
            farthest_point_index = distances.argmax()
            distance = distances[farthest_point_index]
            
            # Update the max distance and the farthest pair of indices
            if distance > max_distance and i != farthest_point_index:
                max_distance = distance
                farthest_pair_indices = (i, farthest_point_index)
        
        return self.items.values[farthest_pair_indices[0], 0], self.items.values[farthest_pair_indices[1], 0]
    
    
    def updatePreferences(self, pair: ItemPairType, preference: bool):
        # Update preferences based on user's decision
        # TODO: Update the model with the new data
        id1, id2 = pair
        item1 = self.items[self.items[IDENTIFIER] == id1].values[0][1:]
        item2 = self.items[self.items[IDENTIFIER] == id2].values[0][1:]

        delta = item2 - item1
        delta /= np.linalg.norm(delta)

        if self.model is None:
            self.model = np.zeros_like(delta)
        
        if preference:
            new_model = self.model * (1-self.gamma) + delta * self.gamma
        else:
            new_model = self.model * (1-self.gamma) - delta * self.gamma

        self.model = new_model / np.linalg.norm(new_model)

        print(self.model)


    def getScores(self) -> np.ndarray:
        if self.model is None:
            scores = np.linalg.norm(self.items.values[:, 1:].astype(np.float32), axis=1)
        else:
            data = self.items.values[:, 1:].astype(np.float32)
            scores = np.dot(data, self.model) / np.dot(self.model, self.model)
        
        return scores
        

    def getRecommendation(self, n: int = 5, deterministic: bool = True) -> np.ndarray:
        scores = self.getScores()
        if deterministic:
            return np.array(self.items[IDENTIFIER][np.argsort(scores)[::-1][:n]])
        else:
            probs = scores / scores.sum()
            print(probs)
            return np.random.choice(self.items['name'], size=n, p=probs)
        
    def getPreferences(self):
        # softmax of model
        params = self.model.astype(np.float32)
        Z = np.exp(params).sum()
        ps = np.exp(params) / Z
        return {k: ps[i] for i, k in enumerate(self.items.keys()[1:])}


if __name__ == '__main__':
    IDENTIFIER = 'name'
    recommender = Recommender(pd.read_csv('C:/Users/laure/OneDrive/Desktop/StartHack/RecommenderSystem/clustered_dummy_data.csv'))
    print(recommender.getCompareSuggestion())
    print(recommender.getRecommendation())
    while True:
        print("-"*50)
        query = recommender.getCompareSuggestion()
        print(query)
        answer = input('Which one do you prefer? [0 or 1]\n > ')
        recommender.updatePreferences(query, bool(int(answer)))
        print("Recommendation: ", recommender.getRecommendation(deterministic=True, n=20))
        print("Model: ", recommender.getPreferences())
    