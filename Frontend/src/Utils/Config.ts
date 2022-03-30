class Config {

}

class DevelopmentConfig extends Config {
    vacationsAdminUrl = 'http://localhost:3001/api/admin/vacations/';
   
    registerUrl = 'http://localhost:3001/api/auth/register/';
    loginUrl = 'http://localhost:3001/api/auth/login/';

    userVacationsUrl = 'http://localhost:3001/api/user-vacations/'  // /:userId   get userId from token you know who is logged in by there userId in the token 

    // This is used by both users to get all photos and by admin to get all photos
    vacationsImageUrl = 'http://localhost:3001/api/vacations/images/' 
}

class ProductionConfig extends Config {
    vacationsAdminUrl = 'http://localhost:3001/api/admin/vacations/';
   
    registerUrl = 'http://localhost:3001/api/auth/register/';
    loginUrl = 'http://localhost:3001/api/auth/login/';

    userVacationsUrl = 'http://localhost:3001/api/user-vacations/'  // /:userId
    vacationsImageUrl = 'http://localhost:3001/api/vacations/images/' 

}

const config = process.env.NODE_ENV === 'development' ? new DevelopmentConfig() : new ProductionConfig()

export default config