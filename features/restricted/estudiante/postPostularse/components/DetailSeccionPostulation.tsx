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
                <h2 className="text-gray-900 font-extrabold text-lg">{title}</h2>
            </div>
            <div className="bg-[#f5f8ff] border border-[#dce8ff] rounded-2xl p-5 text-gray-600 leading-relaxed whitespace-pre-line text-sm">
                {children}
            </div>
        </div>
    );
};
