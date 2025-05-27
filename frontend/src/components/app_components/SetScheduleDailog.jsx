"use client";

import { useState } from "react";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import SingleSetSchedule from "./SingleSetSchedule";
import Button from "../ui_components/Button";
import MultipleSetSchedule from "./MultipleSetSchedule";

export default function SetScheduleDailog({
  open,
  setOpen,
  currentWeek,
  setMine,
}) {
  const [currentTab, setCurrentTab] = useState("single");
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className=" ">
                <div className="flex">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    Set Schedule
                  </DialogTitle>
                  <div className="absolute right-0 top-2 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon aria-hidden="true" className="size-6" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 my-3">
                  <button
                    className={classNames(
                      currentTab === "single"
                        ? "text-white bg-black border-black "
                        : "text-black bg-white border-gray-300 ",
                      "text-sm text-gray-600  rounded-2xl  border-2 px-2 py-1 "
                    )}
                    onClick={() => setCurrentTab("single")}
                  >
                    Single
                  </button>
                  <button
                    className={classNames(
                      currentTab === "multiple"
                        ? "text-white bg-black border-black "
                        : "text-black bg-white border-gray-300 ",
                      "text-sm text-gray-600   rounded-2xl  border-2 px-2 py-1 "
                    )}
                    onClick={() => setCurrentTab("multiple")}
                  >
                    Mulitple
                  </button>
                </div>

                {currentTab === "single" ? (
                  <SingleSetSchedule
                    currentWeek={currentWeek}
                    open={open}
                    setOpen={setOpen}
                    setMine={setMine}
                  />
                ) : (
                  <MultipleSetSchedule
                    currentWeek={currentWeek}
                    open={open}
                    setOpen={setOpen}
                    setMine={setMine}
                  />
                )}
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
