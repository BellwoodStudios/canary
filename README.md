# Description

Canary takes a bunch of common best practices from the NestJS docs and puts them all together. This module is opinionated to use particular features that we at Bellwood Studios find ourselves in need of for the common web project.

# Libraries Used

* convict - Configuration and argument parsing.
* TypeORM - Database ORM. Compatible with SQL and NoSQL databases.
* Passport - User authentication. Credentials are handled via the Authorization header via JSON Web Tokens.
* GraphQL - GraphQL + Apollo Server.
* TypeGraphQL - Generate GraphQL types from TypeORM.

# Features

* Configuration
* Database + ORM
* Authentication
* User Roles
* GraphQL