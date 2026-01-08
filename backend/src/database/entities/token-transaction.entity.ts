import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum TransactionType {
    CREDIT = 'credit',
    DEBIT = 'debit',
}

export enum TransactionAction {
    ARTICLE_GENERATION = 'article_generation',
    IMAGE_GENERATION = 'image_generation',
    PLAGIARISM_CHECK = 'plagiarism_check',
    PURCHASE = 'purchase',
}

@Entity('token_transactions')
export class TokenTransaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', name: 'user_id' })
    userId: string;

    @Column({ type: 'enum', enum: TransactionType })
    type: TransactionType;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    action: string;

    @Column({ type: 'uuid', nullable: true, name: 'reference_id' })
    referenceId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    // Relations
    @ManyToOne(() => User, (user) => user.tokenTransactions)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
