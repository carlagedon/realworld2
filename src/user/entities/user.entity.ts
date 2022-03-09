import { hash } from "bcrypt";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'Users'})
export default class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    
    @Column()
    username: string

    @Column({default: ''})
    bio: string;

    @Column({default: ''})
    img: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10)
    }
}
