export const fetchWordDefinition = async (word) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    )

    if (!response.ok) {
      throw new Error("Word definition not found")
    }

    const data = await response.json()
    const entry = data[0]

    const phonetic = entry.phonetic || ""
    const partOfSpeech = entry.meanings[0].partOfSpeech
    const definition = entry.meanings[0].definitions[0].definition

    return { phonetic, partOfSpeech, definition }
  } catch (error) {
    console.error("Dictionary API error:", error)
    return {
      phonetic: "",
      partOfSpeech: "",
      definition: "Definition unavailable at this time.",
    }
  }
}
