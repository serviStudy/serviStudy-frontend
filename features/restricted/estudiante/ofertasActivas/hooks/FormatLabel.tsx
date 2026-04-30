export const formatLabel = (text: string): string => {
    return text
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
};