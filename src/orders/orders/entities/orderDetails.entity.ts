// // entities/orderDetails.entity.ts
// import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
// import { Orders } from "./orders.entity";
// import { Products } from "./products.entity";

// @Entity({ 
//     name: "ORDER_DETAILS",
// })

// export class OrderDetails {
//     @PrimaryGeneratedColumn ("uuid")
//     id: string;

//     @Column({ type: "decimal", precision: 10, scale: 2 })
//     price: number;

//     @ManyToMany(() => Products)
//     @JoinTable({ name: "ORDER_DETAILS_PRODUCTS" })
//     products: Products[];

//     @OneToOne(() => Orders, (order) => order.orderDetails)
//     @JoinColumn({ name: "order_id" })
//     order: Orders;
// }

