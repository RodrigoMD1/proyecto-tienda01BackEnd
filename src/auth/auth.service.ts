/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
//import { CreateAuthDto } from './dto/create-auth.dto';
//import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from './users/users.service';


@Injectable()
export class AuthService {


  constructor(private usersService: UsersService) { }


  async signIn(username: string, pass: string): Promise<any> {

    const user = await this.usersService.findOne(username);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;


    // TODO: Generate a JWT and return it here
    // instead of the user object

    
    return result;
  }



  
}
