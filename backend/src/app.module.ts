import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';

// Feature modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TokensModule } from './tokens/tokens.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ArticlesModule } from './articles/articles.module';
import { FeedsModule } from './feeds/feeds.module';
import { WordpressModule } from './wordpress/wordpress.module';
import { ImagesModule } from './images/images.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
    imports: [
        // Configuration
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),

        // Database
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DATABASE_HOST', 'localhost'),
                port: configService.get<number>('DATABASE_PORT', 5432),
                username: configService.get('DATABASE_USER', 'postgres'),
                password: configService.get('DATABASE_PASSWORD', ''),
                database: configService.get('DATABASE_NAME', 'numedia_ai'),
                ssl: configService.get('DATABASE_SSL') === 'true' ? { rejectUnauthorized: false } : false,
                autoLoadEntities: true,
                synchronize: configService.get('NODE_ENV') === 'development', // Only in dev!
                logging: configService.get('NODE_ENV') === 'development',
            }),
        }),

        // Redis/BullMQ
        BullModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                connection: {
                    host: configService.get('REDIS_HOST', 'localhost'),
                    port: configService.get<number>('REDIS_PORT', 6379),
                    password: configService.get('REDIS_PASSWORD') || undefined,
                },
            }),
        }),

        // Feature modules
        AuthModule,
        UsersModule,
        TokensModule,
        DashboardModule,
        ArticlesModule,
        FeedsModule,
        WordpressModule,
        ImagesModule,
        JobsModule,
    ],
})
export class AppModule { }
