import React, { Component, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Isotope from 'isotope-layout';
import './style.css';


// Container for isotope grid
function ItemGrid (props) {


   const isoRef = useRef();
    const [isotope, setIsotope] = useState(null);

    useEffect(() => {
        if (isotope)
            isotope.reloadItems();
        else
            setIsotope(new Isotope( isoRef.current ));
    })

    return (
        <div ref={isoRef}>
            {props.children}
        </div>
    )
}

export default ItemGrid;