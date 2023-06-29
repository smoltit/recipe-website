import IMG from "/Users/macbook-air/Documents/sumtings/cook/src/cook.png";
import React from "react";
import Recipe from "./components/Recipe";

function App() {
  return (
    <div className="App">
      <header>
        <h2>Cooking Rookie</h2>
        <nav>
          <a href="">Middle Eastern</a>
          <a href="">Italian</a>
          <a href="">Ukrainian</a>
          <a href="">British</a>
          <a href="">Polish</a>
          <a href="">Gay</a>
          <a href="">Trans</a>
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
        <form>
          <input type="text" placeholder="Search for a meal..."/>
          <button type="submit">Search</button>
          <button>Surprise me!</button>
        </form>
        <div id="rc" className="recipes">
          <Recipe />
          {/* <Recipe />
          <Recipe />
          <Recipe />
          <Recipe /> */}
        </div>
      </main>
    </div>
  );
}

export default App;
