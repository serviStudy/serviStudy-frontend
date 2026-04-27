import React from 'react';
import Link from 'next/link';
import { Mail, Phone, CheckCircle2 } from 'lucide-react';
import { StudentProfileResponse } from '../../types/studentProfile.types';

interface ProfileHeaderProps {
  profile: StudentProfileResponse;
  email: string;
  inicial: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, email, inicial }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-end">
      <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full bg-[#2552d0] border-4 border-white flex items-center justify-center text-white text-[56px] font-bold shadow-sm lg:h-34 lg:w-34">
        {profile.imgUrl ? (
          <img src={profile.imgUrl} alt="Perfil" className="h-full w-full object-cover" />
        ) : (
          inicial
        )}
      </div>

      <div className="flex flex-col -mt-4 lg:mt-0 lg:pb-2">
        <h1 className="text-2xl font-extrabold text-[#1a4b9e] lg:text-[32px]">Estudiante</h1>
        <h2 className="text-lg font-bold text-[#1a4b9e]">
          {profile.name || (
            <span className="text-gray-400 font-normal text-base italic">
              Sin nombre — <Link href="/estudiante/profile/editProfile" className="underline">edita tu perfil</Link>
            </span>
          )}
        </h2>

        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 font-medium">
          <div className="flex items-center gap-1.5 min-w-fit">
            <Mail className="h-4 w-4 text-[#1a4b9e]" />
            <span>{email || "—"}</span>
          </div>
          {profile.contactNumber && (
            <div className="flex items-center gap-1.5 min-w-fit">
              <Phone className="h-4 w-4 text-[#1a4b9e]" />
              <span>{profile.contactNumber}</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex">
          <span className="flex items-center gap-1.5 rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-500 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {profile.verificationStatus ? "Estudiante verificado" : "Estudiante no verificado"}
          </span>
        </div>
      </div>
    </div>
  );
};
