import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export interface BaseUser {
	getToken ():string;
}
