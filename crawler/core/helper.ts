import { BaseSchema } from "./schema";
import * as fs from "fs";

export function saveData(data: BaseSchema[], dirName: string, fileName: string) {
	if (!fs.existsSync(dirName)) {
		fs.mkdirSync(dirName);
	}

	fs.writeFileSync(`${dirName}/${fileName}`, JSON.stringify(data, null, 2), {
		encoding: "utf8",
		flag: "w",
	});
}
