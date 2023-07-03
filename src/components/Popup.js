import React, { useEffect, useState } from "react";
import SHARE from "../images/link.png"

const queryURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

function Popup(props) {
    const [recipeData, setRecipeData] = useState(null);
    const [link, setLink] = useState("");
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
      if (props.selectedRecipe) {
        fetch(queryURL + props.selectedRecipe.idMeal)
          .then((res) => res.json())
          .then((data) => {
            setRecipeData(data.meals[0]);
            setLink(data.meals[0].strSource || data.meals[0].strYoutube)
            // setIngredients(data.meals[0].strIngredient);
            for (var x in data.meals[0]) {

            }
            const newArray = Object.entries(data.meals[0]).reduce((result, [key, value]) => {
              if (key.startsWith("strIngredient")) {
                const index = key.slice("strIngredient".length);
                if (value && value.trim() !== "") {
                  if (!result[index]) {
                    result[index] = { ingredient: value };
                  } else {
                    result[index].ingredient = value;
                  }
                }
              } else if (key.startsWith("strMeasure")) {
                const index = key.slice("strMeasure".length);
                if (value && value.trim() !== "") {
                  if (!result[index]) {
                    result[index] = { measure: value };
                  } else {
                    result[index].measure = value;
                  }
                }
              }
              return result;
            }, []);
            
            
            console.log(newArray);
            setIngredients(newArray);
            // console.log(recipeData)
          })
          .catch((error) => {
            console.log("Error fetching recipe:", error);
          });
      }
    }, [props.selectedRecipe]);

    function handleCheck(recipe) {
      props.handleCheck(recipe);
    }
  
    if (props.popup && recipeData) {
      return (
        <div className="popup">
          <div className="close " onClick={() => props.setPopup(false)}></div>
          <img src={props.selectedRecipe.strMealThumb} alt="" />
          <div className="botbut">
            <h2 className="mealname">{props.selectedRecipe.strMeal}</h2>
            <div className="buttons">
              <a href={link} target="_blank"><img src={SHARE} alt="" /></a>
              <input type="checkbox" checked={props.selectedRecipe.checked || false} id={`cb-${props.selectedRecipe.idMeal}l`} onChange={() => handleCheck(props.selectedRecipe)}/>  
              <label className="heart" htmlFor={`cb-${props.selectedRecipe.idMeal}l`}></label>
            </div>
          </div>
          <div className="sticky">
            <h2 className="both2">Ingredients</h2>
            <div className="ingredients">
              {ingredients.map((ingredient) => (
                <p>{`${ingredient.ingredient} ${ingredient.measure}`}</p>
              ))}
            </div>
            <h2 className="both2">Instructions</h2>
            {props.selectedRecipe.idMeal !== recipeData.idMeal && <p>Loading...</p>}
            {props.selectedRecipe.idMeal === recipeData.idMeal && <p>{recipeData.strInstructions}</p>}
          </div>
        </div>
      );
    } else {
      return null;
    }
}
  

export default Popup;

