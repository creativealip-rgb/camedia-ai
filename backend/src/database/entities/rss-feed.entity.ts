import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { FeedItem } from './feed-item.entity';

export enum RssFeedStatus {
    ACTIVE = 'active',
    PAUSED = 'paused',
    ERROR = 'error',
}

@Entity('rss_feeds')
export class RssFeed {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', name: 'user_id' })
    userId: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 500 })
    url: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    category: string;

    @Column({ type: 'enum', enum: RssFeedStatus, default: RssFeedStatus.ACTIVE })
    status: RssFeedStatus;

    @Column({ type: 'timestamp', nullable: true, name: 'last_fetch_at' })
    lastFetchAt: Date;

    @Column({ type: 'integer', default: 300, name: 'fetch_interval' })
    fetchInterval: number; // in seconds

    @Column({ type: 'integer', default: 0, name: 'pending_items' })
    pendingItems: number;

    @Column({ type: 'integer', default: 0, name: 'total_fetched' })
    totalFetched: number;

    @Column({ type: 'text', nullable: true, name: 'error_message' })
    errorMessage: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    // Relations
    @ManyToOne(() => User, (user: User) => user.rssFeeds)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => FeedItem, (item: FeedItem) => item.feed)
    items: FeedItem[];
}
