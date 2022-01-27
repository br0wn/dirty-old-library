import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Label } from '../../label/model/label.entity';
import { Release } from './release.entity';

@Entity()
export class ReleaseLabel {

	@Exclude()
	@ManyToOne(() => Release)
	release: Release;

	@Exclude()
	@PrimaryColumn()
	releaseId: string;

	@ManyToOne(() => Label)
	label: Label;

	@IsNotEmpty()
	@IsString()
	@PrimaryColumn()
	labelId: string;

	@IsOptional()
	@IsString()
	@Column({ nullable: true })
	releaseNumber: string;

	@Column({ nullable: true })
	order?: number;
}

