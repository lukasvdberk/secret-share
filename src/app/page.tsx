import Image from 'next/image'
import {createSecret} from "@/services/create-secret";
import {redirect, usePathname, useSearchParams} from "next/navigation";

export default function CreateSecret(
    {
        params,
        searchParams,
    }: {
        params: { slug: string };
        searchParams?: { [key: string]: string | string[] | undefined };
    }
) {
  let generateSecretUrl = '';
  const domainPath = 'http://localhost:3000/';
  if(searchParams) {
      generateSecretUrl = searchParams['secret'] as string;
  }


  async function createSecretFromForm(formData: FormData) {
      'use server'
      // TODO set correctly

      const secret = formData.get('secret') as string
      console.log(secret)
      if(!secret) return

      // const secretUrl = await createSecret(secret, domainPath)
      const secretUrl = '123'

      const queryParamsToUpdate = new URLSearchParams()
      queryParamsToUpdate.set('secret', secretUrl)

      // redirect user to the same page with the new query params
      const redirectUrl = domainPath + '?' + queryParamsToUpdate.toString()

      console.log(redirectUrl)
      redirect(redirectUrl)
  }

  return (
    <main>
      <h1>Share a one time secret</h1>
      <form action={createSecretFromForm}>
        <textarea name="secret"></textarea>
        <button type="submit">Create secret</button>
      </form>
      <span>{generateSecretUrl}</span>
    </main>
  )
}
