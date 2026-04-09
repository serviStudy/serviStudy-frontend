"use client";

import { JobOfferDTO } from "../types/jobOffer.types";
import { RequirementChips } from "./RequirementChips";
import { StatusBadge } from "./StatusBadge";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface Props {
  offer: JobOfferDTO;
}

export const OfferCard = ({ offer }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-5 flex flex-col md:flex-row gap-4">

      <div className="w-full md:w-28 h-28 bg-gray-200 rounded-lg" />

      <div className="flex-1 flex flex-col">
  
        <div className="flex justify-between items-start">
          <div>
            <StatusBadge status={offer.status} />
            <h3 className="text-lg font-semibold mt-1">{offer.title}</h3>
            <p className="text-sm text-gray-500">
              {offer.establishment_address}
            </p>
          </div>

          <div className="flex gap-3">
            <Pencil size={18} className="text-gray-500 cursor-pointer" />
            <Trash2 size={18} className="text-red-500 cursor-pointer" />
          </div>
        </div>

        {/* Salario */}
        <p className="text-green-600 font-medium mt-2">
          ${offer.salary.toLocaleString()}
        </p>

        {/* Chips */}
        <RequirementChips requirements={offer.requirements} />

        {/* Botón */}
        <div className="mt-4 md:mt-auto flex justify-end">
          <Link
            href={`/empleador/(offers)/offer-detail/${offer.id_job_offers}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm w-full md:w-auto text-center"
          >
            Ver oferta
          </Link>
        </div>
      </div>
    </div>
  );
};