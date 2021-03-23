import syllabaire from "./assets/kana.json";

function getRandomKana(
	kanatype: "hira" | "kata" = "hira"
): { kana: string; romaji: string } {
	const keys = Object.keys(syllabaire);
	const randomKey = keys[Math.floor(Math.random() * keys.length)];
	return { kana: (syllabaire as any)[randomKey][kanatype], romaji: randomKey };
}

export { getRandomKana };
