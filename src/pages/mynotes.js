import React, { useEffect } from "react";

const MyNotes = () => {
    useEffect(()=> {
        document.title = 'Notedly - MyNotes'
    })
    return (
        <p>These are my notes.</p>
    );
};

export default MyNotes;