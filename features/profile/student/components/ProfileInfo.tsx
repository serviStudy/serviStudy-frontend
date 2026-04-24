import React, { useState } from 'react';
import Link from 'next/link';
import { Pencil, SquarePen } from 'lucide-react';
import { ProfileVerification } from '@/components/shared/ProfileVerification';
import { StudentProfileResponse } from '../types/studentProfile.types';
import { normalizeDays } from '../utils/workDays.utils';
import { ProfileHeader } from './profile/ProfileHeader';
import { ProfileSummary } from './profile/ProfileSummary';
import { ProfileSkills } from './profile/ProfileSkills';
import { ProfileWorkDays } from './profile/ProfileWorkDays';
import { ProfileSchedule } from './profile/ProfileSchedule';
import { ProfileReviews } from './profile/ProfileReviews';
import { WorkDaysModal } from './modals/WorkDaysModal';

interface ProfileInfoProps {
  profile: StudentProfileResponse;
  email: string;
  inicial: string;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  profile,
  email,
  inicial
}) => {
  const [isDaysModalOpen, setIsDaysModalOpen] = useState(false);
  const normalizedDays = normalizeDays(profile.workDays || []);

  return (
    <div className="flex w-full flex-col gap-6 items-center">
      <ProfileVerification />

      <div className="w-full max-w-228 rounded-[24px] bg-white shadow-sm overflow-hidden border border-gray-100">
        <div className="h-30 w-full bg-popover lg:h-40 relative">
          <Link
            href="/estudiante/profile/editProfile"
            className="absolute top-6 right-6 lg:top-8 lg:right-8 bg-[#2552d0] p-3 rounded-xl hover:bg-blue-800 transition-colors shadow-sm"
          >
            <SquarePen className="h-5 w-5 text-white" />
          </Link>
        </div>

        <div className="px-6 lg:px-12 -mt-16 relative pb-10">
          <ProfileHeader profile={profile} email={email} inicial={inicial} />
        </div>

        <hr className="border-gray-100" />

        <div className="px-6 py-8 lg:px-12 lg:py-10 flex flex-col gap-10">
          <ProfileSummary description={profile.description} />
          
          <ProfileSkills skills={profile.studentSkills} />

          <div className="flex flex-col md:flex-row gap-10 md:gap-20">
            <ProfileWorkDays 
              normalizedDays={normalizedDays} 
              onOpenModal={() => setIsDaysModalOpen(true)} 
            />
            <ProfileSchedule workSchedule={profile.workSchedule} />
          </div>

          <ProfileReviews />
        </div>
      </div>

      <WorkDaysModal 
        open={isDaysModalOpen} 
        onOpenChange={setIsDaysModalOpen} 
        selectedDays={normalizedDays}
        readOnly={true}
      />
    </div>
  );
};
