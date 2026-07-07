async function translateText() {
    try {
        const text = "my name is kone ramlal suresh";

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|te`;
        

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }

        const data = await res.json();

        console.log("Translated Text:", data.responseData.translatedText);

    } catch (error) {
        console.error(error);
    }
}

translateText();