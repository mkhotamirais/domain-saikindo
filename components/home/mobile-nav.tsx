"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { FaMinus, FaPlus, FaWhatsapp } from "react-icons/fa6";
import { Logo } from "./header";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../theme/mode-toggle";
import { navbarMenu } from "@/lib/navbar-menu";

export default function MobileNav() {
  const pathname = usePathname();
  const [activeClick, setActiveClick] = useState<string | null>(null);
  const [activeClickChild, setActiveClickChild] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleAction = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const path1 = pathname.split("/")[1];
  const path2 = pathname.split("/")[2];

  useEffect(() => {
    setActiveClick(path1);
    setActiveClickChild(path2);
  }, [path1, path2]);

  return (
    <div className="md:hidden flex">
      <Sheet>
        <SheetTrigger className="items-center justify-center cursor-pointer">
          <div className={`transition text-primary`}>
            <Menu size={30} />
          </div>
        </SheetTrigger>
        <SheetContent className="bg-primary/25 border-none">
          <SheetHeader className="text-left relative">
            <SheetTitle>
              <Logo />
            </SheetTitle>
            <SheetDescription className="hidden">Nav Description</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col text-sm text-white mt-6">
            {navbarMenu.map((item, i) => (
              <div key={i}>
                <div
                  className={`flex justify-between gap-1 text-sm border-b ${
                    activeClick === item.href.split("/")[1] ? "text-primary" : ""
                  }`}
                >
                  <SheetClose asChild>
                    <Link href={item.href} className="py-3 w-full">
                      {item.label}
                    </Link>
                  </SheetClose>
                  {item.subMenu && (
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: expanded === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => toggleAction(i)}
                      className="flex items-center justify-center w-12"
                    >
                      {expanded === i ? <FaMinus /> : <FaPlus />}
                    </motion.div>
                  )}
                </div>
                {item?.subMenu && (
                  <AnimatePresence>
                    {expanded === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        {item?.subMenu?.map((itm, idx) => (
                          <div key={idx}>
                            <SheetClose asChild>
                              <Link
                                href={itm.href}
                                className={`py-2 block pl-2 ${
                                  activeClickChild === itm.href.split("/")[2] ? "text-primary" : ""
                                }`}
                              >
                                {itm.label}
                              </Link>
                            </SheetClose>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>
          <div className="absolute right-0 p-4 bottom-0 flex justify-between w-full gap-2">
            <SheetClose asChild>
              <Button asChild className={`bg-primary gap-2`}>
                <Link href="/#contact-us" title="Contact Us" className="flex items-center gap-2">
                  <FaWhatsapp size={22} />
                  Contact Us
                </Link>
              </Button>
            </SheetClose>
            <ModeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
