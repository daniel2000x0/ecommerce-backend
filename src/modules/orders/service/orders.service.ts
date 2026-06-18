import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { OrderDetail } from '../../orders-details/entities/orders-detail.entity';

@Injectable()
export class OrdersService {
  constructor(
    private datasource: DataSource,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    return this.registerorder(createOrderDto);
  }

  async registerorder(createOrderDto: CreateOrderDto) {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { orderDetails } = createOrderDto;

      // Calcular el total de la orden
      const total = orderDetails.reduce((acc, item) => acc + item.quantity * item.unitprice, 0);

      // Crear y guardar la orden
      const order = await queryRunner.manager.save(Order, {
        customer: { id: createOrderDto.customer_id },
        country_id: createOrderDto.country_id,
        city: createOrderDto.city,
        region: createOrderDto.region,
        address: createOrderDto.address,
        phone: createOrderDto.phone,
        total,
      });

      // Crear y guardar los detalles de la orden
      const orderDetailsEntities = orderDetails.map(detail => ({
        order: { id: order.id },
        product: { id: detail.productid },
        quantity: detail.quantity,
        unit_price: detail.unitprice,
        discount: detail.discount || 0,
        total: detail.quantity * detail.unitprice * (1 - (detail.discount || 0) / 100),
      }));

      await queryRunner.manager.save(OrderDetail, orderDetailsEntities);

      // Confirmar la transacción
      await queryRunner.commitTransaction();

      return { order, orderDetails: orderDetailsEntities };
    } catch (error: any) {
      // Revertir la transacción en caso de error
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Error creating order');
    } finally {
      // Liberar el queryRunner
      await queryRunner.release();
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = await queryRunner.manager.findOne(Order, { where: { id } });
      if (!order) {
        throw new NotFoundException(`Order with id ${id} not found`);
      }

      Object.assign(order, updateOrderDto);
      const updatedOrder = await queryRunner.manager.save(Order, order);

      await queryRunner.commitTransaction();
      return updatedOrder;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error updating order');
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    try {
      return await this.orderRepository.find({
        relations: ['customer', 'orderDetails'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching orders');
    }
  }

  async findOne(id: number) {
    try {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['customer', 'orderDetails', 'country'],
      });

      if (!order) {
        throw new NotFoundException(`Order with id ${id} not found`);
      }

      return order;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error fetching order');
    }
  }

  async remove(id: number) {
    try {
      const order = await this.findOne(id);

      // Primero eliminar los detalles de la orden
      await this.orderDetailRepository.delete({ order: { id } });

      // Luego eliminar la orden
      return await this.orderRepository.remove(order);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error deleting order');
    }
  }
}
