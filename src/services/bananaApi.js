// src/services/bananaApi.js

export const fetchPuzzle = async () => {
  try {
    const response = await fetch(
      "https://marcconrad.com/uob/banana/api.php?out=json",
    )

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.question || data.solution === undefined) {
      throw new Error("Invalid data format received from API")
    }

    // --- FIX FOR CORS IMAGE BLOCK ---
    // The API returns a URL to sanfoh.com. We rewrite it to go through our Vite proxy.
    // It changes "https://www.sanfoh.com/uob/banana/..." to "/banana-image/uob/banana/..."
    const proxyImageUrl = data.question.replace(
      "https://www.sanfoh.com",
      "/banana-image",
    )

    return {
      image: proxyImageUrl, // Use the proxied URL
      solution: parseInt(data.solution, 10),
    }
  } catch (error) {
    console.error("Banana API Fetch Failed:", error)
    throw error
  }
}
