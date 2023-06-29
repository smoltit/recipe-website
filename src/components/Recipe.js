import React from "react";
var queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";
const main = document.getElementById("rc");

function Recipe() {
    function returnRecipes(url) {
        fetch(url).then(res => res.json())
        .then(function(data) {
            console.log(data.meals);
            data.meals.forEach(element => {
                console.log(element);
                const div_card = document.createElement("div");
                div_card.setAttribute("class", "recipe");
                const image = document.createElement("img");
                image.src = element.strMealThumb;
                const div_bot = document.createElement("div");
                div_bot.setAttribute("class", "bottto,");
                const title = document.createElement("h2");
                title.innerHTML = `${element.strMeal}`
                const like = document.createElement("button");
                like.setAttribute("class", "heart");
                const heart = document.createElement("img");
                heart.src = "https://www.freeiconspng.com/uploads/heart-icon-14.png";
                div_card.appendChild(image);
                div_card.appendChild(div_bot);
                div_bot.appendChild(title);
                div_bot.appendChild(like);
                like.appendChild(heart);
                main.appendChild(div_card);
            });
        });
    }
    returnRecipes(queryURL);
    return (
        <div className="recipe">
            <img src={"https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg"} />
            <div className="bottom">
                <h2>Borscht</h2>
                <button className="heart"><img src={"https://www.freeiconspng.com/uploads/heart-icon-14.png"} alt="" /></button>
            </div>
        </div>
    );
}

export default Recipe;