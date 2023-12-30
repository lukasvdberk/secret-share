'use server'
import {getSecret} from "@/services/get-secret";
import {Secret} from "@/models/secret.model";

export default async function ShowSecret({params}: {params: { slug: string }}) {
    const secretId = params.slug
    let secret: Secret | undefined = undefined;
    try {
        secret = await getSecret(secretId)
    }
    catch (e) {
        // better to implement an actual proper logger here
        console.error(e)
    }

    return <>
        {secret === undefined && <div>Secret not found</div>}
        {secret !== undefined &&
            <div>
                <h1>Secret</h1>
                <p>Secret is: {secret.secretValue}</p>
            </div>
        }
    </>
}