const Alphabets = ({ onlyVowels }) => {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const vowels = 'aeiouy'.split('');

    // Utiliser onlyVowels pour filtrer les lettres
    const filteredLetters = onlyVowels ? letters.filter(letter => vowels.includes(letter)) : letters;

    return (
        <ul className="letter-list">
            {filteredLetters.map((letter, index) => (
                <li key={index} className="letter-item">{letter}</li>
            ))}
        </ul>
    );
};

export default Alphabets;
