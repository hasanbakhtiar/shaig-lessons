import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
    // PATCH ID
    @Patch(':id')
    update(@Param('id',ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.update(id,updateUserDto);
    }
    // DELETE ID
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.usersService.delete(+id)
    }
}
