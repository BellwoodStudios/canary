import { Injectable, Logger } from '@nestjs/common';
import convict from 'convict';
import glob from 'glob';
import { readFile } from 'fs';
import { basename } from 'path';
import { promisify } from 'util';
const globAsync = promisify(glob);
const readFileAsync = promisify(readFile);

@Injectable()
export class ConfigService {

	public config:any;

	private configDefinitions:any;

	constructor () {
		this.configDefinitions = {
			env: {
				doc: 'The application environment.',
				format: ['production', 'development', 'test'],
				default: 'development',
				env: 'NODE_ENV',
			},
		};
	}

	async addConfigs (path:string) {
		const files:string[] = await globAsync(path);
		for (const f of files) {
			let pieces = basename(f).split('.');
			pieces = pieces.slice(0, pieces.length - 2).reverse();
			const data = (await import(f)).default;
			let obj = data;
			for (const n of pieces) {
				obj = { [n]:obj };
			}
			this.configDefinitions = Object.assign(this.configDefinitions, obj);
		}
	}

	load () {
		this.config = convict(this.configDefinitions);
		const env = this.config.get('env');
		this.config.loadFile([`common.config.json`, `${env}.config.json`]);
		this.config.validate({ allowed: 'warn' });
	}

}
