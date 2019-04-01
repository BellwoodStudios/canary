import { SetMetadata } from '@nestjs/common';

/**
 * Always allow the request.
 */
export const AlwaysAllow = () => SetMetadata('alwaysAllow', [true]);

/**
 * Allow the request if the user is logged in.
 */
export const AllowIfLoggedIn = () => SetMetadata('allowIfLoggedIn', [true]);

/**
 * Allow the request if the user is logged out.
 */
export const AllowIfLoggedOut = () => SetMetadata('allowIfLoggedOut', [true]);

/**
 * Will only authorize the request if the current user has the provided role.
 */
export const Role = (role:string) => SetMetadata('role', [role]);
