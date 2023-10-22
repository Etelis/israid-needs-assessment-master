# IsraAid Needs Assessment Application Overview

Welcome to the IsraAid Rapid Needs Assessment application, a powerful tool designed to support humanitarian aid efforts around the globe. This guide provides an overview of the project, its objectives, and the essential components that make it all possible.

## Table of Contents

1. [Introduction](#introduction)
2. [Database and Framework](#database-and-framework)
3. [Frontend Powered by AWS Amplify](#frontend-powered-by-aws-amplify)
4. [Deployment Architecture](#deployment-architecture)
5. [Accessing the Database](#accessing-the-database)
6. [Automations](#automations)
7. [Adding New API Endpoints](#adding-new-api-endpoints)
8. [Swagger API Documentation](#swagger-api-documentation)
9. [Conclusion](#conclusion)

## 1. Introduction

The IsraAid Rapid Needs Assessment (RNA) application is a vital tool designed to empower humanitarian aid workers and support their mission to assess and address urgent needs around the globe. This innovative application is tailored to function seamlessly in both online and offline environments, ensuring that aid workers can collect essential data under any conditions, even in remote and disconnected regions.

## 2. Database and Framework

**Database**: To securely manage and store the critical data collected during surveys, our project leverages Amazon DynamoDB, a flexible and scalable database solution. In Offline mode the data is stored locally on the mobile device, until synchronization is performed.

**Framework**: The application's runtime environment includes both Node.js and Python functions, chosen for their versatility and adaptability to the diverse needs of humanitarian aid missions.

## 3. Frontend Powered by AWS Amplify

Our frontend, which powers the user interface of the application, is built with the support of AWS Amplify. This choice simplifies frontend development and ensures a responsive and scalable experience for aid workers, allowing them to efficiently collect and manage essential data.

## 4. Deployment Architecture

The deployment architecture encompasses several key components:

- **Layer Deployment**: Layers are used to share resources among Lambda functions, streamlining the development and deployment process.

- **Lambda Function Deployment**: Our Lambda functions, whether built in Node.js or Python, are essential for the functionality of the IsraAid RNA application. They serve as the code for the APIs

- **API Gateway Configuration**: API Gateway resources and routes are configured to enable HTTPS access to our services.

## 6. Automations

Automation plays a central role in the IsraAid RNA application. Workflows have been carefully designed to streamline and enhance operational efficiency, We are using github workflows

Our actions workflow automates the deployment of Lambda functions, layers, API Gateway configurations, and routes based on the configurations defined in your project's repository.
In other words, you dont have to do anything as an IT guy thanks to Artume <3

## 7. Adding New API Endpoints

To expand the functionality of the application with new features, you can add new API endpoints. This is achieved by creating dedicated folders within the "lambdas" directory, writing the corresponding code, and configuring API settings. This process allows for the seamless expansion of the application's capabilities.

Example of directory hierarchy 

- lambdas
  - example_directory
    - example_directory
      - Example.py
      - config.json
      - requirements.txt

## 8. Swagger API Documentation

Our APIs are documented using Swagger for your convenience. You can access the Swagger documentation at the following URL: [Swagger API Documentation](https://dom6b8ltd7.execute-api.eu-north-1.amazonaws.com/IsraAid/api-docs/).

## 9. Conclusion

As an IT professional responsible for the IsraAid RNA application, your primary tasks involve ensuring smooth operations and maintaining secure access to AWS resources. Here's what you need to do:

1. **Create a Dedicated User in AWS**: To maintain the security of the application and adhere to best practices, create a dedicated user in AWS with the appropriate permissions. This user should have the necessary access to manage and deploy the application's resources while minimizing any potential security risks.

2. **Update GitHub Credentials**: Ensure that your GitHub repository refers to the new AWS credentials for the dedicated user. This step is crucial for maintaining a secure and efficient development environment, allowing your team to continue working on the project without interruptions.

By following these two essential steps, you will contribute to the ongoing success of the IsraAid Needs Assessment application, providing humanitarian aid workers with the tools they need to make a positive impact in 3rd world countries. If you have any questions or require further assistance, please do not hesitate to reach out. Your expertise is a valuable asset in supporting this critical humanitarian mission.






