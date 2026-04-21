import { useState, useCallback } from "react";
import { CreateJobOfferDTO, DayWeek, WorkSchedule } from "../types/jobOffer.types";

export const useJobOfferForm = (initialData?: Partial<CreateJobOfferDTO>) => {
  const [formData, setFormData] = useState<CreateJobOfferDTO>({
    employerId: initialData?.employerId || "",
    title: initialData?.title || "",
    establishmentAddress: initialData?.establishmentAddress || "",
    workDays: initialData?.workDays || [],
    workSchedule: initialData?.workSchedule || "FULL_TIME",
    salary: initialData?.salary || 0,
    salaryDescription: initialData?.salaryDescription || "",
    contractDescription: initialData?.contractDescription || "",
    description: initialData?.description || "",
    requirements: initialData?.requirements || [],
  });

  const handleChange = useCallback((field: keyof CreateJobOfferDTO, value: any) => {
    setFormData((prev: CreateJobOfferDTO) => ({ ...prev, [field]: value }));
  }, []);

  const handleRequirementAdd = useCallback((requirement: string) => {
    if (!requirement.trim()) return;
    setFormData((prev: CreateJobOfferDTO) => ({
      ...prev,
      requirements: prev.requirements.includes(requirement) 
        ? prev.requirements 
        : [...prev.requirements, requirement],
    }));
  }, []);

  const handleRequirementRemove = useCallback((requirement: string) => {
    setFormData((prev: CreateJobOfferDTO) => ({
      ...prev,
      requirements: prev.requirements.filter((r: string) => r !== requirement),
    }));
  }, []);

  const setWorkDaysPreset = useCallback((preset: "WEEKDAYS" | "WEEKENDS" | "CUSTOM") => {
    if (preset === "WEEKDAYS") {
      handleChange("workDays", ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]);
    } else if (preset === "WEEKENDS") {
      handleChange("workDays", ["SATURDAY", "SUNDAY"]);
    }
  }, [handleChange]);

  const toggleDay = useCallback((day: DayWeek) => {
    setFormData((prev: CreateJobOfferDTO) => {
      const exists = prev.workDays.includes(day);
      if (exists) {
        return { ...prev, workDays: prev.workDays.filter((d: DayWeek) => d !== day) };
      }
      return { ...prev, workDays: [...prev.workDays, day] };
    });
  }, []);

  return {
    formData,
    handleChange,
    handleRequirementAdd,
    handleRequirementRemove,
    setWorkDaysPreset,
    toggleDay,
  };
};
