import { Module } from '@nestjs/common';
import { GraphQLModule as _GraphQLModule } from '@nestjs/graphql';
import { ConfigService } from '../config';

@Module({})
export class GraphQLModule {

	static forRootAsync () {
		return _GraphQLModule.forRootAsync({
			useFactory: (configService:ConfigService) => {
				return {
					context: ({ req }) => ({ req }),
					...configService.config.get('graphql'),
				};
			},
			inject: [ConfigService],
		});
	}

}
