import { Injectable } from '@nestjs/common';
import * as convict from 'convict';
import * as glob from 'glob';
import { readFile } from 'fs';
import { basename } from 'path';
import { promisify } from 'util';
const globAsync = promisify(glob);
const readFileAsync = promisify(readFile);

@Injectable()
export class ConfigService {

	public config:any;

	private configDefinitions:any;

	constructor (paths:Array<string>) {
		this.configDefinitions = {
			"env": {
				"doc": "The application environment.",
				"format": ["production", "development", "test"],
				"default": "development",
				"env": "NODE_ENV"
			}
		};
		this.addConfigs(__dirname + "../**/*.config.json");
		for (let p of paths) {
			this.addConfigs(p);
		}
	}

	async addConfigs (path:string) {
		let files:Array<string> = await globAsync(path);
		for (let f of files) {
			let name = basename(f).split(".")[0];
			let data = JSON.parse(await readFileAsync(f, { encoding:'utf-8' }));
			this.configDefinitions = Object.assign(this.configDefinitions, { name:data });
		}
	}

	load () {
		this.config = convict(this.configDefinitions);
		let env = this.config.get('env');
		this.config.loadFile([`${env}.config.json`]);
	}

}
