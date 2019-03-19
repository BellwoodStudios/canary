import { Module, DynamicModule, Type, forwardRef, Global, MulterModule } from '@nestjs/common';
import { ConfigService } from '../config';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

@Module({})
export class UploadModule {

	static registerAsync () {
		return MulterModule.registerAsync({
			useFactory: async (configService:ConfigService) => {
				const cfg = configService.config.get('upload');
				let storage = null;
				switch (cfg.storage.type) {
					case 'memory': storage = multer.memoryStorage(); break;
					case 'disk': storage = multer.diskStorage({ destination:cfg.storage.path }); break;
					case 's3':
						aws.config.update({
							accessKeyId: cfg.storage.accessKey,
							secretAccessKey: cfg.storage.secretKey,
						});
						const s3 = new aws.S3();
						storage = multerS3({
							s3,
							bucket: cfg.storage.bucket,
							acl: cfg.storage.acl,
						});
						
						break;
				}

				return {
					storage,
					limits: cfg.limits,
				};
			},
			inject: [ConfigService],
		});
	}

}
