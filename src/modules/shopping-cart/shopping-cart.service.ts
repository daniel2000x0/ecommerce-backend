import { Injectable } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { ShoppingCartItem } from './entities/shopping-cart-item.entity';

@Injectable()
export class ShoppingCartService {
  constructor( 
    private dataSource: DataSource,
    @InjectRepository(ShoppingCart)
    private  readonly shoppingCartRepository: Repository<ShoppingCart>,
    @InjectRepository(ShoppingCartItem)
    private  readonly itemshoppingCartRepository: Repository<ShoppingCartItem>
  ){}

  async AddRToCart(createShoppingCartDto: CreateShoppingCartDto){
    const queryRunner =  this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const {product_ids} = createShoppingCartDto;
       


      const shooppingCart = await queryRunner.manager.save(ShoppingCart,{
        customer: {id: createShoppingCartDto.customer_id

        },

       
      });
      const shoppingCartItems = product_ids.map(productId => ({
        shoppingCart: {id: shooppingCart.id},
        product:  {id: productId.product},
        quantity: productId.quantity || 1
      }));
      await queryRunner.manager.save(ShoppingCartItem, shoppingCartItems);
      return {shooppingCart, shoppingCartItems, message: 'Products added to cart successfully'};
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Liberar el queryRunner
      await queryRunner.release();
    }

  }
  create(createShoppingCartDto: CreateShoppingCartDto) {
    return 'This action adds a new shoppingCart';
  }

  findAll() {
    return `This action returns all shoppingCart`;
  }

  findOne(id: number) {
    
    return `This action returns a #${id} shoppingCart`;
  }

  update(id: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    return `This action updates a #${id} shoppingCart`;
  }

  remove(id: number) {
 const queryRunner =  this.dataSource.createQueryRunner();
    return  queryRunner.connect()
    .then(() => queryRunner.startTransaction())
    .then(() => queryRunner.manager.delete(ShoppingCartItem, { shoppingCart: { id } }))
    .then(() => queryRunner.manager.delete(ShoppingCart, { id }))
    .then(() => queryRunner.commitTransaction())
    .catch(async (error) => {
      await queryRunner.rollbackTransaction();
      throw error;
    })
    .finally(async () => {
      await queryRunner.release();
    });
    return `This action removes a #${id} shoppingCart`;
  }
}
