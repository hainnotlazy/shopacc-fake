import puppeteer from "puppeteer";
import { Champion } from "./schema";
import * as path from "path";
import { saveData } from "./helper";

const CHAMPIONS_IMAGE_DIR = path.join(__dirname, "..", "champions");
const CHAMPIONS_FILE_NAME = "champions.json";
const CHAMPIONS_RESOURCE_URLs = [
	"https://lol.fandom.com/wiki/Category:Champion_Square_Images",
	"https://lol.fandom.com/wiki/Category:Champion_Square_Images?filefrom=YuumiSquare.png",
];

async function crawlChampionsData(headless: boolean = false) {
	const champions: Champion[] = [];
	const browser = await puppeteer.launch({ headless });
	const page = await browser.newPage();

	try {
		for (const url of CHAMPIONS_RESOURCE_URLs) {
			await page.goto(url, {
				waitUntil: "networkidle2",
			});
			await page.setViewport({ width: 1080, height: 1024 });

			const data = await page.evaluate(() => {
				const elements = document.querySelectorAll(".gallerybox");

				const data: Champion[] = [];

				elements.forEach(element => {
					const image = element.querySelector("img") as HTMLImageElement;
					const imageName = (image.getAttribute("data-image-name") as string).replace(
						/(Square.png|Square Unreleased.png)/,
						"",
					);
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

			champions.push(...data);
		}

		// Handle to save data
		saveData(champions, CHAMPIONS_IMAGE_DIR, CHAMPIONS_FILE_NAME);
	} catch (err) {
		console.error("Failed when crawling emotes");
	} finally {
		await browser.close();
	}
}

crawlChampionsData();
