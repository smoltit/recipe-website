import React, { useEffect, useState } from "react";
import Popup from "./Popup";

const queryURL = "https://www.themealdb.com/api/json/v1/1/";

function Recipe(props) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [popup, setPopup] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (props.showFav) {
      if (props.filteredFavorites.length > 0) {
        setRecipes(props.filteredFavorites);
      } else {
        setRecipes([]);
      }
    } else {
      fetch(queryURL + props.filter)
        .then((res) => res.json())
        .then((data) => {
          if (data != null) setRecipes(data.meals);
          console.log(recipes);
          for (var x of recipes) {
            x.checked = false;
          }
        })
        .catch((error) => {
          console.log("Error fetching recipes:", error);
        });
    }
  }, [props.filter, props.showFav, props.filteredFavorites]);
  
  function handleRecipeClick(recipe) {
    setSelectedRecipe(recipe);
    console.log(selectedRecipe);
    setPopup(true);
  }
  if (props.surprise === true) {
    fetch(queryURL + "random.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.meals && data.meals.length > 0) {
          handleRecipeClick(data.meals[0]);
          props.surpriseMe();
        } else {
          console.log("No meals found");
        }
      })
      .catch((error) => {
        console.log("Error fetching recipe:", error);
      });
  }

  function handleCheck(recipe) {
    if (!props.favorites.find((element) => element.idMeal === recipe.idMeal)) {
      props.setFavorites([...props.favorites, recipe]);
    } else {
      props.setFavorites(
        props.favorites.filter((element) => element.idMeal !== recipe.idMeal)
      );
    }
    recipe.checked = !recipe.checked;
    console.log(props.favorites);
  }

  return (
    <div className="recipes">
      <div className={`iframe ${popup ? "" : "disabled"}`} onClick={() => setPopup(!popup)}></div>
      {recipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} onClick={() => handleRecipeClick(recipe)}/>
            <div className="bottom">
              <h2>{recipe.strMeal}</h2>
              <input type="checkbox" id={`cb-${recipe.idMeal}`} checked={recipe.checked} onClick={() => handleCheck(recipe)}/>
              <label className="heart" htmlFor={`cb-${recipe.idMeal}`}></label>
            </div>
          </div>
        ))}

      <Popup selectedRecipe={selectedRecipe} popup={popup} setPopup={setPopup} favorites={props.favorites} handleCheck={handleCheck} />
    </div>
  );
}

export default Recipe;
