export interface RoleEntity {
	hasRole (role:string):boolean;
}

export interface OwnedEntity<T extends RoleEntity> {
	getOwner ():T;
}
