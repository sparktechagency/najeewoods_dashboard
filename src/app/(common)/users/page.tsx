import ShadowBox from "@/components/common/shadow-box";
import { ArrowUp } from "lucide-react";
import React from "react";

export default function Users() {
  return (
    <div>
      <ShadowBox>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div>
            <h1 className="text-2xl font-semibold">Users</h1>
            <h1 className="text-xl">Total users: 1200</h1>
          </div>
          <h1 className="flex gap-2 mt-2 lg:mt-0">
            <span className="flex space-x-2 items-center text-green-figma">
              <ArrowUp className="size-5 text-green-figma" /> 20%
            </span>
            Increased from previous month
          </h1>
        </div>
      </ShadowBox>
    </div>
  );
}
