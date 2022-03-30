import { Match } from './match.model';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToOne
} from 'typeorm';

import { User } from './user.model';

@Entity('bets')
export class Bet extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    teamBet: string;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'NOW()'
    })
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.bets)
    user: User;

    @OneToOne(() => Match, (match) => match.bet)
    @JoinColumn()
    match: Match;
}
