import { useMemo, useState } from "react";
import { ConvertJornadaTags } from "./ConvertJornadaTags";
import { ConvertWorkDayTags } from "./ConvertWorkDayTags";
import { ActiveOffer } from "../types/ofertasActivas.types";

export const useOfferFilter = (offers: ActiveOffer[]) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [selectedJornada, setSelectedJornada] = useState<string[]>([]);

    const filteredOffers = useMemo(() => {
        return offers.filter((offer) => {
            const convertedDays =
                ConvertWorkDayTags(offer.workDays);

            const convertedJornada =
                ConvertJornadaTags(offer.workSchedule);

            const searchableText = `
                ${offer.title}
                ${offer.description ?? ""}
                ${offer.establishmentAddress ?? ""}
            `.toLowerCase();

            const matchesSearch =
                searchTerm.trim() === "" || 
                searchableText.includes(searchTerm.toLowerCase())

            const matchesDays =
                selectedDays.length === 0 ||
                selectedDays.some((day) =>
                    convertedDays.includes(day)
                );

            const matchesJornada =
                selectedJornada.length === 0 ||
                selectedJornada.includes(
                    convertedJornada
                );

            return (
                matchesSearch &&
                matchesDays &&
                matchesJornada
            );
        });
    }, [
        offers,
        searchTerm,
        selectedDays,
        selectedJornada,
    ]);

    return {
        searchTerm,
        setSearchTerm,
        selectedDays,
        setSelectedDays,
        selectedJornada,
        setSelectedJornada,
        filteredOffers,
    };
};