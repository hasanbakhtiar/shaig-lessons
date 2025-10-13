interface configType{
  db:{
    host:string;
    user:string;
    password:string;
    database:string;
  }
}

const config: configType = {
  db: {
    host: "localhost",
    user: "root",
    password: "",
    database: "fynode",
  },
};

export default config;