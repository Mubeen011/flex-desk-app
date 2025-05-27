import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  ArrowRightEndOnRectangleIcon,
  Bars3Icon,
  BuildingOfficeIcon,
  BellIcon,
  ChartPieIcon,
  ChevronLeftIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  CursorArrowRaysIcon,
  RectangleGroupIcon,
  UserGroupIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Outlet, NavLink } from "react-router-dom";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
// import MIVADA_LOGO from "../assets/MIVADA_LOGO.svg";
import MIVADA_LOGO from "../../assets/MIVADA_LOGO.svg";

const navigation = [
  {
    name: "Dashboard",
    href: "/app/dashboard",
    icon: RectangleGroupIcon,
    current: true,
  },
  {
    name: "People",
    href: "/app/people",
    icon: UsersIcon,
    current: false,
  },
  {
    name: "Groups",
    href: "/app/groups",
    icon: UserGroupIcon,
    current: false,
  },
  {
    name: "Floor Plan",
    href: "/app/floorplan",
    icon: BuildingOfficeIcon,
    current: false,
  },
  {
    name: "Analytics",
    href: "/app/analytics",
    icon: ChartPieIcon,
    current: false,
  },
];
// const teams = [
//   { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
//   { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
//   { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
// ]
const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [heading, setHeading] = useState("Dashboard");

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };
  const handleHeadingChange = (heading) => {
    setHeading(heading);
  };
  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src={MIVADA_LOGO}
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <NavLink
                              to={item.href}
                              onClick={() => handleHeadingChange(item.name)}
                              className={({ isActive }) =>
                                classNames(
                                  isActive
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                  "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                )
                              }
                            >
                              <item.icon
                                aria-hidden="true"
                                className="h-6 w-6 shrink-0"
                              />
                              {item.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                    {/* <li>
                      <div className="text-xs font-semibold leading-6 text-gray-400">
                        Your teams
                      </div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {teams.map((team) => (
                          <li key={team.name}>
                            <a
                              href={team.href}
                              className={classNames(
                                team.current
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                              )}
                            >
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                {team.initial}
                              </span>
                              <span className="truncate">{team.name}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li> */}
                    <li className="mt-auto">
                      <button className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white">
                        <Cog6ToothIcon
                          aria-hidden="true"
                          className="h-6 w-6 shrink-0"
                        />
                        Settings
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div
          className={classNames(
            collapse ? "lg:w-20" : "lg:w-72", // Conditional width
            "hidden lg:fixed lg:inset-y-0",
            "lg:z-50 lg:flex lg:flex-col",
            "transition-all duration-500 ease-in-out" // Transition for width and all properties
          )}
        >
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#1f1f21] px-6 pb-4 relative">
            <div
              className={classNames(
                "flex h-16 items-center justify-between transition-all duration-500 ease-in-out",
                collapse ? "gap-0" : "gap-x-4"
              )}
            >
              {/* Logo section */}
              <img
                alt="Your Company"
                src={MIVADA_LOGO}
                className={classNames(
                  "transition-all overflow-hidden",
                  collapse ? "w-0 h-8" : "w-auto h-8"
                )}
              />
              <button
                className="p-1.5 rounded-2xl bg-gray-50 hover:bg-gray-100 h-8 w-8 -right-0 transition-all duration-500 ease-in-out"
                onClick={toggleCollapse}
              >
                {collapse ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </button>
            </div>

            {/* Toggle button positioned on the right border */}

            <nav className="flex flex-1 flex-col">
              <ul className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          to={item.href}
                          onClick={() => handleHeadingChange(item.name)}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "bg-[#434245] font-sans text-white"
                                : "text-gray-400 font-sans hover:bg-[#434245] hover:text-white",
                              "group flex rounded-md text-sm font-semibold leading-6 transition-all duration-500 ease-in-out",
                              collapse
                                ? "justify-center p-2 w-full"
                                : "justify-start p-2 gap-x-3"
                            )
                          }
                        >
                          <item.icon
                            aria-hidden="true"
                            className={classNames(
                              collapse
                                ? "h-7 w-7 shrink-0"
                                : "h-6 w-6 shrink-0",
                              "transition-all duration-500 ease-in-out"
                            )}
                          />
                          {collapse ? "" : item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="mt-auto space-y-1">
                  <NavLink
                    to="/app/settings"
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "bg-[#434245] text-white"
                          : "text-gray-400 hover:bg-[#434245] hover:text-white",
                        "group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-[#434245] hover:text-white transition-all duration-500 ease-in-out",
                        collapse ? "justify-center" : "justify-start"
                      )
                    }
                  >
                    <Cog6ToothIcon
                      aria-hidden="true"
                      className={classNames(
                        collapse ? "h-7 w-7 shrink-0" : "h-6 w-6 shrink-0",
                        "transition-all duration-500 ease-in-out"
                      )}
                    />
                    {collapse ? "" : "Settings"}
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div
          className={classNames(
            collapse ? "lg:pl-20" : "lg:pl-72",
            "transition-all duration-500 ease-in-out"
          )}
        >
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Separator */}
            <div
              aria-hidden="true"
              className="h-6 w-px bg-gray-900/10 lg:hidden"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <h1 className="relative flex flex-1 items-center text-3xl font-sans tracking-wide">
                {heading}
              </h1>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>

                {/* Separator */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full bg-gray-50"
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        aria-hidden="true"
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                      >
                        Tom Cook
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 text-gray-400"
                      />
                    </span>
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <a
                          href={item.href}
                          className=" font-sans block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                        >
                          {item.name}
                        </a>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-1">
            <div className="sm:px-4 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
