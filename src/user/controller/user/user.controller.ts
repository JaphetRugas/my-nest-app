import { Body, Controller, Get, Post, Req, Res, Param, Query, UsePipes, ValidationPipe, ParseIntPipe, ParseBoolPipe, Put, Patch, Delete } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDTO } from 'src/user/dtos/CreateUser.dto';
import { UserService } from 'src/user/services/user/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getUsers(@Query('sortDesc', ParseBoolPipe) sortDesc: boolean) {
        return this.userService.getUsers(sortDesc);
    }

    @Get('sort')
    getSortedUser(@Query('sort') sort: string) {
        return this.userService.getSortedUser(sort);
    }

    // Version 1 for post requests - nestjs way
    // note that 'formData' can be name anything
    @Post('/create')
    @UsePipes(new ValidationPipe)
    createUser(@Body() formData: CreateUserDTO) {
        return this.userService.createUser(formData);
    }

    // Version 2 for post requests - nestjs way
    // note that 'formData' can be name anything
    @Post('/create-user')
    createUser2(@Body() formData: { username: string, email: string }) {
        return this.userService.createUser2(formData);
    }

    // Version 3 for post requests - express way
    @Post()
    createUser3(@Req() request: Request, @Res() response: Response) {
        const { id, username, email, age } = request.body;

        if (!username || !email) {
            return response.status(400).json({
                message: 'Username and email are required',
            });
        }
        const user = this.userService.createUser3(id, username, email, age);

        return response.status(201).json({
            message: 'User created successfully!',
            user: {
                username,
                email
            }
        });
    }

    // Nestjs way
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUserById(id);
    }

    // Nestjs way
    @Get(':id/:postid')
    getUserPostById(@Param('id') id: string, @Param('postid') postid: string) {
        return this.userService.getUserPostById(id, postid);
    }

    // Express way to get route parameter
    @Get("/express/:ids")
    getUserById2(@Req() request: Request, @Res() response: Response) {
        const user = this.userService.getUserById(request.param);
        return response.json(user);
    }

    // Update user (PUT)
    @Put(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: CreateUserDTO) {
        return this.userService.updateUser(id, updateUserDto)
    }

    // Partially update user (PATCH)
    @Patch(':id')
    partialUpdateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: Partial<CreateUserDTO>) {
        return this.userService.partialUpdateUser(id, updateUserDto)
    }

    // Delete user
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }  

}
