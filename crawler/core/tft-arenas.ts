import puppeteer from "puppeteer";
import { TFTArena } from "./schema";
import { saveData } from "./helper";
import * as path from "path";

const ARENAS_IMAGE_DIR = path.join(__dirname, "..", "assets", "tft_arenas");
const ARENAS_FILE_NAME = "tft_arenas.json";
const ARENAS_RESOURCE_URLs = ["https://leagueoflegends.fandom.com/wiki/Category:TFT_Arena"];

async function crawlEmotesData(headless: boolean = false) {
	const tftArenas: TFTArena[] = [];
	const browser = await puppeteer.launch({ headless });
	const page = await browser.newPage();

	try {
		for (const url of ARENAS_RESOURCE_URLs) {
			await page.goto(url, {
				waitUntil: "networkidle2",
			});
			await page.setViewport({ width: 1080, height: 1024 });

			const data = await page.evaluate(() => {
				const elements = document.querySelectorAll(".category-page__member-thumbnail");
				const data: TFTArena[] = [];

				elements.forEach(element => {
					const image = element as HTMLImageElement;
					const imageName = (image.getAttribute("alt") as string)
						.replace(/(.jpg|.png)/, "")
						.replace("File:", "")
						.trim();

					const imageSource =
						(image.getAttribute("data-src") as string) ?? (image.getAttribute("src") as string);
					const match = imageSource.match(/.+(\.png|\.jpg)/);
					const baseImageUrl = match ? match[0] : "";

					data.push({
						name: imageName,
						image: baseImageUrl,
					});
				});

				return data;
			});

			tftArenas.push(...data);
		}

		// Handle to save data
		saveData(tftArenas, ARENAS_IMAGE_DIR, ARENAS_FILE_NAME);
	} catch (err) {
		console.error("Failed when crawling TFT Arenas");
	} finally {
		await browser.close();
	}
}

crawlEmotesData();
