function AlphabetButtons({ onLetterClick }: { onLetterClick: (letter: string) => void }) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
        {alphabet.map((letter) => (
          <button key={letter} onClick={() => onLetterClick(letter)} style={{ padding: "10px", fontSize: "16px" }}>
            {letter}
          </button>
        ))}
      </div>
    );
  }

export default AlphabetButtons;