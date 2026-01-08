import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { FeedItem } from './feed-item.entity';
import { WordPressSite } from './wordpress-site.entity';
import { GeneratedImage } from './generated-image.entity';

export enum WordPressStatus {
    DRAFT = 'draft',
    PRIVATE = 'private',
    PUBLISHED = 'published',
}

export enum PublishStatus {
    PENDING = 'pending',
    GENERATING = 'generating',
    READY = 'ready',
    PUBLISHED = 'published',
    FAILED = 'failed',
}

@Entity('articles')
export class Article {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', name: 'user_id' })
    userId: string;

    @Column({ type: 'uuid', nullable: true, name: 'feed_item_id' })
    feedItemId: string;

    @Column({ type: 'varchar', length: 1000, nullable: true, name: 'source_url' })
    sourceUrl: string;

    @Column({ type: 'text', name: 'original_content' })
    originalContent: string;

    @Column({ type: 'varchar', length: 500, nullable: true, name: 'original_title' })
    originalTitle: string;

    @Column({ type: 'text', nullable: true, name: 'generated_content' })
    generatedContent: string;

    @Column({ type: 'varchar', length: 500, nullable: true, name: 'generated_title' })
    generatedTitle: string;

    @Column({ type: 'varchar', length: 70, nullable: true, name: 'meta_title' })
    metaTitle: string;

    @Column({ type: 'varchar', length: 160, nullable: true, name: 'meta_description' })
    metaDescription: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    slug: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    tone: string;

    @Column({ type: 'text', array: true, nullable: true, name: 'seo_keywords' })
    seoKeywords: string[];

    @Column({ type: 'uuid', nullable: true, name: 'wordpress_site_id' })
    wordPressSiteId: string;

    @Column({ type: 'integer', nullable: true, name: 'wordpress_post_id' })
    wordPressPostId: number;

    @Column({ type: 'enum', enum: WordPressStatus, nullable: true, name: 'wordpress_status' })
    wordPressStatus: WordPressStatus;

    @Column({ type: 'enum', enum: PublishStatus, default: PublishStatus.PENDING, name: 'publish_status' })
    publishStatus: PublishStatus;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, name: 'tokens_used' })
    tokensUsed: number;

    @Column({ type: 'timestamp', nullable: true, name: 'published_at' })
    publishedAt: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    // Relations
    @ManyToOne(() => User, (user: User) => user.articles)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToOne(() => FeedItem, (feedItem: FeedItem) => feedItem.article, { nullable: true })
    @JoinColumn({ name: 'feed_item_id' })
    feedItem: FeedItem;

    @ManyToOne(() => WordPressSite, (site: WordPressSite) => site.articles, { nullable: true })
    @JoinColumn({ name: 'wordpress_site_id' })
    wordPressSite: WordPressSite;

    @OneToOne(() => GeneratedImage, (image: GeneratedImage) => image.article)
    generatedImage: GeneratedImage;
}
