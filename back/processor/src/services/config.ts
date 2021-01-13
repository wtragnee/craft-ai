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
  env: env('NODE_ENV', 'local'),
  apiHost: env('FACTORIZATION_API_HOST', 'http://localhost:3000'),
  crontab: env('CRON_TAB', '* * * * * *'),
}
