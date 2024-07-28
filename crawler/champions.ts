import * as fs from "fs";
import puppeteer from "puppeteer";
import { Champion } from "./schema";

const CHAMPIONS_IMAGE_DIR = "champions";
const CHAMPIONS_RESOURCE_URLs = [
	"https://lol.fandom.com/wiki/Category:Champion_Square_Images",
	"https://lol.fandom.com/wiki/Category:Champion_Square_Images?filefrom=YuumiSquare.png",
];

async function crawlChampionsData() {
	const champions: Champion[] = [];
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	try {
		for (const url of CHAMPIONS_RESOURCE_URLs) {
			await page.goto(url, {
				waitUntil: "networkidle2",
			});
			await page.setViewport({ width: 1080, height: 1024 });

			const data = await page.evaluate(() => {
				const boxes = document.querySelectorAll(".gallerybox");

				const data: Champion[] = [];

				boxes.forEach(box => {
					const image = box.querySelector("img") as HTMLImageElement;
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

		await browser.close();

		// Handle to save data
		saveData(champions);
	} catch (err) {
		await browser.close();
	}
}

function saveData(data: Champion[]) {
	if (!fs.existsSync(CHAMPIONS_IMAGE_DIR)) {
		fs.mkdirSync(CHAMPIONS_IMAGE_DIR);
	}

	fs.writeFileSync(`${CHAMPIONS_IMAGE_DIR}/champions.json`, JSON.stringify(data, null, 2), {
		encoding: "utf8",
		flag: "w",
	});
}

crawlChampionsData();
