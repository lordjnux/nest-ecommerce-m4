import { MigrationInterface, QueryRunner } from 'typeorm';

export class PasswordSize20To2551717450082886 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            -- Paso 1: Crear una tabla temporal para almacenar los valores de password
            CREATE TEMP TABLE temp_passwords AS
            SELECT id, password FROM users;

            -- Paso 3: Eliminar la columna password de la tabla users
            ALTER TABLE users DROP COLUMN password;

            -- Paso 4: Agregar de nuevo la columna password con el nuevo tipo de dato y el valor por defecto
            ALTER TABLE users ADD password character varying(255) NOT NULL DEFAULT '$2y$10$ExoJVjfD/BMvYXpV3hd2duIQ4EK0wdXCrXFz13krkNyevvYVhtENq';

            -- Paso 5: Eliminar el valor por defecto de la columna password
            ALTER TABLE users ALTER COLUMN password DROP DEFAULT;

            -- Paso 6: Restaurar los valores de password desde la tabla temporal a la tabla users
            UPDATE users
            SET password = temp_passwords.password
            FROM temp_passwords
            WHERE users.id = temp_passwords.id;

            -- Paso 7: Eliminar la tabla temporal
            DROP TABLE temp_passwords;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            -- Restaurar la columna password al estado original
            ALTER TABLE users DROP COLUMN password;
            ALTER TABLE users ADD password character varying(20) NOT NULL DEFAULT '$2y$10$ExoJVjfD/BMvYXpV3hd2duIQ4EK0wdXCrXFz13krkNyevvYVhtENq';
            ALTER TABLE users ALTER COLUMN password DROP DEFAULT;
        `);
  }
}
