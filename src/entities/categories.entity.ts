import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import RealEstate from "../entities/real_estate.entity";

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
