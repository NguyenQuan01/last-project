import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config.schema';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ItemsModule } from './items/items.module';
import { AddressModule } from './address/address.module';
import { VoucherModule } from './voucher/voucher.module';
import { FlashsaleModule } from './flashsale/flashsale.module';
import { ItemflashsaleModule } from './itemflashsale/itemflashsale.module';
import { OrderModule } from './order/order.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        logging: false,
        synchronize: true,
      }),
    }),
    // MulterModule.registerAsync({
    //   useFactory: () => ({
    //     dest: './image',
    //   }),
    // }),
    AuthModule,
    UserModule, CategoryModule, ItemsModule, AddressModule, VoucherModule, FlashsaleModule, ItemflashsaleModule, OrderModule, MailModule,
  ],
})
export class AppModule { }
