import React, { useState } from "react";
import IMG from "/Users/macbook-air/Documents/sumtings/cook/src/cook.png";
import Recipe from "./components/Recipe";
import Form from "./components/Form";

function App() {
  const [filter, setFilter] = useState("filter.php?c=Dessert");
  const [surprise, setSurprise] = useState(false)

  function surpriseMe() {
    setSurprise(!surprise);
    console.log(surprise);
  }
  function searchRecipe(name) {
    setFilter(`search.php?s=${name}`);
  }

  return (
    <div className="App">
      <header>
        <a href=""><h2>Cooking Rookie</h2></a>
        <nav>
          <a href="">Middle Eastern</a>
          <a href="">Italian</a>
          <a href="">Ukrainian</a>
          <a href="">British</a>
          <a href="">Polish</a>
        </nav>
        <button className="heart"><img src={"https://www.freeiconspng.com/uploads/heart-icon-14.png"} alt="" /></button>
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
        <Recipe filter={filter} surprise={surprise} surpriseMe={surpriseMe} />
      </main>
    </div>
  );
}

export default App;