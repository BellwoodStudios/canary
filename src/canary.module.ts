import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { DatabaseModule } from './database/database.module';

let modules = [DatabaseModule, TypeOrmModule, ConfigModule];

@Module({
    imports: modules,
    exports: modules
})
export class CanaryModule {}