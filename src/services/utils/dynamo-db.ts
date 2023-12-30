import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb"

/**
 * Connect to DynamoDB and return the connection
 */
export async function connectToDynamoDb() {
    const dbClient = new DynamoDBClient({
        endpoint: process.env.DYNAMODB_ENDPOINT as string,
        region: process.env.DYNAMODB_REGION as string,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        },
    })
    const docClient = DynamoDBDocumentClient.from(dbClient)

    return docClient
}