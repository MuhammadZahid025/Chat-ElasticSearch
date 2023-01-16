// import { DataSourceOptions, DataSource } from 'typeorm';
// export const dataSourceOptions: DataSourceOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'password',
//   database: 'nest-assignment',
//   entities: ['dist/**/*.entity{.js, .ts}'],
//   synchronize: false, //always be false for production
//   logging: true,
//   migrationsRun: true,
//   migrations: ['dist/migrations/*{.js, .ts}'],
// };

// const dataSource = new DataSource(dataSourceOptions);
// export default dataSource;

export default () => ({
  database: {
    type: process.env.DATABASE_TYPE || 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.PORT) || 4000,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'password',
    udatabase: process.env.DATABASE_NAME || 'nest-assignment',
    entities: ['dist/**/*.entity{.js, .ts}'],
    synchronize: false, //always be false for production
    logging: true,
    migrationsRun: true,
    migrations: ['dist/migrations/*{.js, .ts}'],
  },
});
