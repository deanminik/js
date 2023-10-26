import { Sequelize } from 'sequelize';


const db = new Sequelize('NodeTypescript', 'root', 'password', {
    //host: 'mysql', -> Is not working with the DNS name -> /11-ts-REST-server/mysql/docker-compose.yml
    host: '127.0.0.1',
    dialect: 'mysql',
    //logging: false,
});

export default db;



// The reason it worked with 127.0.0.1 instead of mysql is likely due to how Docker handles networking.

// When you use host: 'mysql', you're relying on Docker's internal DNS resolution to translate the hostname 'mysql' to the IP address of your MySQL container. However, sometimes there can be issues with DNS resolution, especially on certain operating systems or network configurations.

// By using 127.0.0.1, you're directly specifying the loopback address, which always refers to the local machine. This way, you're bypassing any potential DNS resolution issues that might be occurring in your environment.

// It's important to note that this solution will work as long as your MySQL container is running on the same machine as your Node.js application. If you were to deploy your application in a different environment, you might need to adjust the host configuration accordingly.

// In production environments, it's common to use environment variables to specify the database host so that the application can be easily configured for different deployment scenarios.