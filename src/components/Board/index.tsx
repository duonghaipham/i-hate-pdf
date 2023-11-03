interface StartProps {
  title: string;
  onClick: () => void;
}

export default function Start({ title, onClick }: StartProps) {
  return (
    <div className="h-full border-t-[2px] border-l-[2px] bg-white">
      <h1 className="border-b-[2px] py-4 font-semibold text-2xl text-center">
        {title}
      </h1>
      <div>
        <div className="fixed right-10 bottom-10">
          <button
            onClick={onClick}
            className="px-20 py-5 rounded-md shadow-md bg-emerald-700 font-semibold text-2xl text-white outline-none hover:bg-emerald-800 cursor-pointer"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}
