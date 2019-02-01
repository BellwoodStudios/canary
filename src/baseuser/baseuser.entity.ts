import { Model } from '../database';

export abstract class BaseUser extends Model {

	/**
	 * Return a unique identifier for this user.
	 */
	abstract getIdentifier ():string;

}
