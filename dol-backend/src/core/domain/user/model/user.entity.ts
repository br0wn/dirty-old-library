import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {

	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@ApiHideProperty()
	@Exclude()
	@CreateDateColumn({
		type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP',
		select: false,
	})
	createdAt: Date;

	@ApiHideProperty()
	@Exclude()
	@UpdateDateColumn({
		type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP',
		select: false,
	})
	updatedAt: Date;

	@ApiHideProperty()
	@Exclude()
	@Column({
		type: 'timestamptz',
		nullable: true,
		select: false,
	})
	deletedAt?: Date;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column({
		transformer: {
			from: (value?: string) => !!value ? value.toLowerCase() : value,
			to: (value: string) => !!value ? value.toLowerCase() : value,
		},
		unique: true,
	})
	email: string;

	@ApiHideProperty()
	@Exclude({ toPlainOnly: true })
	@Column({
		select: false,
	})
	password: string;

	@ApiHideProperty()
	@Exclude({ toPlainOnly: true })
	@Column({
		nullable: true,
		select: false,
	})
	passwordResetToken: string;

	@Column({ nullable: true, type: 'text' })
	imageUrl?: string;
}
