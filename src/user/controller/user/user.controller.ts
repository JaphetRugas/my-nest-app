import { Controller, Get } from '@nestjs/common';
import { title } from 'process';

@Controller('user')
export class UserController {

    @Get()
    getusers() {
        return { username: 'Jade', email: "jade@gmail.com" };
    }

    @Get('/:id')
    getUserPost() {
        return {
            username: "Jade",
            email: "jade@gmail.com",
            post: [
                {
                    id: 1,
                    title: "Jade's post",
                },
                {
                    id: 2,
                    title: "Jade's post 2",
                }
            ]
        }
    }
}
