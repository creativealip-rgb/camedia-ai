import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { WordPressSite } from './wordpress-site.entity';

@Entity('category_mappings')
export class CategoryMapping {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', name: 'wordpress_site_id' })
    wordPressSiteId: string;

    @Column({ type: 'varchar', length: 100, name: 'source_category' })
    sourceCategory: string;

    @Column({ type: 'varchar', length: 100, name: 'destination_category' })
    destinationCategory: string;

    @Column({ type: 'integer', nullable: true, name: 'destination_category_id' })
    destinationCategoryId: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    // Relations
    @ManyToOne(() => WordPressSite, (site: WordPressSite) => site.categoryMappings)
    @JoinColumn({ name: 'wordpress_site_id' })
    wordPressSite: WordPressSite;
}
