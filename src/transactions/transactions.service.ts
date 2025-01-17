import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction, TransactionContents } from './entities/transaction.entity';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';
import { CouponsService } from 'src/coupons/coupons.service';


@Injectable()
export class TransactionsService {
  constructor (
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionContents) private readonly transactionContentsRepository: Repository<TransactionContents>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly couponService: CouponsService

  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    // 'transactionEntityManager' sirve para utilizar a productRepository conjuntamente con las propiedades de 'manager' y asi lograr transacciones mas seguras.
    await this.productRepository.manager.transaction(async(transactionEntityManager) => {  
      const transaction = new Transaction()
      const total = createTransactionDto.contents.reduce( (total, item) => total + (item.quantity * item.price), 0 )
      transaction.total = total
      
      //await transactionEntityManager.save(transaction)
      if(createTransactionDto.coupon) {
        const coupon = await this.couponService.applyCoupon(createTransactionDto.coupon)
        
        const discount = (coupon.percentage / 100) * total
        transaction.discount = discount
        transaction.coupon = coupon.name
        transaction.total -= discount
      }


      for (const contents of createTransactionDto.contents) {
        const product = await transactionEntityManager.findOneBy(Product, { id: contents.productId })

        const errors = []

        if(!product) {
          errors.push(`El producto con el ID: ${contents.productId}, no existe.`)
          throw new NotFoundException(errors)
        }

        if (contents.quantity > product.inventory) {
          errors.push(`El articulo ${product.name} excede la cantidad disponible.`)
          throw new BadRequestException(errors)
        }
        product.inventory -= contents.quantity
        
        //Create Transaction Instance
        const transactionContents = new TransactionContents()
        transactionContents.price = contents.price
        transactionContents.product = product
        transactionContents.quantity =  contents.quantity
        transactionContents.transaction = transaction

        await transactionEntityManager.save(transaction)
        await transactionEntityManager.save(transactionContents)
      }
    })
    

    return 'Venta almacenada correctamente';
  }

  findAll(transactionDate?: string) {
    const options: FindManyOptions<Transaction> = {
      relations: {
        contents: true
      }
    }

    if(transactionDate) {
      const date = parseISO(transactionDate)
      if(!isValid(date)) {
        throw new BadRequestException('Fecha no válida')
      }

      const start = startOfDay(date)
      const end = endOfDay(date)
      options.where = {
        transactionDate: Between(start, end)
      
          // Convertir a UTC explícitamente
      // const start = startOfDay(date);
      // const end = endOfDay(date);

      // const startUTC = new Date(start.toISOString()); // Convertido a UTC
      // const endUTC = new Date(end.toISOString());     // Convertido a UTC

      // options.where = {
      // transactionDate: Between(startUTC, endUTC),   
      }
    }

    return this.transactionRepository.find(options);
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id
      },
      relations: {
        contents: true
      }
    })

    if(!transaction) {
      throw new NotFoundException(`La transacción con el ID: ${id}, no fué encontrada.`)
    }

    return transaction
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  async remove(id: number) {
    const transaction = await this.findOne(id)

    for(const contents of transaction.contents) {
      const product = await this.productRepository.findOneBy({ id: contents.product.id })
      product.inventory += contents.quantity
      await this.productRepository.save(product)

      const transactionContents = await this.transactionContentsRepository.findOneBy({id: contents.id})
      await this.transactionContentsRepository.remove(transactionContents)
    }

    await this.transactionRepository.remove(transaction)
    return { message: `La transacción con ID: ${id}, fué eliminada con éxito` }
  }
}
