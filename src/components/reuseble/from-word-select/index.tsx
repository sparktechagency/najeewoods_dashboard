"use client";
import { useState } from "react";
import { CircleAlert, Plus, X } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

interface FormSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  stylelabel?: string;
  matching?: boolean;
  items?: any;
}

export function InputWordSelectField({
  name,
  label,
  placeholder,
  stylelabel,
  className,
  matching = false,
  items = [],
}: FormSelectProps) {
  const { control } = useFormContext();
  const [inputValue, setInputValue] = useState("");

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value = items }, fieldState: { error } }) => {
        const selectedNames = value || [];

        const handleAddTag = (e: React.KeyboardEvent) => {
          if (e.key === "Enter" && inputValue.trim()) {
            const newTags = [...selectedNames, inputValue];
            onChange(newTags);
            setInputValue("");
            e.preventDefault();
          }
        };

        const handleSubmitTag = () => {
          if (inputValue.trim()) {
            const newTags = [...selectedNames, inputValue];
            onChange(newTags);
            setInputValue("");
          }
        };

        // ✅ Fixed: remove by index number instead of tag value
        const handleRemoveTag = (index: number) => {
          const newTags = selectedNames.filter((_: any, i: number) => i !== index);
          onChange(newTags);
        };

        return (
          <div className="relative">
            <div className="mb-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder={placeholder}
                className={cn(
                  "w-full py-[22px] rounded-[20px] shadow-none",
                  className
                )}
              />
              <Button
                type="button"
                onClick={handleSubmitTag}
                className="bgOne absolute right-2 cursor-pointer top-[10px] h-7"
              >
                <Plus className="size-5" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {selectedNames?.map((tag: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center bg-[#3D3D3D] text-white py-1 px-3 rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)} // ✅ remove by index
                    className="ml-2 cursor-pointer text-white"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ))}
            </div>

            {!matching && (
              <Label
                className={cn(
                  "text-secondery-figma text-base font-medium absolute -top-3 left-7 bg-blacks px-3",
                  stylelabel
                )}
              >
                {label}
              </Label>
            )}

            {error?.message && (
              <h3 className="text-sm pt-[1px] text-end text-[#f73f4e] flex gap-1 items-center justify-end">
                {error.message}
                <CircleAlert size={14} />
              </h3>
            )}
          </div>
        );
      }}
    />
  );
}
