import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function DialogBox({
  isOpen,
  setIsOpen,
  selected,
  handleBooking,
}) {
  //   let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* <button onClick={() => setIsOpen(true)}>Open dialog</button> */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen shadow-xl items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border shadow-2xl bg-white p-12">
            {/* <DialogTitle className="font-bold">Deactivate account</DialogTitle> */}
            {/* <Description>
              <CheckIcon className="text-green-500 w-20 h-20 mx-auto" />
            </Description> */}
            <p>Desk{selected[0]} has been successfully booked</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleBooking();
                }}
                className="bg-blue-500 rounded-md text-white p-2"
              >
                Confirm
              </button>
              {/* <button
                onClick={() => setIsOpen(false)}
                className="bg-blue-500 rounded-md text-white p-2"
              >
                Deactivate
              </button> */}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
