import { Body, Controller, Get, Post, Req, Res, Param, Query, UsePipes, ValidationPipe, ParseIntPipe, ParseBoolPipe, Put, Patch, Delete } from '@nestjs/common';
import { isString } from 'class-validator';
import { Request, Response } from 'express';
import { CreateUserDTO } from 'src/user/dtos/CreateUser.dto';

@Controller('user')
export class UserController {
    private users = [
        { id: 1, username: 'John Doe', age: 30 },
        { id: 2, username: 'Jane Doe', age: 25 },
        { id: 3, username: 'Bob Smith', age: 40 },
        { id: 4, username: 'Alice Johnson', age: 35 },
        { id: 5, username: 'Mike Brown', age: 20 },
    ];

    @Get()
    getUsers(@Query('sortDesc', ParseBoolPipe) sortDesc: boolean) {

        // if (sortDesc) {
        //     return this.users.sort((a, b) => b.age - a.age);
        // } else {
        //     return this.users.sort((a, b) => a.age - b.age);
        // }
        return this.users.sort((a, b) => (sortDesc ? b.age - a.age : a.age - b.age));             // simplified

        // return sortDesc ? this.users.sort((a, b) => b.id - a.id) : this.users.sort((a, b) => a.id - b.id);

    }


    @Get('sort')
    getSortedUser(@Query('sort') sort: string) { 

        if (sort === 'asc') {
            return this.users.sort((a, b) => a.age - b.age);
        } else if (sort === 'dsc') {
            return this.users.sort((a, b) => b.age - a.age);
        } else {
            return this.users;
        }
    }

    // Version 1 for post requests - nestjs way
    // note that 'formData' can be name anything
    @Post('/create')
    @UsePipes(new ValidationPipe)
    createUser(@Body() formData: CreateUserDTO) {
        // return {
        //     message: 'User created successfully!',
        //     user: {
        //         username: formData.username,
        //         email: formData.email
        //     }
        // };
        const newUser = { 
            id: this.users.length + 1, 
            username: formData.username,
            age: formData.age, 
            email: formData.email
        };

        this.users.push(newUser);
        return { message: 'User created successfully!', user: newUser };
    }

    // Version 2 for post requests - nestjs way
    // note that 'formData' can be name anything
    @Post('/create-user')
    createUser2(@Body() formData: { username: string, email: string }) {
        return {
            message: 'User created successfully!',
            user: {
                username: formData.username,
                email: formData.email
            }
        };
    }

    // Version 3 for post requests - express way
    @Post()
    createUser3(@Req() request: Request, @Res() response: Response) {
        const { username, email } = request.body;

        if (!username || !email) {
            return response.status(400).json({
                message: 'Username and email are required',
            });
        }

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
        return this.users.find(user => user.id === id) || { message: 'User not found' };
    }

    // Nestjs way
    @Get(':id/:postid')
    getUserPostById(@Param('id') id: string, @Param('postid') postid: string) {
        return { username: `Jade ${id}`, email: "jade@gmail.com", postid };
    }

    // Express way to get route parameter
    @Get("/express/:ids")
    getUserById2(@Req() request: Request, @Res() response: Response) {
        return response.json(request.params);
    }


    // Update user (PUT)
    @Put(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: CreateUserDTO) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex > -1) {
            this.users[userIndex] = { id, username: updateUserDto.username, age: updateUserDto.age };
            return { message: 'User updated successfully!', user: this.users[userIndex] };
        }
        return { message: 'User not found' };
    }

    // Partially update user (PATCH)
    @Patch(':id')
    partialUpdateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: Partial<CreateUserDTO>) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex > -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
            return { message: 'User updated successfully!', user: this.users[userIndex] };
        }
        return { message: 'User not found' };
    }

    // Delete user
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex > -1) {
            this.users.splice(userIndex, 1);
            return { message: 'User deleted successfully!' };
        }
        return { message: 'User not found' };
    }


    

}
