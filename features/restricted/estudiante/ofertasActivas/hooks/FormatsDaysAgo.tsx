export const formatDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    const diffInDays = Math.floor(
        (now.getTime() - date.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) return "Hoy";
    if (diffInDays === 1) return "Ayer";

    return `${diffInDays} días`;
};