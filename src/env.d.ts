declare namespace NodeJS {
  export interface ProcessEnv {
    POSTGRES_USERNAME: string;
    POSTGRES_PASSWORD: string;
    SESSION_SECRET: string;
  }
}
