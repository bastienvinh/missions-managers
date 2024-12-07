import dotenv from 'dotenv'

type EnvironmentTypeLabel = 'development' | 'production' | 'staging'

export default function initDotEnv(environment: EnvironmentTypeLabel = (process.env.NODE_ENV ?? 'development') as EnvironmentTypeLabel) {

  // In production, we will put all the variable in vercel
  if (environment === 'development') {
    const envFilePath = '.env.development'

    const result = dotenv.config({ path: envFilePath })

    if (result.error) {
      console.error(
        `Erreur lors du chargement du fichier ${envFilePath}:`,
        result.error
      )
    } else {
      console.log(`Environnement chargé à partir de ${envFilePath}`)
    }
  }
  
}

export function getEnvFromArg() {
  const envOption = process.argv[3]
  const env = envOption?.split('=')[1]
  console.log('getEnvFromArg env', env)
  return env
}