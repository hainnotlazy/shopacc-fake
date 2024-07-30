import puppeteer from "puppeteer";
import { Icon } from "./schema";
import { saveData } from "./helper";
import * as path from "path";

const ICONS_IMAGE_DIR = path.join(__dirname, "..", "assets", "icons");
const ICONS_FILE_NAME = "icons.json";
const ICONS_RESOURCE_URL = "https://lolmath.net/articles/summoner-icons";

async function crawlIconsData(headless: boolean = false) {
	const icons: Icon[] = [];
	const browser = await puppeteer.launch({ headless });
	const page = await browser.newPage();

	try {
		await page.goto(ICONS_RESOURCE_URL, {
			waitUntil: "networkidle2",
		});
		await page.setViewport({ width: 1080, height: 1024 });

		const data = await page.evaluate(() => {
			const wrapper = document.querySelector(".not-prose");
			const elements = wrapper?.querySelectorAll(
				"div.flex.flex-row.content-center.items-center.justify-center",
			);

			const data: Icon[] = [];
			elements?.forEach(element => {
				const icon: Icon = {
					id: 0,
					name: "",
					image: "",
					description: "",
					releasedAt: 0,
				};

				// Get icon image source
				const image = element.querySelectorAll("source")[1] as HTMLSourceElement;
				icon.image = image.getAttribute("srcset") as string;

				// Get icon id, name, releasedAt, description, rarity
				const spans = element.querySelectorAll("span");
				spans.forEach((span, index) => {
					if (index === 0) {
						icon.name = span.textContent as string;
					} else if (index === 1) {
						icon.releasedAt = parseInt((span.textContent as string).replace("Released: ", ""));
					} else if (index === 2) {
						icon.id = parseInt((span.textContent as string).replace("ID: ", ""));
					} else if (index === 3) {
						icon.description = span.textContent as string;
					}
				});

				data.push(icon);
			});

			return data;
		});

		icons.push(...data);

		// Handle to save data
		saveData(icons, ICONS_IMAGE_DIR, ICONS_FILE_NAME);
	} catch (err) {
		console.error("Failed when crawling icons");
	} finally {
		await browser.close();
	}
}

crawlIconsData();
