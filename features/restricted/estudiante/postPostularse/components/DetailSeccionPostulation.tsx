import { ReactNode } from "react";

interface Props {
    title: string;
    icon?: ReactNode;
    iconBg?: string;
    children: ReactNode;
}

export const DetailSectionPostulation = ({ title, icon, iconBg = "bg-[#2552d0]", children }: Props) => {
    return (
        <div className="mt-7">
            <div className="flex items-center gap-3 mb-3">
                {icon && (
                    <div className={`${iconBg} p-2 rounded-xl`}>
                        <span className="text-white [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
                    </div>
                )}
                <h2 className="text-blue-900 font-semibold text-lg md:text-xl tracking-tight">{title}</h2>
            </div>
            <div className="bg-[#f5f8ff] border border-[#dce8ff] rounded-xl p-5 text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                {children}
            </div>
        </div>
    );
};
