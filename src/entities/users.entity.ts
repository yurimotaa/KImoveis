import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Schedule from "./schedules.entity";
import { getRounds, hashSync } from "bcryptjs";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ type: "varchar", length: 45, unique: true })
  email: string;

  @Column({ type: "varchar", length: 120 })
  password: string;

  @Column({ type: "boolean", default: false })
  admin: boolean;

  @CreateDateColumn({ type: "date" })
  createdAt: string | Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string | Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: string | Date | null | undefined;

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedules: Schedule[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    // getRounds validando se a senha já não foi criptografada antes devido ao update
    const isEncrypted: number = getRounds(this.password);

    if (!isEncrypted) {
      // Adicionando ao objeto que irá para o banco a senha criptografada
      this.password = hashSync(this.password, 10);
    }
  }
}

export default User;
