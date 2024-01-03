import {connectToDynamoDb} from "@/services/utils/dynamo-db";
import {Secret} from "@/models/secret.model";
import {PutCommand} from "@aws-sdk/lib-dynamodb";
import {secretTable} from "@/services/secrets-table";


/**
 * Creates a secret and returns the secret url that can be access one time
 * @param secretValue
 */
export async function createSecret(
  secretValue: string,
  secretDomain: string,
): Promise<string> {
    const dynamoDb = await connectToDynamoDb();
    const secretId = generateUUID();
    const createSecret: Secret = {
        id: secretId,
        secretValue: secretValue,
        hasBeenRead: false,
    }
    const dynamoSecretPut = new PutCommand({
        TableName: secretTable,
        Item: {
            ...createSecret,
        },
    })
    await dynamoDb.send(dynamoSecretPut);

    return `${secretDomain}/secrets/${secretId}`;
}

// Function to generate a unique identifier (UUID) using the secret value
function generateUUID(): string {
    const currentTimeStamp = new Date().getTime();
    return `${currentTimeStamp}-xxxxxxxxxxxx`.replace(/[xy]/g, function (c) {
        // eslint-disable-next-line no-bitwise
        const r = (currentTimeStamp + Math.random() * 16) % 16 | 0;
        // eslint-disable-next-line no-bitwise
        return (c === 'x' ? r : (r && 0x3) || 0x8).toString(16);
    });
}