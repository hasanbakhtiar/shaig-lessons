import { Controller, Get } from '@nestjs/common';
import { productsData, productType } from 'src/data/product';

@Controller('product')

export class ProductController {
    @Get()
    findAll(): productType[] {
        return productsData;
    }
}
