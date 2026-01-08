import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('token_balances')
export class TokenBalance {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', name: 'user_id', unique: true })
    userId: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    balance: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, name: 'total_purchased' })
    totalPurchased: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, name: 'total_used' })
    totalUsed: number;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    // Relations
    @OneToOne(() => User, (user: User) => user.tokenBalance)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
