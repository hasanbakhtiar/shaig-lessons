import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import type { userType } from 'src/types/user';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    // GET
    @Get()
    findAll(@Query('role') role?: "INTERN" | "ENGINEER" | "ADMIN") {
        return this.usersService.findAll(role);
    }
    // GET ID
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }
    // POST 
    @Post()
    create(@Body() user: userType) {
        return this.usersService.create(user);
    }
    // PATCH ID
    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdate: userType) {
        return this.usersService.update(+id,userUpdate);
    }
    // DELETE ID
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.usersService.delete(+id)
    }
}
