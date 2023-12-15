"use client";

import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Error = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center space-y-4 w-full">
      <Image
        src={"/error-dark.png"}
        alt={"Error"}
        height={300}
        width={300}
        className="hidden dark:block"
      />
      <Image
        src={"/error.png"}
        alt={"Error"}
        height={300}
        width={300}
        className="block dark:hidden"
      />
      <h2 className="font-semibold text-3xl">Sorry! Something Went Wrong!</h2>
      <Button variant="outline" asChild>
        <Link href="/documents">Go Back</Link>
      </Button>
    </div>
  );
};

export default Error;
