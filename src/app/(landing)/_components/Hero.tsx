import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative h-[200px] w-[200px] sm:w-[250px] sm:h-[250px]  md:h-[300px] md:w-[300px] ">
          <Image
            src="/documents.png"
            alt="documents"
            fill
            className="object-contain dark:hidden"
          />
          <Image
            src="/documents-dark.png"
            alt="documents"
            fill
            className="object-contain hidden dark:block"
          />
        </div>
        <div className="relative h-[400px] w-[400px] hidden md:block md:h-[300px] md:w-[300px]">
          <Image
            src="/reading.png"
            alt="Reading"
            fill
            className="object-contain dark:hidden"
          />
          <Image
            src="/reading-dark.png"
            alt="Reading"
            fill
            className="object-contain hidden dark:block"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
