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
            <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-[#e53e3e] text-white mb-4"
                onClick={copyToClipBoardCallback}>
                Copy generated link
            </button>
        </div>
    </>
}