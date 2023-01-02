import React from "react";
import { useEffect } from "react";

const Favorites = () => {
    useEffect(()=> {
        document.title = 'Notedly - Favorites'
    })
    return (
        <p>These are my Favorites.</p>
    );
};

export default Favorites;