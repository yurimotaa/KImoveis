import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Address, Category, Schedule } from "../entities";

@Entity("real_estate")
class RealEstate {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "boolean", default: false })
  sold: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  value: number;

  @Column({ type: "integer" })
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Address, (address) => address.realEstate)
  @JoinColumn()
  address: Address;

  @ManyToMany(() => Category, (category) => category.realEstates)
  @JoinTable()
  category: Category[];

  @ManyToMany(() => Schedule, (schedule) => schedule.realEstates)
  schedules: Schedule[];
}

export default RealEstate;
