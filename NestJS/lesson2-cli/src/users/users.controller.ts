import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
    // GET
    @Get()
    findAll(@Query('role') role?: "INTERN" | "ENGINEER" | "ADMIN") {
        return []
    }
    // GET ID
    @Get(':id')
    findOne(@Param('id') id: string) {
        return { id }
    }
    // POST 
    @Post()
    create(@Body() user: {}) {
        return user
    }
    // PATCH ID
    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdate: {}) {
        return { id, ...userUpdate }
    }
    // DELETE ID
    @Delete(':id')
    delete(@Param('id') id: string) {
        return { id }
    }
}
