import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Address, RealEstate, Schedule } from "../entities";

@Entity("categories")
class Category {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45, unique: true })
  name: string;

  @ManyToMany(() => RealEstate, (realEstate) => realEstate.category)
  realEstates: RealEstate[];
}

export default Category;
