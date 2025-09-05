'use client'

// import HeroText from "@/components/level-2/HeroText";
import Title from "@/custom/cus-components/Title";

import SearchFormWB from "./SearchFormWB";


export default function Hero() {
  return (
   <>
     <div className="flex flex-col md:flex-row md:justify-between">
              <div>
               <Title />
                <div className="flex items-center gap-2 w-full">
                  <SearchFormWB />
                </div>
              </div>
              {/* <div>
                <HeroText />
              </div> */}
            </div>
   </>
  )
}
