import { IDatabaseConfig } from './Database'

export const env = (key: string, defaultValue?: string): string => {
  const envVar = process.env[key]
  if (envVar !== undefined) {
    return envVar
  }
  if (defaultValue !== undefined) {
    return defaultValue
  }
  throw new Error(`Invalid config, missing env var ${key}`)
}

export const int = (value: string): number => {
  return parseInt(value, 10)
}

export const config = {
  port: int(env('PORT', '3000')),
  env: env('NODE_ENV', 'local'),
  db: {
    client: 'pg',
    connection: {
      host: env('DB_HOST', 'localhost'),
      port: int(env('DB_PORT', '5432')),
      user: env('DB_USER', 'user'),
      password: env('DB_PASSWORD', 'password'),
      database: env('DB_NAME', 'craft_ai'),
    },
  } as IDatabaseConfig,
}
