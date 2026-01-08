import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Article } from './article.entity';

export enum ImageGenerationStatus {
    PENDING = 'pending',
    GENERATING = 'generating',
    COMPLETED = 'completed',
    FAILED = 'failed',
}

@Entity('generated_images')
export class GeneratedImage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', name: 'article_id' })
    articleId: string;

    @Column({ type: 'text' })
    prompt: string;

    @Column({ type: 'varchar', length: 1000, nullable: true, name: 'image_url' })
    imageUrl: string;

    @Column({ type: 'varchar', length: 500, nullable: true, name: 'storage_path' })
    storagePath: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 2, name: 'tokens_used' })
    tokensUsed: number;

    @Column({ type: 'enum', enum: ImageGenerationStatus, default: ImageGenerationStatus.PENDING })
    status: ImageGenerationStatus;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    // Relations
    @OneToOne(() => Article, (article: Article) => article.generatedImage)
    @JoinColumn({ name: 'article_id' })
    article: Article;
}
