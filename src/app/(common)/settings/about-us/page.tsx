"use client";
import ShadowBox from "@/components/common/shadow-box";
import TextEditor from "@/components/reuseble/text-editor";
import WapperBox from "@/components/reuseble/wapper-box";
import { Button } from "@/components/ui";
import { useState } from "react";

export default function AboutUs() {
    const [content, setContent] = useState<string>("");
  return (
    <div>
      <ShadowBox>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div>
            <h1 className="text-2xl font-semibold">About us</h1>
            <h1 className="text-base">Last updated 6 days ago</h1>
          </div>
          <Button variant="primary" size="lg">
            Save changes
          </Button>
        </div>
      </ShadowBox>
      <WapperBox>
       <div className="mt-5">
             {/* {termsLoading ? (
        <div className="mx-auto min-h-[280px] flex items-center justify-center">
          <Loader className="animate-spin text-reds" />
        </div>
      ) : (
        <TextEditor value={content} onChange={setContent} />
      )} */}
      <TextEditor value={content} onChange={setContent} />
       </div>

      </WapperBox>
    </div>
  );
}
