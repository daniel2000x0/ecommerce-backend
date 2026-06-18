import { Customer } from "../../customer/entities/customer.entity";
import { User } from "../../users/entities/user.entity";
import { AuthEntity } from "../interfaces/auth-entity.interface";



export class AuthEntityMapper {
  static fromUser(user: User): AuthEntity {
    return {
      id: user.id,
      email: user.email,
      name: user.firstname,
      type: 'user',
    };
  }

  static fromCustomer(customer: Customer): AuthEntity {
    return {
      id: customer.id,
      email: customer.email,
      name: customer.firstname,
      type: 'customer',
    };
  }
}