import { useDroppable } from "@dnd-kit/core";

type DropTaskProps = {
  status: string;
};

export default function DropTask({ status }: DropTaskProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: status
  });

  const isOverStyle = isOver
    ? "bg-green-100 border-green-500"
    : "bg-neutral-100 border-gray-300";

  return (
    <div
      ref={setNodeRef}
      className={`p-3 text-center text-xs text-gray-500 bg-neutral-100 border border-dashed border-gray-300 rounded ${isOverStyle}`}
    >
      Soltar tarea aquí
    </div>
  );
}
