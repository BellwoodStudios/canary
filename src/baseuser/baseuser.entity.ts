import { Model } from '../database';

export interface BaseUser extends Model {

	/**
	 * Return a unique identifier for this user.
	 */
	getIdentifier ():string;

}
