'use client'
import React, {useCallback} from "react";
import Link from "next/link";

export function CopyClipboardComponent(props: {generateSecretUrl: string}) {
    const {generateSecretUrl} = props
    const copySecretToClipboard = async () => {
        await navigator.clipboard.writeText(generateSecretUrl)
    }
    const copyToClipBoardCallback = useCallback(copySecretToClipboard, [generateSecretUrl])
    return <>
        <div>
            <button onClick={copyToClipBoardCallback}>Copy generated link</button>
        </div>
        <div>
            <Link href={generateSecretUrl}>{generateSecretUrl}</Link>
        </div>
    </>
}