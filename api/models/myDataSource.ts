import { DataSource } from "typeorm";

type dataSource = "mysql" | "postgres";

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION as dataSource,
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

export default myDataSource;
