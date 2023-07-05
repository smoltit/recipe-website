import React, { useState, useEffect } from "react";
import IMG from "./images/cook.png";
import Recipe from "./components/Recipe";
import Form from "./components/Form";

function App() {
  const [filter, setFilter] = useState("filter.php?a=British");
  const [surprise, setSurprise] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFav, setShowFav] = useState(false);
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  function surpriseMe() {
    setSurprise(!surprise);
  }

  function searchRecipe(name) {
    if (showFav) {
      const lowercaseName = name.toLowerCase();
      const filtered = favorites.filter((text) =>
        text.strMeal.toLowerCase().includes(lowercaseName)
      );
      setFilteredFavorites(filtered);
    } 
    else {
      setFilter(`search.php?s=${name}`);
    }
  }

  useEffect(() => {
    if (showFav) {
      setFilteredFavorites(favorites);
    }
  }, [showFav, favorites]);
  

  return (
    <div className="App">
      <header>
        <a href=""><h2>Cooking Rookie</h2></a>
        <nav>
          <button onClick={() => setFilter("filter.php?c=Chicken")}>Chicken</button>
          <button onClick={() => setFilter("filter.php?c=Beef")}>Beef</button>
          <button onClick={() => setFilter("filter.php?c=Pork")}>Pork</button>
          <button onClick={() => setFilter("filter.php?c=Seafood")}>Seafood</button>
          <button onClick={() => setFilter("filter.php?c=Vegetarian")}>Vegetarian</button>
          <button onClick={() => setFilter("filter.php?c=Vegan")} href="">Vegan</button>
          <button onClick={() => setFilter("filter.php?c=Dessert")}>Desserts</button>
        </nav>
        <input type="checkbox" id="topcheck" onClick={() => setShowFav(!showFav)}/>
        <label className="heart" htmlFor="topcheck"></label>
      </header>
      <main>
        <div className="welcome">
          <img src={IMG} />
          <div className="rookie-text">
            <h1>Cooking Rookie</h1>
            <p>Welcome to Cooking Rookie, your go-to destination for finding and saving incredible recipes.</p>
            <p>Whether you're an aspiring chef or just starting your culinary journey, we're here to guide you every step of the way.</p>
            <p>Join us today and let's explore the world of delicious flavors together!</p>
          </div>
        </div>

        <Form surpriseMe={surpriseMe} searchRecipe={searchRecipe} />
        <Recipe
          filter={filter}
          surprise={surprise}
          surpriseMe={surpriseMe}
          favorites={favorites}
          setFavorites={setFavorites}
          showFav={showFav}
          setShowFav={setShowFav}
          filteredFavorites={filteredFavorites}
          setFilteredFavorites={setFilteredFavorites}
        />
      </main>
    </div>
  );
}

export default App;
