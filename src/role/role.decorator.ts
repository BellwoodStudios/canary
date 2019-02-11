import { ReflectMetadata } from '@nestjs/common';

/**
 * Always allow the request.
 */
export const AlwaysAllow = () => ReflectMetadata('alwaysAllow', [true]);

/**
 * Allow the request if the user is logged in.
 */
export const AllowIfLoggedIn = () => ReflectMetadata('allowIfLoggedIn', [true]);

/**
 * Allow the request if the user is logged out.
 */
export const AllowIfLoggedOut = () => ReflectMetadata('allowIfLoggedOut', [true]);

/**
 * Will only authorize the request if the current user has the provided role.
 */
export const Role = (role:string) => ReflectMetadata('role', [role]);
