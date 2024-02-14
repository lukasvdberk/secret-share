import Image from 'next/image'
import {createSecret} from "@/services/create-secret";
import {redirect, usePathname, useSearchParams} from "next/navigation";
import React, {useCallback} from "react";
import {CopyClipboardComponent} from "@/components/copy-clipboard.component";
import Link from "next/link";

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
  if(searchParams) {
      generateSecretUrl = searchParams['secretLink'] as string || ''
  }

  async function createSecretFromForm(formData: FormData) {
      'use server'
      const domainPath = process.env.DOMAIN as string;
      const secret = formData.get('secret') as string
      if(!secret) return

      const secretUrl = await createSecret(secret, domainPath)

      const queryParamsToUpdate = new URLSearchParams()
      queryParamsToUpdate.set('secretLink', secretUrl)

      // redirect user to the same page with the new query params
      const redirectUrl = domainPath + '?' + queryParamsToUpdate.toString()

      redirect(redirectUrl)
  }

  return (
      <main className="flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-lg my-10">
              { generateSecretUrl &&
                <>
                    <Link href={generateSecretUrl} />
                    <CopyClipboardComponent generateSecretUrl={generateSecretUrl} />
                </>
              }
              <h1 className="text-2xl font-semibold mb-2">Paste a password, secret message or private link below.</h1>
              <form action={createSecretFromForm}>
                <p className="mb-4 text-gray-600">Keep sensitive info out of your email and chat logs.</p>
                <input
                  name="secret"
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-4"
                  placeholder="s6BsAf#d87^g2j^hK*65"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-[#e53e3e] text-white mb-4">
                  Create a secret link
                </button>
              </form>
        </div>
      </main>
  )
}
