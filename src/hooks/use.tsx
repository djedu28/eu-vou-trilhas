// useScreenSize.js
import { useState, useEffect } from 'react';

const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        // Limpa o event listener quando o componente desmonta
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // O array vazio significa que o effect só será executado uma vez, no mount do componente

    return screenSize;
};

export default useScreenSize;
