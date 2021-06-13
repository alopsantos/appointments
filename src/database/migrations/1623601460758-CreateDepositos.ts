import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createDepositos1623601460758 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'depositos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'cliente',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'valor',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'banco',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'update_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey('depositos', new TableForeignKey({
      name: 'DepositoProvider',
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('depositos');
  }
}
