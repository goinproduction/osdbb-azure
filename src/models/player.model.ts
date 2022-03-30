import { Team } from './team.model';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn
} from 'typeorm';

@Entity('players')
export class Player extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    name: string;

    @Column({
        unique: true
    })
    playerNumber: number;

    @Column({
        default: 'https://cdn-icons-png.flaticon.com/512/166/166344.png'
    })
    avatar: string;

    @Column()
    position: string;

    @ManyToOne(() => Team, (team) => team.players)
    team: Team;
}
