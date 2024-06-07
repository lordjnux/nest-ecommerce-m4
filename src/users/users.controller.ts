import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
  NotFoundException,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { AuthGuard } from '../auth/guards/auth-guard/auth-guard.guard';
import { Role } from '../auth/rol.enum';
import { Roles } from '../decorators/rol.decorator';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserRolDto } from './dtos/UpdateUserRol.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put('rol')
  async setRol(@Body() setRol: UpdateUserRolDto) {
    if (setRol.secret != `${process.env.SECRET_KEY}`)
      throw new BadRequestException('Secret key is incorrect.');

    return await this.usersService.setRol(setRol.id, setRol.rol);
  }
  
  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    return await this.usersService.findAll(+page, +limit);
  }

  @ApiBearerAuth()
  @Get('email/:email')
  @UseGuards(AuthGuard)
  async findByEmail(@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ) {
    return await this.usersService.update(id, user);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.remove(id);
  }
}
