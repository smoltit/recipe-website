import React, { useState, useEffect } from "react";

function Form(props) {
    const [search, setSearch] = useState("");
    function handleSurprise(event) {
        event.preventDefault();
        props.surpriseMe();
    }
    function handleFormSubmit(event) {
        event.preventDefault();
        props.searchRecipe(search);
    }
    function handleFormChange(event) {
        setSearch(event.target.value);
    }
    useEffect(() => {
      }, [search]);
    return(
        <form onSubmit={handleFormSubmit}>
            <input type="text" onChange={handleFormChange} placeholder="Search for a meal..."/>
            <button type="submit">Search</button>
            <button id="surprise" onClick={handleSurprise}>Surprise me!</button>
        </form>
    );
}
export default Form;