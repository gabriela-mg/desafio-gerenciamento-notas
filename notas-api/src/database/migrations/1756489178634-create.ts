import { MigrationInterface, QueryRunner } from "typeorm";

export class Create1756489178634 implements MigrationInterface {
    name = 'Create1756489178634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`note\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(40) NOT NULL, \`description\` text NOT NULL, \`date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`address\` varchar(50) NOT NULL, \`noteId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD CONSTRAINT \`FK_9c2a4d4425fac2364d2827cf7c8\` FOREIGN KEY (\`noteId\`) REFERENCES \`note\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_9c2a4d4425fac2364d2827cf7c8\``);
        await queryRunner.query(`DROP TABLE \`image\``);
        await queryRunner.query(`DROP TABLE \`note\``);
    }

}
