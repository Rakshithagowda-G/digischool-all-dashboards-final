import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export const LottiePlayer = ({ url, animationData, className }) => {
    const [fetchedData, setFetchedData] = useState(null);

    useEffect(() => {
        if (url && !animationData) {
            const fetchAnimation = async () => {
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    setFetchedData(data);
                } catch (error) {
                    console.error("Error loading Lottie animation:", error);
                }
            };

            fetchAnimation();
        }
    }, [url, animationData]);

    const finalData = animationData || fetchedData;

    if (!finalData) {
        return <div className={className} />; // Placeholder or loading state
    }

    return (
        <Lottie
            animationData={finalData}
            loop={true}
            className={className}
        />
    );
};
