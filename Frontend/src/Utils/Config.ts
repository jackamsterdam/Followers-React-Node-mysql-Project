class Config {

}

class DevelopmentConfig extends Config {
    // productsUrl = "http://localhost:3001/api/products/";
}

class ProductionConfig extends Config {

}

const config = process.env.NODE_ENV === 'production' ? new ProductionConfig() : new DevelopmentConfig()

export default config