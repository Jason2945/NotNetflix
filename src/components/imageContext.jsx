import React, { createContext, useState } from 'react';
// This allows the profile picture to stay through each page
export const ImageContext = createContext(null);

export const ImageProvider = ({ children }) => {
    const [imageData, setImageData] = useState('');

    return (
        <ImageContext.Provider value={{ imageData, setImageData }}>
            {children}
        </ImageContext.Provider>
    );
};