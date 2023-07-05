import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import { useCookies } from "react-cookie";

const queryURL = "https://www.themealdb.com/api/json/v1/1/";

function Recipe(props) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [popup, setPopup] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [cookies, setCookies] = useCookies(["fav"]);

  useEffect(() => {
    if (props.showFav) {
      if (props.filteredFavorites.length > 0) {
        setRecipes(props.filteredFavorites.map(recipe => ({ ...recipe, checked: true })));
      } else {
        setRecipes([]);
      }
    } else {
      console.log(props.favorites);
      fetch(queryURL + props.filter)
        .then((res) => res.json())
        .then((data) => {
          if (data != null) {
            const newRecipes = data.meals.map(recipe => ({
              ...recipe,
              checked: props.favorites.some(favorite => favorite.idMeal === recipe.idMeal)
            }));
          
            if (props.favorites.length > 0) {
              setRecipes(newRecipes);
              console.log(props.favorites);
              console.log(newRecipes);
            }
            else setRecipes(data.meals);
          }
          
        })
        .catch((error) => {
          console.log("Error fetching recipes:", error);
        });
    }
  }, [props.filter, props.showFav, props.filteredFavorites, props.favorites]);

  useEffect(() => {
    if (props.favorites.length > 0) {
      setCookies("fav", JSON.stringify(props.favorites));
    } else {
      setCookies("fav", "");
    }
  }, [props.favorites, setCookies]);
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    console.log("Saved Favorites:", savedFavorites);
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        if (Array.isArray(parsedFavorites) && parsedFavorites.length > 0) {
          props.setFavorites(parsedFavorites);
        }
      } catch (error) {
        console.log("Error parsing favorites:", error);
      }
    }
  }, [props.setFavorites]);
  
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(props.favorites));
  }, [props.favorites]);
  
  
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
      recipe.checked = true; // Update the checked property
    } else {
      props.setFavorites(
        props.favorites.filter((element) => element.idMeal !== recipe.idMeal)
      );
      recipe.checked = false; // Update the checked property
    }
  }
  return (
    <div className="recipes">

      <div className={`iframe ${popup ? "" : "disabled"}`} onClick={() => setPopup(!popup)}></div>
      {recipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} onClick={() => handleRecipeClick(recipe)}/>
            <div className="bottom">
              <h2>{recipe.strMeal}</h2>
              <input type="checkbox" id={`cb-${recipe.idMeal}`} checked={recipe.checked} onChange={() => handleCheck(recipe)}/>
              <label className="heart" htmlFor={`cb-${recipe.idMeal}`}></label>
            </div>
          </div>
        ))}

      <Popup selectedRecipe={selectedRecipe} popup={popup} setPopup={setPopup} favorites={props.favorites} handleCheck={handleCheck} />
    </div>
  );
}

export default Recipe;
