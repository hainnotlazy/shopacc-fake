import * as fs from "fs";
import puppeteer from "puppeteer";
import { Skin } from "./schema";

const SKINS_IMAGE_DIR = "skins";
const SKINS_RESOURCE_URLs = [
	"https://lol.fandom.com/wiki/Category:Champion_Skin_Loading_Screens",
	"https://lol.fandom.com/wiki/Category:Champion_Skin_Loading_Screens?filefrom=Skin+Loading+Screen+Classic+Brand.jpg",
	"https://lol.fandom.com/wiki/Category:Champion_Skin_Loading_Screens?filefrom=Skin+Loading+Screen+Dark+Cosmic+Jhin.jpg",
	"https://lol.fandom.com/wiki/Category:Champion_Skin_Loading_Screens?filefrom=Skin+Loading+Screen+Gun+Goddess+Miss+Fortune.jpg",
	"https://lol.fandom.com/wiki/Category:Champion_Skin_Loading_Screens?filefrom=Skin+Loading+Screen+Mundo+Mundo.jpg",
	"https://lol.fandom.com/wiki/Category:Champion_Skin_Loading_Screens?filefrom=Skin+Loading+Screen+Totemic+Maokai.jpg",
];

async function crawlChampionsData() {
	const skins: Skin[] = [];
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	try {
		for (const url of SKINS_RESOURCE_URLs) {
			await page.goto(url, {
				waitUntil: "networkidle2",
			});
			await page.setViewport({ width: 1080, height: 1024 });

			const data = await page.evaluate(() => {
				const boxes = document.querySelectorAll(".gallerybox");

				const data: Skin[] = [];

				boxes.forEach(box => {
					const image = box.querySelector("img") as HTMLImageElement;
					const imageName = (image.getAttribute("data-image-name") as string)
						.replace(/Skin Loading Screen /, "")
						.replace(/.jpg/, "");

					const imageSource =
						(image.getAttribute("data-src") as string) ?? (image.getAttribute("src") as string);
					const match = imageSource.match(/.+\.jpg/);
					const baseImageUrl = match ? match[0] : "";

					data.push({
						name: imageName,
						image: baseImageUrl,
					});
				});

				return data;
			});

			skins.push(...data);
		}

		await browser.close();

		// Handle to save data
		saveData(skins);
	} catch (err) {
		await browser.close();
	}
}

function saveData(data: Skin[]) {
	if (!fs.existsSync(SKINS_IMAGE_DIR)) {
		fs.mkdirSync(SKINS_IMAGE_DIR);
	}

	fs.writeFileSync(`${SKINS_IMAGE_DIR}/skins.json`, JSON.stringify(data, null, 2), {
		encoding: "utf8",
		flag: "w",
	});
}

crawlChampionsData();
