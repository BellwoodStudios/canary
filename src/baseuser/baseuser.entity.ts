import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Model } from '../database';

export abstract class BaseUser extends Model {

	abstract getToken ():string;

}
