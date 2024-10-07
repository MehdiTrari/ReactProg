import { useState, useEffect } from "react";

const VowelsButton = ({ onClick, isOnlyVowels }) => {
    const [count, setCount] = useState(0);

    // useEffect pour afficher le nombre de clics dans la console à chaque changement de count
    useEffect(() => {
        console.log('count:', count);
    }, [count]);

    // Incrémente le compteur de clics et appelle la fonction onClick reçue du parent
    const handleClick = () => {
        setCount(currentCount => currentCount + 1);
        onClick();
    };

    return (
        <>
        Le bouton a été utilis : {count} fois.
        <button onClick={handleClick} className="vowelsButton">
            {isOnlyVowels ? 'Afficher toutes les lettres' : 'Afficher seulement les voyelles'}
        </button>
        </>
    );
};

export default VowelsButton;
