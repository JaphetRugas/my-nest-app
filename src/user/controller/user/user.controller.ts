import { Body, Controller, Get, Post, Req, Res, Param, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { isString } from 'class-validator';
import { Request, Response } from 'express';
import { CreateUserDTO } from 'src/user/dtos/CreateUser.dto';

@Controller('user')
export class UserController {

    @Get()
    getUsers() {
        return { username: 'Jade', email: "jade@gmail.com" };
    }


    @Get('sort')
    getSortedUser(@Query('sort') sort: string) {
        const users = [
            { id: 1, name: 'John Doe', age: 30 },
            { id: 2, name: 'Jane Doe', age: 25 },
            { id: 3, name: 'Bob Smith', age: 40 },
            { id: 4, name: 'Alice Johnson', age: 35 },
            { id: 5, name: 'Mike Brown', age: 20 },
        ];

        if (sort === 'asc') {
            return users.sort((a, b) => a.age - b.age);
        } else if (sort === 'dsc') {
            return users.sort((a, b) => b.age - a.age);
        } else {
            return users;
        }
    }

    // Version 1 for post requests - nestjs way
    // note that 'formData' can be name anything
    @Post('/create')
    @UsePipes(new ValidationPipe)
    createUser(@Body() formData: CreateUserDTO) {
        return {
            message: 'User created successfully!',
            user: {
                username: formData.username,
                email: formData.email
            }
        };
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
        return { username: `Jade ${id}`, email: "jade@gmail.com",  isString: isString(id)  };
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


}
