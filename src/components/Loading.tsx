export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen opacity-95 flex items-center justify-center bg-gray-900 z-20">
      <p className="text-white text-3xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-loader-2 animate-spin"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 3a9 9 0 1 0 9 9" />
        </svg>
      </p>
    </div>
  );
}
