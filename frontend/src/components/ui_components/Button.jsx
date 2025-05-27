export default function Button({ setOpen, text }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (text === "Set Schedule") setOpen(true);
      }}
      className="inline-flex items-center gap-x-2 rounded-md bg-[#AEEA94] px-3.5 py-3 text-sm font-semibold text-black shadow-sm hover:bg-[#97cc82] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {text}
    </button>
  );
}
