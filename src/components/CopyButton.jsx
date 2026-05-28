import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

const CopyButton = ({ value, label = 'Sao chép' }) => {
  const [copied, setCopied] = useState(false);

  const writeClipboard = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return true;
      }
    } catch {
      // Fall through to the textarea fallback for restricted clipboard contexts.
    }

    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();

    const didCopy = document.execCommand('copy');
    document.body.removeChild(textarea);
    return didCopy;
  };

  const copyValue = async () => {
    try {
      const didCopy = await writeClipboard();
      setCopied(didCopy);
      if (didCopy) window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copyValue}
      className="inline-flex h-8 min-w-[5.25rem] shrink-0 items-center justify-center gap-1.5 rounded-full border border-sageblue/25 bg-white/85 px-3 text-xs font-semibold text-ink shadow-[0_6px_16px_rgba(95,145,165,0.18)] transition hover:-translate-y-0.5 hover:border-sageblue/40 hover:bg-mist/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sageblue/45"
    >
      {copied ? <FiCheck className="text-sm text-sageblue" /> : <FiCopy className="text-sm text-sageblue" />}
      {copied ? 'Đã chép' : label}
    </button>
  );
};

export default CopyButton;
