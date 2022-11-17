import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import type {
  TranslateResponseSchema,
  TranslateRequestSchema,
} from "./api/translate";
import type { z } from "zod";
import { ArrowDownIcon, InfoCircledIcon } from "@radix-ui/react-icons";

export default function Home() {
  const [translationText, setTranslationText] = useState<string>("");
  const [completed, setCompleted] = useState<TranslateResponseSchema | null>();

  const handleClick = () => {
    axios
      .post<
        null,
        AxiosResponse<TranslateResponseSchema>,
        z.infer<typeof TranslateRequestSchema>
      >("/api/translate", {
        prospect: translationText,
      })
      .then(({ data }) => setCompleted(data));
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 bg-neutral-900 p-4">
      <h1 className="text-xl font-bold text-white">
        French Naturalizer
      </h1>
      <div className="flex flex-col gap-2 w-full max-w-xl">
        <div className="relative w-full">
          <textarea
            value={translationText}
            maxLength={500}
            onChange={({ target }) => setTranslationText(target.value)}
            placeholder="Enter a phrase to translate."
            className="block w-full p-4 bg-neutral-800 rounded-sm border-neutral-700 border text-neutral-100 outline-none focus:border-neutral-600"
          />
          <span className="absolute right-2 -top-1 -translate-y-full text-neutral-500 text-xs">{translationText.length}/500</span>
        </div>
        <button
          disabled={translationText.length <= 0}
          onClick={handleClick}
          className="bg-blue-600 px-4 py-1.5 w-full text-white rounded-sm border border-blue-500 hover:border-blue-400 hover:bg-blue-500 active:border-blue-600 active:bg-blue-700 transition-all disabled:opacity-40 disabled:filter disabled:saturate-0"
        >
          Naturalize
        </button>
      </div>
        {completed && (
          <div className="text-white flex flex-col items-center gap-4 text-center">
            <div className="p-4 bg-neutral-800 rounded-md border-neutral-700 border">
              <h2 className="uppercase text-xs text-neutral-400">your version</h2>
              <p className="max-w-[48ch] leading-7 text-neutral-200">{completed.original}</p>
            </div>
            <div className="bg-blue-500 p-2 rounded-full">
              <ArrowDownIcon />
            </div>
            <div className="flex flex-col p-4 bg-neutral-800 rounded-md border-neutral-700 border relative">
              <h2 className="uppercase text-xs text-neutral-400">more natural</h2>
              <p className="max-w-[48ch] leading-7 text-neutral-200">{completed.complete}</p>
              <div className="bg-neutral-700 border-neutral-500 border p-1 rounded-full w-fit absolute -bottom-4 right-6 hover:bg-neutral-600 hover:border-neutral-400 hover:cursor-pointer group">
                <div className="min-w-[32rem] p-4 hidden group-hover:absolute group-hover:block -bottom-2 right-0 transform translate-y-full rounded-sm shadow-lg bg-neutral-800 border-neutral-700 border">
                  <h2 className="uppercase text-xs text-neutral-400">...which means</h2>
                  <p className="text-xs leading-6 text-neutral-200 mt-2">{completed.candidate}</p>
                </div>
                <InfoCircledIcon color="white" />
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
