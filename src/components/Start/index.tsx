interface StartProps {
  onClick: () => void;
}

export default function Start({ onClick }: StartProps) {
  return (
    <div className="fixed right-10 bottom-10">
      <button
        onClick={onClick}
        className="px-20 py-5 rounded-md shadow-md bg-emerald-700 font-semibold text-2xl text-white outline-none hover:bg-emerald-800 cursor-pointer"
      >
        Start
      </button>
    </div>
  );
}
