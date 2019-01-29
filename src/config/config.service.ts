import { Injectable, Logger } from '@nestjs/common';
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
			const name = basename(f).split('.')[0];
			const data = (await import(f)).default;
			this.configDefinitions = Object.assign(this.configDefinitions, { [name]:data });
		}
	}

	load () {
		this.config = convict(this.configDefinitions);
		const env = this.config.get('env');
		this.config.loadFile([`common.config.json`, `${env}.config.json`]);
		this.config.validate({ allowed: 'warn' });
	}

}
