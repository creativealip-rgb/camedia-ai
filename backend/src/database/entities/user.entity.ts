import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    OneToMany,
} from 'typeorm';
import { TokenBalance } from './token-balance.entity';
import { TokenTransaction } from './token-transaction.entity';
import { WordPressSite } from './wordpress-site.entity';
import { RssFeed } from './rss-feed.entity';
import { Article } from './article.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255, name: 'password_hash' })
    passwordHash: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    name: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    // Relations
    @OneToOne(() => TokenBalance, (tokenBalance: TokenBalance) => tokenBalance.user)
    tokenBalance: TokenBalance;

    @OneToMany(() => TokenTransaction, (transaction: TokenTransaction) => transaction.user)
    tokenTransactions: TokenTransaction[];

    @OneToMany(() => WordPressSite, (site: WordPressSite) => site.user)
    wordPressSites: WordPressSite[];

    @OneToMany(() => RssFeed, (feed: RssFeed) => feed.user)
    rssFeeds: RssFeed[];

    @OneToMany(() => Article, (article: Article) => article.user)
    articles: Article[];
}
