import { Input } from "@/components/ui/input";
import { useRef } from "react";

interface Props {
  code: string[];
  onChange: (value: string, index: number) => void;
}

export const CodeInput = ({ code, onChange }: Props) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const focusInput = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  const handleChange = (value: string, index: number) => {
    const digit = value.slice(-1);

    onChange(digit, index);

    if (digit && index < code.length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim().slice(0, code.length);

    pasted.split("").forEach((char, idx) => {
      onChange(char, idx);
    });

    focusInput(Math.min(pasted.length, code.length - 1));
  };

  return (
    <div className="flex justify-center gap-2">
      {code.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-lg border text-black border-gray-400"
          maxLength={1}
        />
      ))}
    </div>
  );
};