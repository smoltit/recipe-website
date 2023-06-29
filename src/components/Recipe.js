import React, { useEffect, useState, useCallback } from "react";
import Popup from "./Popup"
import Form from "./Form";

const queryURL = "https://www.themealdb.com/api/json/v1/1/";

function Recipe(props) {

    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [popup, setPopup] = useState(false);

    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        fetch(queryURL + props.filter)
        .then((res) => res.json())
        .then((data) => {
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
    return (
        <div className="recipes">

            <div className={`iframe ${popup ? "" : "disabled"}`} onClick={() => setPopup(!popup)}></div>
            
            {recipes.map((recipe) => (
                <div key={recipe.idMeal} className="recipe" onClick={() => handleRecipeClick(recipe)}>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                <div className="bottom">
                    <h2>{recipe.strMeal}</h2>
                    <button className="heart">
                    <img src="https://www.freeiconspng.com/uploads/heart-icon-14.png" alt="Like" />
                    </button>
                </div>
                </div>
            ))}
            <Popup selectedRecipe={selectedRecipe} popup={popup} />
        </div>
    );
}

export default Recipe;
