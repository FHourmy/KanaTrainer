import syllabaire from "./assets/kana.json";

function getRandomKana(kanatype: "hira" | "kata" = "hira"): string {
	const keys = Object.keys(syllabaire);
	const randomKey = keys[Math.floor(Math.random() * keys.length)];
	return (syllabaire as any)[randomKey][kanatype];
}

export { getRandomKana };
