const AWS = require('/opt/swagger-layer/aws-sdk')
const express = require('/opt/swagger-layer/express')
const serverless = require('/opt/swagger-layer/serverless-http')
const swaggerUI = require('/opt/swagger-layer/swagger-ui-express')

var apigateway = new AWS.APIGateway({apiVersion: '2015-07-09'});

const app = express()

module.exports.handler = async (event, context) => {
    const apiId = event.requestContext.apiId
    const stage = event.requestContext.stage

    var params = {
        exportType: 'swagger',
        restApiId: apiId,
        stageName: stage,
        accepts: 'application/json'
      };

    var getExportPromise = await apigateway.getExport(params).promise();
    
    var swaggerJson = JSON.parse(getExportPromise.body)

    delete swaggerJson['paths']['/api-docs/{proxy+}']
    delete swaggerJson['paths']['/api-docs']

    app.use('/Prod/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJson))
    const handler = serverless(app)
    const ret = await handler(event, context)
    return ret
 };
