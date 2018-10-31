 # Nodejs Microservices Boilerplate:

API Gateway folder structure:
```
- Config
- handlers
    - index.js (It will contains all routes)
    - login
        index.js (type of routes)
            post.js
        get.js
- Helpers
- node_modules
- app.js
```

### Services:
1. Authentication
2. Commandline to create new custom services(Todo)

### Features: Todo
1. API request/response validation.
2. API Gateway with middlewares.
3. Docker support.
4. MySQL/mongdb with sequelize ORM.(optional)
5. Continuous integration and delivery(Need to decide platform)
6. Unit Test and Integration Test.
7. Secured using JWT Token base authentication.
8. Nodejs commandline app to create new service skeleton.