"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Dialog, DialogPanel, Disclosure } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/create", label: "Create" },
  { href: "/library", label: "Library" }
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <Link className="inline-flex items-center gap-2 font-semibold text-primary-700" href="/">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg">
              MC
            </span>
            <span>MoodClip</span>
          </Link>
        </div>
        <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                className={`transition-colors hover:text-primary-600 ${isActive ? "text-primary-600" : ""}`}
                href={item.href}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            className="rounded-full bg-primary-600 px-4 py-2 text-white shadow-sm transition hover:bg-primary-700"
            href="/create"
          >
            Create sticker
          </Link>
        </div>
        <button
          className="inline-flex items-center rounded-full bg-white p-2 text-slate-600 shadow-sm md:hidden"
          onClick={() => setMobileOpen(true)}
          type="button"
        >
          <span className="sr-only">Open navigation</span>
          <Bars3Icon aria-hidden className="h-6 w-6" />
        </button>
      </nav>
      <Dialog className="md:hidden" onClose={setMobileOpen} open={mobileOpen}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <DialogPanel className="fixed inset-y-0 right-0 w-80 max-w-full bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <Link className="font-semibold text-primary-700" href="/" onClick={() => setMobileOpen(false)}>
              MoodClip
            </Link>
            <button
              className="rounded-full bg-slate-100 p-2 text-slate-600"
              onClick={() => setMobileOpen(false)}
              type="button"
            >
              <span className="sr-only">Close navigation</span>
              <XMarkIcon aria-hidden className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-6 space-y-3">
            {navigation.map((item) => (
              <Disclosure key={item.href}>
                {() => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      className={`block rounded-lg px-3 py-2 text-base font-medium transition hover:bg-primary-50 hover:text-primary-600 ${isActive ? "bg-primary-50 text-primary-600" : "text-slate-600"}`}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                }}
              </Disclosure>
            ))}
            <Link
              className="block rounded-full bg-primary-600 px-4 py-2 text-center font-semibold text-white"
              href="/create"
              onClick={() => setMobileOpen(false)}
            >
              Create sticker
            </Link>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
