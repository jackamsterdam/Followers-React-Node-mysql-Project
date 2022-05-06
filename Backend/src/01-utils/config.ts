class Config {

}

class DevelopmentConfig extends Config {
    isDevelopment = true 
    logFile = 'logger.log'
    mysql = {host: 'localhost', user: 'root', password: '', database: 'VacationsDB'}
}

class ProductionConfig extends Config {
    isDevelopment =  false
    logFile = 'logger.log'
    mysql =  {host: 'localhost', user: 'root', password: '', database: 'VacationsDB'}
}       

const config = process.env.NODE_ENV === 'production' ? new ProductionConfig() : new DevelopmentConfig()
export default config 