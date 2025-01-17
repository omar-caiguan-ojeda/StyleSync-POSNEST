import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { endOfDay, isAfter } from 'date-fns';


@Injectable()
export class CouponsService {

  constructor(
    @InjectRepository(Coupon) private readonly couponRepository: Repository<Coupon>
  ) {}

  create(createCouponDto: CreateCouponDto) {
    return this.couponRepository.save(createCouponDto);
  }

  findAll() {
    return this.couponRepository.find();
  }

  async findOne(id: number) {
    const coupon = await this.couponRepository.findOneBy({id})

    if(!coupon) {
      throw new NotFoundException(`El cupón de descuento con ID: ${id}, no existe.`)
    }

    return coupon
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    const coupon = await this.findOne(id)
    
    Object.assign(coupon, updateCouponDto)
    return await this.couponRepository.save(coupon)
  }

  async remove(id: number) {
    const coupon = await this.findOne(id)

    await this.couponRepository.remove(coupon)
    return { message: `El cupón de descuento con el ID: ${id}, fué eliminado con éxito.` }
  }

  
  async applyCoupon(name: string) {
    const coupon = await this.couponRepository.findOneBy({ name })

    if(!coupon) {
      throw new NotFoundException(`El cupón: ${name}, no existe`) 
    }

    const currentDate = new Date()
    const expirationDate = endOfDay(coupon.expirationDate)

    if(isAfter(currentDate, expirationDate)) {
      throw new UnprocessableEntityException(`El cupón: ${name}, ya expiró.`)
    }

    return {
      message: `El cupón: ${name}, es válido.`,
      ...coupon
    }
  } 
}
