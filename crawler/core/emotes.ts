import puppeteer from "puppeteer";
import { Emote } from "./schema";
import { saveData } from "./helper";
import * as path from "path";

const EMOTES_IMAGE_DIR = path.join(__dirname, "..", "emotes");
const EMOTES_FILE_NAME = "emotes.json";
const EMOTES_RESOURCE_URLs = [
	"https://leagueoflegends.fandom.com/wiki/Category:Emotes",
	"https://leagueoflegends.fandom.com/wiki/Category:Emotes?from=Dip+Emote.png",
	"https://leagueoflegends.fandom.com/wiki/Category:Emotes?from=I%27m+Comin%27+For+Ya+Emote.png",
	"https://leagueoflegends.fandom.com/wiki/Category:Emotes?from=My+Word+Emote.png",
	"https://leagueoflegends.fandom.com/wiki/Category:Emotes?from=Season+2020+-+Split+1+-+Platinum+Emote.png",
	"https://leagueoflegends.fandom.com/wiki/Category:Emotes?from=TFT+G%26G+Stage+I+Gold+Emote.png",
	"https://leagueoflegends.fandom.com/wiki/Category:Emotes?from=Untamable+Emote.png",
	"https://leagueoflegends.fandom.com/wiki/Category:Emotes?from=You+gonna+eat+that%3F+Emote.png",
];

async function crawlEmotesData(headless: boolean = false) {
	const emotes: Emote[] = [];
	const browser = await puppeteer.launch({ headless });
	const page = await browser.newPage();

	try {
		for (const url of EMOTES_RESOURCE_URLs) {
			await page.goto(url, {
				waitUntil: "networkidle2",
			});
			await page.setViewport({ width: 1080, height: 1024 });

			const data = await page.evaluate(() => {
				const elements = document.querySelectorAll(".category-page__member-thumbnail");
				const data: Emote[] = [];

				elements.forEach(element => {
					const image = element as HTMLImageElement;
					const imageName = (image.getAttribute("alt") as string).replace(/.png/, "");

					const imageSource =
						(image.getAttribute("data-src") as string) ?? (image.getAttribute("src") as string);
					const match = imageSource.match(/.+\.png/);
					const baseImageUrl = match ? match[0] : "";

					data.push({
						name: imageName,
						image: baseImageUrl,
					});
				});

				return data;
			});

			emotes.push(...data);
		}

		// Handle to save data
		saveData(emotes, EMOTES_IMAGE_DIR, EMOTES_FILE_NAME);
	} catch (err) {
		console.error("Failed when crawling emotes");
	} finally {
		await browser.close();
	}
}

crawlEmotesData();
