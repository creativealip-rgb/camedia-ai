import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { RssFeed } from './rss-feed.entity';
import { Article } from './article.entity';

export enum FeedItemStatus {
    PENDING = 'pending',
    PROCESSED = 'processed',
    SKIPPED = 'skipped',
}

@Entity('feed_items')
export class FeedItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', name: 'feed_id' })
    feedId: string;

    @Column({ type: 'varchar', length: 500 })
    guid: string;

    @Column({ type: 'varchar', length: 500 })
    title: string;

    @Column({ type: 'varchar', length: 1000 })
    link: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'text', nullable: true })
    content: string;

    @Column({ type: 'timestamp', nullable: true, name: 'pub_date' })
    pubDate: Date;

    @Column({ type: 'text', array: true, nullable: true })
    categories: string[];

    @Column({ type: 'varchar', length: 1000, nullable: true, name: 'featured_image_url' })
    featuredImageUrl: string;

    @Column({ type: 'enum', enum: FeedItemStatus, default: FeedItemStatus.PENDING })
    status: FeedItemStatus;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    // Relations
    @ManyToOne(() => RssFeed, (feed: RssFeed) => feed.items)
    @JoinColumn({ name: 'feed_id' })
    feed: RssFeed;

    @OneToOne(() => Article, (article: Article) => article.feedItem)
    article: Article;
}
