import React, { useEffect, useState } from "react";
import SHARE from "../images/link.png"

const queryURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

function Popup(props) {
    const [recipeData, setRecipeData] = useState(null);
    const [link, setLink] = useState("");

    useEffect(() => {
      if (props.selectedRecipe) {
        fetch(queryURL + props.selectedRecipe.idMeal)
          .then((res) => res.json())
          .then((data) => {
            setRecipeData(data.meals[0]);
            console.log(data.meals[0])
            setLink(data.meals[0].strSource || data.meals[0].strYoutube)
          })
          .catch((error) => {
            console.log("Error fetching recipe:", error);
          });
      }
    }, [props.selectedRecipe]);
  
    if (props.popup && recipeData) {
      return (
        <div className="popup">
          <div className="close " onClick={() => props.setPopup(false)}></div>
          <img src={props.selectedRecipe.strMealThumb} alt="" />
          <div className="buttons">
            <a href={link} target="_blank"><img src={SHARE} alt="" /></a>
            <input type="checkbox" defaultChecked={!props.favorites.find((element) => element.idMeal === props.selectedRecipe.idMeal)? false: true} id={`cb-${props.selectedRecipe.idMeal}`} onClick={() => props.handleCheck(props.selectedRecipe)}/>  
            <label className="heart" htmlFor={`cb-${props.selectedRecipe.idMeal}`}></label>
          </div>
          <div className="sticky">
            <h2>{props.selectedRecipe.strMeal}</h2>
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

