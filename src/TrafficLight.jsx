import React, { useState, useEffect } from 'react';
import '../src/scss/index.scss';

let colors = ["red", "yellow", "green"];

const TrafficLight = ({ addedColor, setAddedColor, cycle }) => {
    const [selectedColor, setSelectedColor] = useState("");

     // Regular expression to match valid CSS colors
    const colorRegex = /^(#([0-9a-fA-F]{3}){1,2}|(rgba?|hsla?)\([\d.,% ]+\)|[a-zA-Z]+)$/;

    useEffect(() => {
        if (addedColor != null && addedColor !== "" && colorRegex.test(addedColor)) {
            colors[(colors.length >= 3) ? 3 : 2] = addedColor;
            setAddedColor("");
        }
    }, [addedColor, setAddedColor]);

    useEffect(() => {
        let interval;
        if (cycle) {
            interval = setInterval(() => {
                setSelectedColor((prevColor) => {
                    const currentIndex = colors.indexOf(prevColor);
                    const nextIndex = (currentIndex + 1) % colors.length;
                    return colors[nextIndex];
                });
            }, 1000);
        }

        // Clearing the interval when the component unmounts or cycle is turned off
        return () => clearInterval(interval);
    }, [cycle]);

    return (
        <div className='traffic-light'>
            {colors.map((color, i) => (
                <div
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color }}
                    className={'light' + (selectedColor === color ? ' glow' : '')}
                ></div>
            ))}
        </div>
    );
};

export default TrafficLight;
