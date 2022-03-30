import { Team } from './team.model';
import { League } from './league.model';
import { Bet } from './bet.model';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToOne,
    ManyToOne,
    ManyToMany,
    JoinTable
} from 'typeorm';

@Entity('matches')
export class Match extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startTime: string;

    @Column()
    handicap: number;

    @Column()
    betAmount: number;

    @Column({
        // 0: chưa diễn ra, có thể đặt cược được
        // 1: đang diễn ra, không thể đặt cược
        // 2: trận đấu kết thúc
        default: 0
    })
    status: number;

    @Column({
        array: true,
        default: [0, 0]
    })
    score: number;

    @Column({
        default: 0
    })
    totalBetQuantity: number;

    @Column({
        array: true,
        default: [0, 0]
    })
    teamBetQuantity: number;

    @OneToOne(() => Bet, (bet) => bet.match)
    bet: Bet;

    @ManyToOne(() => League, (league) => league.matches)
    league: League;

    @ManyToMany(() => Team, (team) => team.matches)
    @JoinTable()
    teams: Team[];
}
