import { Tooltip } from 'antd'
import { TooltipPlacement } from 'antd/lib/tooltip'
import React, { SyntheticEvent } from 'react'

interface ICopyToClipboard {
  textToCopy: string
  timeoutInMs?: number
  initialText?: string | null
  successText?: string
  placement?: TooltipPlacement
}

const CopyToClipboard: React.FC<ICopyToClipboard> = ({
  children,
  textToCopy,
  timeoutInMs = 2000,
  successText = 'Copied to clipboard!',
  placement = 'top',
  initialText = 'Copy',
}) => {
  const [isCopied, setIsCopied] = React.useState(false)
  const copyUrlToClipboard = async (e: SyntheticEvent) => {
    try {
      await clipboardCopy(textToCopy)
      e.stopPropagation()
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, timeoutInMs)
    } catch {
      //noop
    }
  }
  return (
    <Tooltip title={isCopied ? successText : initialText} placement={placement}>
      {/* eslint-disable-next-line  jsx-a11y/click-events-have-key-events*/}
      <div
        role="button"
        tabIndex={0}
        style={{ display: 'inline-block' }}
        onClick={copyUrlToClipboard}
      >
        {children}
      </div>
    </Tooltip>
  )
}
export default CopyToClipboard

/** a modified version of https://github.com/feross/clipboard-copy
 * copy/pasted bc it's not an ES module
 * TODO: replace this with a package when there's a good one that's stable */
function makeError() {
  return new DOMException('The request is not allowed', 'NotAllowedError')
}

async function copyClipboardApi(text: string) {
  // Use the Async Clipboard API when available. Requires a secure browsing
  // context (i.e. HTTPS)
  if (!navigator.clipboard) {
    throw makeError()
  }
  return navigator.clipboard.writeText(text)
}

async function copyExecCommand(text: string) {
  // Put the text to copy into a <span>
  const span = document.createElement('span')
  span.textContent = text

  // Preserve consecutive spaces and newlines
  span.style.whiteSpace = 'pre'
  span.style.webkitUserSelect = 'auto'
  span.style.userSelect = 'all'

  // Add the <span> to the page
  document.body.appendChild(span)

  // Make a selection object representing the range of text selected by the user
  const selection = window.getSelection()
  const range = window.document.createRange()
  if (selection) {
    selection.removeAllRanges()
    range.selectNode(span)
    selection.addRange(range)

    // Copy text to the clipboard
    let success = false
    try {
      success = window.document.execCommand('copy')
    } finally {
      // Cleanup
      selection.removeAllRanges()
      window.document.body.removeChild(span)
    }

    if (!success) throw makeError()
  }
}

async function clipboardCopy(text: string) {
  try {
    await copyClipboardApi(text)
  } catch (err) {
    // ...Otherwise, use document.execCommand() fallback
    try {
      await copyExecCommand(text)
    } catch (err2) {
      throw err2 || err || makeError()
    }
  }
}
