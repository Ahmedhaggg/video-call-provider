import { User } from '@module/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { SharedModule } from '@shared/config.module';
import { AppConfigService } from '@shared/config/config.service';

export const createTestDatabaseModule = (
  ...entities: EntityClassOrSchema[]
) => [
  TypeOrmModule.forRootAsync({
    imports: [SharedModule],
    inject: [AppConfigService],
    useFactory: (config: AppConfigService) => ({
      type: 'postgres',
      host: config.get('DB_HOST'),
      port: parseInt(config.get('DB_PORT'), 10),
      username: config.get('DB_USER'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_NAME'),
      url: config.get('DB_URL'),
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
      entities: ['dist/**/entities/*.entity.js'],
    }),
  }),
  TypeOrmModule.forFeature(entities),
];
