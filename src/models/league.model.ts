import { Team } from './team.model';
import { Match } from './match.model';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany,
    ManyToMany,
    JoinTable
} from 'typeorm';

@Entity('leagues')
export class League extends BaseEntity {
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

    @OneToMany(() => Match, (match) => match.league)
    matches: Match[];

    @ManyToMany(() => Team, (team) => team.leagues)
    @JoinTable()
    teams: Team[];
}
