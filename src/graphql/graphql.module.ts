import { Module } from '@nestjs/common';
import { GraphQLModule as _GraphQLModule } from '@nestjs/graphql';
import { ConfigService } from '../config';

@Module({
	imports: [
		_GraphQLModule.forRootAsync({
			useFactory: (configService:ConfigService) => configService.config.get('graphql'),
			inject: [ConfigService],
		}),
	],
})
export class GraphQLModule {}