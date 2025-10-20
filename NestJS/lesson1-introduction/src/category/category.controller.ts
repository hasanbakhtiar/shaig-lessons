import { Controller, Get } from '@nestjs/common';

@Controller('category')
export class CategoryController {
    @Get()
    findAll():string{
        return "Category"
    }
}
