import {connectToDynamoDb} from "@/services/utils/dynamo-db";
import {DynamoDBDocumentClient, GetCommand, PutCommand} from "@aws-sdk/lib-dynamodb";
import {secretTable} from "@/services/secrets-table";
import {Secret} from "@/models/secret.model";

async function markSecretAsRead(dynamoDb: DynamoDBDocumentClient, secret: Secret) {
    await dynamoDb.send(new PutCommand({
        TableName: secretTable,
        Item: {
            ...secret,
            hasBeenRead: true,
        }
    }));
}

/**
 * Gets a secret from the database and marks it as read
 * @param secretId
 */
export async function getSecret(secretId: string): Promise<Secret> {
    const dynamoDb = await connectToDynamoDb();
    const dynamoSecretGet = new GetCommand({
        TableName: secretTable,
        Key: {
            id: secretId,
        }
    })
    const secretDynamoItem = await dynamoDb.send(dynamoSecretGet);

    if(!secretDynamoItem.Item) throw new Error('Secret not found');

    const secret = secretDynamoItem.Item as Secret;
    if(secret.hasBeenRead) throw new Error('Secret has already been read');

    await markSecretAsRead(dynamoDb, secret);
    return secret;
}
