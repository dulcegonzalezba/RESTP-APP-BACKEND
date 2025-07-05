import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './users.service';
// import { RegisterDto } from './dto/register.dto';

@Controller('user')
export class UsersController {
    constructor(private readonly userService: UserService) {}

    @Get('user')
    async getUserById(@Param() userId: string) {
        return this.userService.getUserById(userId);
    }
}
