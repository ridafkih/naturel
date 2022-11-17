import { useState } from "react";

export default function Home() {
  const [translationText, setTranslationText] = useState<string>("");

  const handleClick = () => {};

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-black p-4">
      <h1 className="text-xl font-bold text-white">Back&apos;n&apos;forth Translator</h1>
      <div className="flex gap-2">
        <input
          value={translationText}
          onChange={({ target }) => setTranslationText(target.value)}
          type="text"
          placeholder="Enter a phrase to translate."
          className="bg-neutral-900 px-2 py-1 rounded-sm border border-neutral-700 placeholder:text-neutral-600 min-w-[16rem] text-white focus:outline-none focus:border-neutral-600"
        />
        <button
          onClick={handleClick}
          className="bg-blue-600 px-4 text-white rounded-sm border border-blue-500 hover:border-blue-400 hover:bg-blue-500 active:border-blue-600 active:bg-blue-700 transition-colors"
        >
          Translate
        </button>
      </div>
    </div>
  );
}
