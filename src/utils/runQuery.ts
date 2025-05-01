import { DataSource, QueryRunner } from 'typeorm';

export const createQueryRunner = (dataSource: DataSource) => {
  const runQuery = async <T = unknown>(
    task: (queryRunner: QueryRunner) => T | Promise<T>,
  ): Promise<T> => {
    const queryRunner: QueryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await task(queryRunner);
      await queryRunner.commitTransaction();

      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  };

  return runQuery;
};
