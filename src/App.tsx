import { useState } from "react";
import "./App.css";

function App() {
  const [searchWord, setSearchWord] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [freshSynonyms, setFreshSynonyms] = useState<string[]>([]);

  const fetchSynonyms = async (word: string): Promise<string[]> => {
    const apiUrl = `https://api.datamuse.com/words?rel_syn=${word}`;

    try {
      setIsSearching(true);
      // Fetch the synonyms from the API
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Define the expected structure of each item in the response
      const data: { word: string }[] = await response.json();

      if (data.length > 0) {
        // Extract the synonyms as an array of strings
        const synonyms = data.map((entry) => entry.word);
        setFreshSynonyms(synonyms);
        return synonyms;
      } else {
        console.log(`No synonyms found for "${word}".`);
        return [];
      }
    } catch (error) {
      console.error("Failed to fetch synonyms:", error);
      return [];
    } finally {
      // slow it down to see the baking message
      setTimeout(() => setIsSearching(false), 1000);
    }
  };

  const handleSearch = async () => {
    fetchSynonyms(searchWord);
  };

  return (
    <>
      <h2>Mmm, synonym rolls. Just like grammar used to make.</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          placeholder="Type a word here..."
          onChange={(e) => setSearchWord(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          disabled={isSearching}
          style={{
            fontSize: "1rem",
            marginRight: "1rem",
            lineHeight: "2.5",
            border: "1px solid white",
            borderRadius: "10px",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
          }}
        />
        <button
          type="button"
          disabled={isSearching || !searchWord}
          className="button--primary"
          onClick={() => handleSearch()}
        >
          Bake 🔥
        </button>
      </div>
      {isSearching && <p style={{ marginTop: "2rem" }}>🔥 Baking...</p>}
      {!isSearching && freshSynonyms.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              display: "flex",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
              fontSize: "1.5rem",
            }}
          >
            {freshSynonyms.slice(0, 6).map((synonym, index) => (
              <li key={index} style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={`public/cinnamon-roll.png`}
                  alt={"cinnamon roll"}
                  style={{
                    marginInline: ".75rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  height="24"
                />
                {synonym}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
