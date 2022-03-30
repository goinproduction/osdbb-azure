import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany
} from 'typeorm';

import { Bet } from './bet.model';
@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        nullable: true
    })
    username: string;

    @Column({
        nullable: true,
        select: false
    })
    password: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    fullName: string;

    @Column({
        nullable: true
    })
    phoneNumber: string;

    @Column({
        default: 'https://i.ibb.co/9q2kq4M/avt.jpg'
    })
    avatar: string;

    @Column({
        default: 'USER'
    })
    role: string;

    @Column({
        default: 0
    })
    win: number;

    @Column({
        default: 0
    })
    lose: number;

    @Column({
        default: 0
    })
    winRate: number;

    @Column({
        default: 0
    })
    debt: number;

    @Column({
        default: false
    })
    isActive: boolean;

    @Column({
        nullable: true,
        select: false
    })
    activateToken: string;

    @Column({
        type: 'timestamptz',
        default: () => 'NOW()'
    })
    createdAt: Date;

    @OneToMany(() => Bet, (bet) => bet.user)
    bets: Bet[];
}
