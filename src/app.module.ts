import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentsModule } from './departments/departments.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomLogger } from "./logger/custom-logger";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'employees',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      logger: new CustomLogger(),
    }),
    DepartmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
