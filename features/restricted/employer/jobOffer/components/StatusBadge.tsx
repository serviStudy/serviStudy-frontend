import { JobOfferStatus } from "../types/jobOffer.types";

interface Props {
  status: JobOfferStatus;
}

const styles: Record<JobOfferStatus, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  DISABLED: "bg-gray-50 text-gray-500 border border-gray-100",
  DELETED: "bg-red-100 text-red-600",
};

const labels: Record<JobOfferStatus, string> = {
  ACTIVE: "Activa",
  DISABLED: "Deshabilitada",
  DELETED: "Eliminada",
};

export const StatusBadge = ({ status }: Props) => {
  return (
    <span className={`px-3 py-1 text-xs rounded-full font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};