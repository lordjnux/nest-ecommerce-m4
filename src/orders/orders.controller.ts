import { Body, Controller, Get, NotFoundException, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { AuthGuard } from '../auth/guards/auth-guard/auth-guard.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  async getOrder(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.ordersService.getOrder(id);
    if (!result) throw new NotFoundException('Orden no encontrada.');
    return result;
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  async addOrder(@Body() orderDto: CreateOrderDto) {
    return await this.ordersService.addOrder(orderDto);
  }
}
