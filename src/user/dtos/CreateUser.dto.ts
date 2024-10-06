import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    // @IsNumber() // commented out to use pipes for validation
    age: number;
}