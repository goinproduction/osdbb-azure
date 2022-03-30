import { League } from './league.model';
import { Match } from './match.model';
import { Player } from './player.model';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany,
    ManyToMany
} from 'typeorm';

@Entity('teams')
export class Team extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    name: string;

    @Column({
        unique: true
    })
    logo: string;

    @OneToMany(() => Player, (player) => player.team)
    players: Player[];

    @ManyToMany(() => Match, (match) => match.teams)
    matches: Match[];

    @ManyToMany(() => League, (league) => league.teams)
    leagues: League[];
}
