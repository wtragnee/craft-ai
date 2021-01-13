import { CronJob } from 'cron'

import { initServices } from './services'
import { FactorizationHandler} from './handler/FactorizationHandler'

const start = async () => {
  const services = await initServices()

  const factorizationHandler = new FactorizationHandler(services)

  let isInProgress = false
  const job = new CronJob(services.config.crontab, async () => {
    try {
      // Manually pause the cronjob if computation is in progress
      if (isInProgress) {
        return
      }
      isInProgress = true
      await factorizationHandler.handle()
      isInProgress = false
    } catch (err) {
      console.error('Got error', err)
      process.exit()
    }
  })
  
  job.start()
}

start()
