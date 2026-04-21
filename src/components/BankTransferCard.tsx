import { useState } from "react";
import { motion } from "motion/react";
import type { PaymentInfo } from "../data/events";

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback — select text if clipboard API unavailable
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 font-caps text-[9px] tracking-[0.1em] uppercase text-kr-gold hover:text-kr-gold-light transition-colors cursor-pointer"
      title={`Copy ${label}`}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export function BankTransferCard({
  payment,
  highlight = false,
}: {
  payment: PaymentInfo;
  highlight?: boolean;
}) {
  const { bankDetails, amount, notes } = payment;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl overflow-hidden transition-shadow duration-700 ${
        highlight
          ? "shadow-[0_0_30px_rgba(179,153,98,0.25)] ring-2 ring-kr-gold/30"
          : "shadow-[0_4px_20px_rgba(43,58,103,0.1)]"
      }`}
    >
      {/* Header */}
      <div className="bg-kr-navy px-7 py-5 text-center">
        <span className="font-caps text-[10px] font-semibold tracking-[0.2em] uppercase text-white/60">
          Payment
        </span>
        <h3 className="font-heading text-xl text-kr-gold mt-1">
          Bank Transfer Details
        </h3>
      </div>

      {/* Body */}
      <div className="bg-kr-white px-7 py-6 space-y-4">
        {amount ? (
          <div className="text-center pb-4 border-b border-kr-navy/[0.08]">
            <span className="font-caps text-[10px] font-semibold tracking-[0.15em] uppercase text-kr-muted">
              Amount
            </span>
            <p className="font-heading text-lg text-kr-navy font-semibold mt-1 whitespace-pre-line leading-snug">
              {amount}
            </p>
          </div>
        ) : null}

        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-caps text-[9px] font-semibold tracking-[0.15em] uppercase text-kr-muted block">
                Account Name
              </span>
              <span className="text-[15px] text-kr-navy font-body font-medium">
                {bankDetails.accountName}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-caps text-[9px] font-semibold tracking-[0.15em] uppercase text-kr-muted block">
                Sort Code
              </span>
              <span className="text-[15px] text-kr-navy font-body font-medium font-mono">
                {bankDetails.sortCode}
              </span>
            </div>
            <CopyButton text={bankDetails.sortCode} label="sort code" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-caps text-[9px] font-semibold tracking-[0.15em] uppercase text-kr-muted block">
                Account Number
              </span>
              <span className="text-[15px] text-kr-navy font-body font-medium font-mono">
                {bankDetails.accountNumber}
              </span>
            </div>
            <CopyButton
              text={bankDetails.accountNumber}
              label="account number"
            />
          </div>

          <div className="pt-3 border-t border-kr-navy/[0.08]">
            <span className="font-caps text-[9px] font-semibold tracking-[0.15em] uppercase text-kr-muted block">
              Payment Reference
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[15px] text-kr-navy font-body font-semibold">
                {bankDetails.reference}
              </span>
              <CopyButton text={bankDetails.reference} label="reference" />
            </div>
            <p className="text-[12px] text-kr-muted/70 font-body mt-1 italic">
              Please replace [SURNAME] with your family name
            </p>
          </div>
        </div>

        {notes ? (
          <p className="text-[13px] text-kr-muted font-body leading-relaxed pt-3 border-t border-kr-navy/[0.08]">
            {notes}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}
