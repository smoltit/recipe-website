import React, { useEffect, useState, useCallback } from "react";
import Popup from "./Popup"
import heart_empty_black from "../images/heart_empty_black.png"

const queryURL = "https://www.themealdb.com/api/json/v1/1/";

function Recipe(props) {

    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [popup, setPopup] = useState(false);
    // const [favorites, setFavorites] = useState([]);

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch(queryURL + props.filter)
        .then((res) => res.json())
        .then((data) => {
            if (data != null)
            setRecipes(data.meals);
        })
        .catch((error) => {
            console.log("Error fetching recipes:", error);
        });
    }, [props.filter]);
    if (props.surprise === true) {
        fetch(queryURL + "random.php")
          .then((res) => res.json())
          .then((data) => {
            if (data.meals && data.meals.length > 0) {
                handleRecipeClick(data.meals[0]);
                props.surpriseMe();
            }
          })
          .catch((error) => {
            console.log("Error fetching random recipe:", error);
          });
        }
      
      function handleRecipeClick(recipe) {
        setSelectedRecipe(recipe);
        setPopup(true);
      }
      function handleCheck(recipe) {
        if (!props.favorites.find(element => element.idMeal === recipe.idMeal)){
          props.setFavorites([...props.favorites, recipe]);
          console.log(props.favorites);
        }
        else {
          props.setFavorites(props.favorites.filter(element => element.idMeal !== recipe.idMeal));
        }
      }
    return (
      <div className="recipes">

        <div className={`iframe ${popup ? "" : "disabled"}`} onClick={() => setPopup(!popup)}></div>
        
        {recipes && recipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe">
          <img src={recipe.strMealThumb} alt={recipe.strMeal}  onClick={() => handleRecipeClick(recipe)} />
          <div className="bottom">
            <h2>{recipe.strMeal}</h2>
            <input type="checkbox" id={`cb-${recipe.idMeal}`} defaultChecked={!props.favorites.find(element => element.idMeal === recipe.idMeal) ? false : true} onClick={() => handleCheck(recipe)}/>
            <label className="heart" htmlFor={`cb-${recipe.idMeal}`}></label>
          </div>
          </div>
        ))}
        <Popup selectedRecipe={selectedRecipe} popup={popup} setPopup={setPopup} />
      </div>
    );
}

export default Recipe;
