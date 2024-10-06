import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dtos/CreateUser.dto';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UserService {
    private users = [
        { id: 1, username: 'John Doe', age: 30 },
        { id: 2, username: 'Jane Doe', age: 25 },
        { id: 3, username: 'Bob Smith', age: 40 },
        { id: 4, username: 'Alice Johnson', age: 35 },
        { id: 5, username: 'Mike Brown', age: 20 },
    ];

    getUsers(sortDesc: boolean) {

        // if (sortDesc) {
        //     return this.users.sort((a, b) => b.age - a.age);
        // } else {
        //     return this.users.sort((a, b) => a.age - b.age);
        // }
        return this.users.sort((a, b) => (sortDesc ? b.age - a.age : a.age - b.age));             // simplified

        // return sortDesc ? this.users.sort((a, b) => b.id - a.id) : this.users.sort((a, b) => a.id - b.id);

    }

    getSortedUser(sort: string) {

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
    createUser(formData: CreateUserType) {
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
    createUser2(formData: { username: string, email: string }) {
        return {
            message: 'User created successfully!',
            user: {
                username: formData.username,
                email: formData.email
            }
        };
    }

    // Version 3 for post requests - express way 
    createUser3(id: number, username: string, email: string, age: number) {
        const user = { id, username, email, age };
        this.users.push(user);
        return user;
    }

    // Nestjs way 
    getUserById(id: number) {
        return this.users.find(user => user.id === id) || { message: 'User not found' };
    }

    // Nestjs way 
    getUserPostById(id: string, postid: string) {
        return { username: `Jade ${id}`, email: "jade@gmail.com", postid };
    }

    // Express way to get route parameter 
    getUserById2(id: number) {
        return this.users.find((user) => user.id === id);
    }
    
    // Update user (PUT) 
    updateUser(id: number, updateUserDto: CreateUserDTO) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex > -1) {
            this.users[userIndex] = { id, username: updateUserDto.username, age: updateUserDto.age };
            return { message: 'User updated successfully!', user: this.users[userIndex] };
        }
        return { message: 'User not found' };
    }

    // Partially update user (PATCH) 
    partialUpdateUser(id: number, updateUserDto: Partial<CreateUserDTO>) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex > -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
            return { message: 'User updated successfully!', user: this.users[userIndex] };
        }
        return { message: 'User not found' };
    }
    
    // Delete user 
    deleteUser(id: number) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex > -1) {
            this.users.splice(userIndex, 1);
            return { message: 'User deleted successfully!' };
        }
        return { message: 'User not found' };
    }
}
