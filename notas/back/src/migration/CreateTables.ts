import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTables implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'note',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'createdAt',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        length: '40',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: false,
                    },        
                ],
            }),
            
        );

        await queryRunner.createTable(
            new Table({
                name: 'image',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                        length: '150',
                        isNullable: false,
                    },     
                    {
                        name: 'idNote',
                        type: 'int'
                    },   
                ],
            }),
            
        );


        await queryRunner.createForeignKey(
            'image',
            new TableForeignKey({
                columnNames:['idNote'],
                referencedColumnNames:['id'],
                referencedTableName:'note',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}