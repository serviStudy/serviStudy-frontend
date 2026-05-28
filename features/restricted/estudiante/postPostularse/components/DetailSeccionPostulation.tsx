import { ReactNode } from "react";

interface Props {
    title: string;
    icon?: ReactNode;
    iconBg?: string;
    children: ReactNode;
}

export const DetailSectionPostulation = ({ title, icon, iconBg = "bg-[#2552d0]", children }: Props) => {
    return (
        <div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                <div className="flex items-center gap-3 mb-3">
                    {icon && (
                        <div className={`${iconBg} p-2 rounded-xl`}>
                            <span className="text-white [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
                        </div>
                    )}
                    <h2 className="text-lg font-medium text-orange-800 mb-1">{title}</h2>
                </div>
                {children}
            </div>
        </div>
    );
};
