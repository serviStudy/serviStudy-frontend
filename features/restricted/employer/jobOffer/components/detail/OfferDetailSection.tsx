import { FileText } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

export const OfferDetailSection = ({ title, icon, children }: Props) => {
  return (
    <div className="mt-8">
      <h2 className="text-[#1a3683] font-bold text-lg mb-4 flex items-center gap-2">
        {icon && <span className="text-[#1a3683]">{icon}</span>}
        {title}
      </h2>
      <div className="bg-[#eff4ff] border border-[#d6e4ff] rounded-xl p-5 text-[#3b528b] font-medium leading-relaxed whitespace-pre-line text-sm">
        {children}
      </div>
    </div>
  );
};
