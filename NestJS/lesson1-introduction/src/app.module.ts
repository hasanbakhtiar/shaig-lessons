import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './product/product.controller';
import { CategoryController } from './category/category.controller';

@Module({
  imports: [],
  controllers: [AppController, ProductController, CategoryController],
  providers: [AppService],
})
export class AppModule {}
