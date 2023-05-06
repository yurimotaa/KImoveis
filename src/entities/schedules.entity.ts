import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import RealEstate from "./real_estate.entity";
import User from "./users.entity";

@Entity("schedules")
class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "time" })
  hour: Date;

  @ManyToOne(() => RealEstate, (realEstate) => realEstate.schedules)
  realEstates: RealEstate;

  @ManyToOne(() => User, (users) => users.schedules)
  user: User;
}

export default Schedule;
