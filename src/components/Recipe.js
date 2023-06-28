import React from "react";

function Recipe() {
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