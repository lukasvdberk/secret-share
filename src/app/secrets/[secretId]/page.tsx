'use server'
import {getSecret} from "@/services/get-secret";
import {Secret} from "@/models/secret.model";

export default async function ShowSecret({params}: {params: { secretId: string }}) {
    try {
        const secretId = params.secretId
        const secret = await getSecret(secretId)
        return <div>
                    <h1>Secret</h1>
                    <p>Secret is: {secret.secretValue}</p>
                </div>
    }
    catch (e) {
        return <div>Secret not found</div>
    }
}