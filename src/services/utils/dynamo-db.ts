import {DynamoDB, DynamoDBClient} from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb"
import {secretTable} from "@/services/secrets-table";

/**
 * Connect to DynamoDB and return the connection
 */
export async function connectToDynamoDb() {
    const configuration = {
        endpoint: process.env.DYNAMODB_ENDPOINT as string,
        region: process.env.DYNAMODB_REGION as string,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        },
    }
    const dbClient = new DynamoDBClient(configuration)
    const ddb = new DynamoDB(configuration);
    const docClient = DynamoDBDocumentClient.from(dbClient)

    // create table if it does not exist
    try {
        await ddb.createTable({
            "AttributeDefinitions": [
                {
                    "AttributeName": "id",
                    "AttributeType": "S"
                },
                {
                    "AttributeName": "secretValue",
                    "AttributeType": "S"
                },
                {
                    "AttributeName": "hasBeenRead",
                    "AttributeType": "B"
                }
            ],
            "KeySchema": [
                {
                    "AttributeName": "id",
                    "KeyType": "HASH"
                },
                                {
                    "AttributeName": "secretValue",
                    "KeyType": "S"
                },
                {
                    "AttributeName": "hasBeenRead",
                    "KeyType": "B"
                }
            ],
            TableName: secretTable
        })
    }
    catch (e) {
        console.error('Creating table failed', e)
    }

    return docClient
}
