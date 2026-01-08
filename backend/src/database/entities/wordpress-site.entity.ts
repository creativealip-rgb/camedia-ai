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
import { CategoryMapping } from './category-mapping.entity';
import { Article } from './article.entity';

export enum WordPressSiteStatus {
    CONNECTED = 'connected',
    ERROR = 'error',
    PENDING = 'pending',
}

@Entity('wordpress_sites')
export class WordPressSite {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', name: 'user_id' })
    userId: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 500 })
    url: string;

    @Column({ type: 'varchar', length: 100 })
    username: string;

    @Column({ type: 'text', name: 'app_password' })
    appPassword: string; // Should be encrypted

    @Column({ type: 'enum', enum: WordPressSiteStatus, default: WordPressSiteStatus.PENDING })
    status: WordPressSiteStatus;

    @Column({ type: 'timestamp', nullable: true, name: 'last_sync_at' })
    lastSyncAt: Date;

    @Column({ type: 'integer', default: 0, name: 'posts_published' })
    postsPublished: number;

    @Column({ type: 'text', nullable: true, name: 'error_message' })
    errorMessage: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    // Relations
    @ManyToOne(() => User, (user: User) => user.wordPressSites)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => CategoryMapping, (mapping: CategoryMapping) => mapping.wordPressSite)
    categoryMappings: CategoryMapping[];

    @OneToMany(() => Article, (article: Article) => article.wordPressSite)
    articles: Article[];
}
