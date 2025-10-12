import { CircleAlert, Loader } from "lucide-react";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type ControllerRenderProps,
  type ControllerFieldState,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useGetMoodsQuery } from "@/redux/api/moodsApi";
import { useEffect, useState } from "react";
import { ImgBox } from "../img-box";
import { useInView } from "react-intersection-observer";
import { helpers } from "@/lib";

interface FormSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  stylelabel?: string;
  matching?: boolean;
  className?: string;
  itemStyle?: string;
  iconStyle?: string;
  open?: boolean;
}

export function InputSelectMood({
  name,
  label,
  placeholder,
  stylelabel,
  matching = false,
  className,
  itemStyle,
  iconStyle,
  open,
}: FormSelectProps) {
  const { ref, inView } = useInView();
  const [selectMoods, setSelectMoods] = useState<any[]>([]);
  const { control } = useFormContext();
  const [isPage, setIsPage] = useState(1);
  const {
    data: moodsItem,
    isLoading,

  } = useGetMoodsQuery({ page: isPage,skip:!open });

  useEffect(() => {
    setSelectMoods([]);
  }, [open]);

  useEffect(() => {
    if (moodsItem?.data?.length) {
      const existingIds = new Set(selectMoods.map((v: any) => v.value));

      // Filter out items that are already in the state to avoid duplicates
      const newItems = moodsItem.data.filter(
        (item: any) => !existingIds.has(item._id)
      );

      if (newItems.length > 0) {
        const newMoods = newItems.map((item: any) => ({
          label: item.name,
          value: item._id,
          icon: (
            <ImgBox
              className="size-7"
              src={process.env.NEXT_PUBLIC_IMG_URL + item.icon}
              alt="img"
            />
          ),
        }));

        // Add new items to the current list only if they are not already present
        setSelectMoods((prev) => [...prev, ...newMoods]);
      }
    }
  }, [moodsItem?.data, open]);

  const isMoodsEmpty = moodsItem?.data?.length === 0;

  // Fetch the next page of data when scrolled to the bottom
  useEffect(() => {
    if (inView && !isLoading && !isMoodsEmpty) {
      setIsPage((prev) => prev + 1);
    }
  }, [inView, isLoading, isMoodsEmpty]);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }: {
        field: ControllerRenderProps<FieldValues>;
        fieldState: ControllerFieldState;
      }) => (
        <div className="relative">
          <Select onValueChange={onChange} value={value}>
            <SelectTrigger
              className={cn(
                "w-full items-center rounded-[20px] py-[22px] cursor-pointer shadow-none",
                className
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="rounded-md h-[290px] bg-blacks p-0">
              <SelectGroup className="p-0 m-0">
                {selectMoods.map((item, index) => (
                  <SelectItem
                    className={cn(
                      "border-b last:border-b-0 cursor-pointer py-2 pl-4 text-white rounded-none",
                      itemStyle
                    )}
                    key={index} // Use item.value or item._id for unique keys
                    value={item.value}
                  >
                    <span className="flex justify-center items-center">
                      {item.icon && (
                        <span className={cn("mr-1", iconStyle)}>
                          {item.icon}
                        </span>
                      )}
                      {helpers.capitalize(item.label)}
                    </span>
                  </SelectItem>
                ))}
              </SelectGroup>
              {!isLoading && !isMoodsEmpty && (
                <div ref={ref} className="mx-auto flex justify-center mt-5">
                  <Loader className="animate-spin text-blacks/20" />
                </div>
              )}
            </SelectContent>
          </Select>
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
      )}
    />
  );
}
