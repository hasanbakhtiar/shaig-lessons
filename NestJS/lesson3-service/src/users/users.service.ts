import { Injectable } from '@nestjs/common';
import { userType } from 'src/types/user';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john.doe@example.com",
            "role": "ENGINEER"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "email": "jane.smith@example.com",
            "role": "ADMIN"
        },
        {
            "id": 3,
            "name": "Michael Johnson",
            "email": "michael.johnson@example.com",
            "role": "INTERN"
        },
        {
            "id": 4,
            "name": "Emily Davis",
            "email": "emily.davis@example.com",
            "role": "ENGINEER"
        },
        {
            "id": 5,
            "name": "David Wilson",
            "email": "david.wilson@example.com",
            "role": "INTERN"

        }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.users.filter(user => user.role === role)
        }
        return this.users;
    }
    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        return user;
    }
    create(user: userType) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser);
        return newUser;
    }
    update(id: number, updateUser: userType) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUser }
            }
            return user;
        });
        return this.findOne(id);
    }
    delete(id: number) {
        const removeUser = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);
        return removeUser;
    }
}
