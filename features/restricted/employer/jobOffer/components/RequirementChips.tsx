interface Props {
  requirements: { requirement_name: string }[];
}

export const RequirementChips = ({ requirements }: Props) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {requirements.map((r, i) => (
        <span
          key={i}
          className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-full"
        >
          {r.requirement_name}
        </span>
      ))}
    </div>
  );
};