import React, { useEffect, useState } from "react";

const queryURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

function Popup(props) {
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    if (props.selectedRecipe) {
      fetch(queryURL + props.selectedRecipe.idMeal)
        .then((res) => res.json())
        .then((data) => {
          setRecipeData(data.meals[0]);
        })
        .catch((error) => {
          console.log("Error fetching recipe:", error);
        });
    }
  }, [props.selectedRecipe]);

  if (props.popup && recipeData) {
    return (
      <div className="popup">
        <img src={props.selectedRecipe.strMealThumb} alt="" />
        <h2>{props.selectedRecipe.strMeal}</h2>
        <p>{recipeData.strInstructions}</p>
      </div>
    );
  } else {
    return null;
  }
}

export default Popup;
