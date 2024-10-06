import { Controller, Get, Post, Param, Query, Body, HttpCode, Header } from '@nestjs/common';

@Controller('test')
export class TestController {

    @Get()
    getUsers() {
        return { username: 'Jade', email: "jade@gmail.com" };
    }

    @Get('/post')
    getUserPost() {
        return {
            username: "Jade",
            email: "jade@gmail.com",
            post: [
                { id: 1, title: "Jade's post" },
                { id: 2, title: "Jade's post 2" }
            ]
        };
    }

    @Get('/post/:postId')
    getUserPostById(@Param('postId') postId: string) {
        return {
            postId,
            username: "Jade",
            title: `Jade's post ${postId}`,
            content: "This is the content of the post"
        };
    }

    @Get('/post/comments')
    getUserPostComments() {
        return {
            username: "Jade",
            email: "jade@gmail.com",
            post: [
                {
                    id: 1,
                    title: "Jade's post",
                    comments: [
                        { id: 1, title: "Jade's comment" },
                        { id: 2, title: "Jade's comment 2" }
                    ]
                }
            ]
        };
    }

    @Get('/search')
    searchUsers(@Query('username') username: string) {
        return {
            message: `Searching for user: ${username}`,
            username
        };
    }

    @Post('/create')
    @HttpCode(201)  // Set custom status code for created resource
    @Header('Custom-Header', 'Created')  // Set a custom response header
    createUser(@Body() body: { username: string; email: string }) {
        return {
            message: 'User created successfully!',
            user: {
                username: body.username,
                email: body.email
            }
        };
    }

}
