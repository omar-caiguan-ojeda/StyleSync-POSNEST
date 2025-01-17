import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction, TransactionContents } from './entities/transaction.entity';
import { Product } from 'src/products/entities/product.entity';
import { CouponsService } from 'src/coupons/coupons.service';
import { CouponsModule } from 'src/coupons/coupons.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Transaction, 
      TransactionContents, 
      Product, 
      CouponsService
    ]),
    CouponsModule
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
