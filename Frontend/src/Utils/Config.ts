class Config {

}

class DevelopmentConfig extends Config {
    // productsUrl = "http://localhost:3001/api/products/";
    vacationsAdminUrl = 'http://localhost:3001/api/admin/vacations/';
    vacationsAdminImageUrl = 'http://localhost:3001/api/admin/vacations/images/';
    registerUrl = 'http://localhost:3001/api/auth/register/';
    loginUrl = 'http://localhost:3001/api/auth/login/';

    userVacationsUrl = 'http://localhost:3001/api/user-vacations/'  // /:userId
}

class ProductionConfig extends Config {
    vacationsAdminUrl = 'http://localhost:3001/api/admin/vacations/';
    vacationsAdminImageUrl = 'http://localhost:3001/api/admin/vacations/images/';
    registerUrl = 'http://localhost:3001/api/auth/register/';
    loginUrl = 'http://localhost:3001/api/auth/login/';

    userVacationsUrl = 'http://localhost:3001/api/user-vacations/'  // /:userId

}

const config = process.env.NODE_ENV === 'development' ? new DevelopmentConfig() : new ProductionConfig()

export default config