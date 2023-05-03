import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RealEstate, User } from "../entities";

@Entity("schedules")
class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "time" })
  hour: Date;

  @ManyToMany(() => RealEstate, (realEstate) => realEstate.schedules)
  @JoinTable()
  realEstates: RealEstate[];

  @ManyToMany(() => User)
  user: User;
}

export default Schedule;
