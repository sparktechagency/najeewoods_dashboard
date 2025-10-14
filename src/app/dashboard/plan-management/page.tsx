"use client";
import ShadowBox from "@/components/common/shadow-box";
import { BackBtn } from "@/components/reuseble/back-btn";
import WapperBox from "@/components/reuseble/wapper-box";
import { Button, Skeleton } from "@/components/ui";
import { FieldValues, useForm } from "react-hook-form";
import Form from "@/components/reuseble/from";
import { FromInput } from "@/components/reuseble/from-input";
import { InputWordSelectField } from "@/components/reuseble/from-word-select";
import ColorPicker from "react-best-gradient-color-picker";
import tinycolor from "tinycolor2";
import { X } from "lucide-react";
import FavIcon from "@/icon/favIcon";
import { useEffect, useRef, useState } from "react";
import {
  useGetPlanQuery,
  useUpdatePlanMutation,
} from "@/redux/api/subscribersApi";
import RepeatCount from "@/components/reuseble/repeat-count/count";
import { InputSelectField } from "@/components/reuseble/from-select";
import Modal2 from "@/components/reuseble/modal2";
import { CloseIcon } from "@/components/reuseble/btn-modal";
import { toast } from "sonner";

export default function Planmanagement() {
  const colorPickerRef = useRef<HTMLDivElement | null>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const { data: plans, isLoading } = useGetPlanQuery({});
  const [isPlan, setIsPlan] = useState<any>({});
  const [updatePlan, { isLoading: UpdateLoading }] = useUpdatePlanMutation();
  const [isColor, setIsColor] = useState({
    update: false,
    updateColor: "",
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setIsColor((prev) => ({ ...prev, update: false }));
      }
    };

    if (isColor.update) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isColor.update]);
  // Update form
  const fromUpdate = useForm({
    defaultValues: {
      name: "",
      color: "",
      price: "",
      interval: "",
      features: [],
    },
  });

  useEffect(() => {
    fromUpdate.reset({
      color: isPlan?.color,
      name: isPlan?.name,
      price: isPlan?.price,
      features: isPlan?.features,
      interval: isPlan.interval,
    });
    setIsColor((prev) => ({ ...prev, updateColor: isPlan.color }));
  }, [fromUpdate, isPlan]);

  const handleSubmitUpdate = async (values: FieldValues) => {
    const value = {
      ...values,
      currency: "usd",
    };
    const res = await updatePlan({ id: isPlan._id, data: value }).unwrap();
    if (res.success) {
      toast.success("Plan Updated Successfully", {
        description: "Your plan has been updated successfully.",
      });
      handleUpdateReset();
    }
  };

  // handleUpdateReset
  const handleUpdateReset = () => {
    fromUpdate.reset();
    setIsPlan({});
    setIsColor((prev) => ({ ...prev, update: false }));
    setIsUpdate(false);
  };

  return (
    <div>
      <ShadowBox>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div className="flex gap-2">
            <BackBtn />
            <div>
              <h1 className="text-2xl font-semibold">Plan management</h1>
              <h1 className="text-base">
                {plans?.data?.length || 0} Active Plans
              </h1>
            </div>
          </div>
        </div>
      </ShadowBox>
      <WapperBox>
        <div className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {isLoading ? (
              <RepeatCount count={6}>
                <Skeleton className="h-[450px] w-full" />
              </RepeatCount>
            ) : (
              plans?.data?.map((plan: any) => (
                <div
                  key={plan._id}
                  className={`rounded-2xl relative flex flex-col bg-blur bg-blacks/20  justify-between py-6 pl-6  border text-white overflow-hidden`}
                >
                  <span className="absolute cursor-pointer right-2 top-2">
                    <Button
                      onClick={() => {
                        setIsPlan(plan);
                        setIsUpdate(!isUpdate);
                      }}
                      size="icon"
                      variant="outline"
                      className="rounded-md"
                    >
                      <FavIcon className="size-4" name="edit" />
                    </Button>
                  </span>
                  <div
                    style={{
                      background: `linear-gradient(148deg, rgba(29, 29, 29, 0.20),rgba(29, 29, 29, 0.20), ${plan?.color})`,
                      opacity: 0.3,
                    }}
                    className="w-[360px] h-[300px] absolute bottom-0 z-0 right-0"
                  ></div>
                  <div className="z-1">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
                      <div className="flex items-baseline">
                        <span className="text-3xl font-semibold">
                          {plan.price}
                        </span>
                        <span className="ml-1 text-secondery-figma">
                          / {plan.interval}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                      <div className="flex items-center justify-center">
                        <h1 className="text-lg font-medium mr-2"> Features</h1>
                        <h1 className="bg-border h-px w-full mt-1"></h1>
                      </div>
                      <ul className="space-y-2 mt-5">
                        {plan.features.map((feature: any, index: any) => (
                          <li key={index} className="flex items-start">
                            <span className="text-white/80 mr-2 mt-1 flex-shrink-0">
                              •
                            </span>
                            <span className="text-white/90 leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </WapperBox>

      {/* =================Update plan  ================ */}
      <Modal2
        open={isUpdate}
        setIsOpen={setIsUpdate}
        title="Update Plan"
        titleStyle="text-center"
      >
        <CloseIcon className="mt-2 mr-2" onClose={() => handleUpdateReset()} />
        <Form from={fromUpdate} onSubmit={handleSubmitUpdate}>
          <div ref={colorPickerRef} className="space-y-5">
            <div className="grid py-1 place-items-center relative border rounded-2xl">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setIsColor({ ...isColor, update: !isColor.update });
                }}
                className="w-[95%] cursor-pointer mx-auto p-2 rounded-sm  m-2"
                style={{
                  background: isColor.updateColor,
                }}
              ></div>
              <span className="text-secondery-figma text-base font-medium absolute -top-3 left-7 bg-blacks px-3">
                Color Select
              </span>
              {isColor.update && (
                <div className="absolute top-8 left-0 z-60">
                  <ColorPicker
                    hideInputs={true}
                    hideOpacity={true}
                    hideControls={true}
                    hideColorTypeBtns={true}
                    hidePresets={true}
                    hideEyeDrop={true}
                    hideAdvancedSliders={true}
                    hideColorGuide={true}
                    hideInputType={true}
                    hideGradientType={true}
                    hideGradientAngle={true}
                    hideGradientStop={true}
                    hideGradientControls={true}
                    width={300}
                    height={200}
                    value={fromUpdate.watch("color")}
                    onChange={(color) => {
                      const hexValue = tinycolor(color).toHexString();
                      setIsColor({ ...isColor, updateColor: color });
                      fromUpdate.setValue("color", hexValue);
                    }}
                  />
                </div>
              )}
            </div>
            <FromInput
              name="name"
              label="Plan Name"
              placeholder="Plan name hare"
            />
            <FromInput
              name="price"
              label="Price"
              type="number"
              placeholder="Price hare for number"
            />
            <InputSelectField
              items={[
                { value: "week", label: "Week" },
                { value: "month", label: "Month" },
                { value: "year", label: "Year" },
              ]}
              name="interval"
              label="Interval"
              placeholder="Price hare for number"
            />

            <InputWordSelectField
              name="features"
              label="Features"
              placeholder="Add Features name (press Enter)"
              matching={false}
              className="w-full"
            />
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleUpdateReset()}
                size="lg"
                type="button"
                className="bg-modal-figma hover:bg-modal-figma cursor-pointer  rounded-xl w-full"
              >
                <X className="size-5" />
                Cancel
              </Button>
              <Button
                disabled={UpdateLoading}
                variant="primary"
                size="lg"
                className="w-full"
              >
                <FavIcon name="save" />
                Save changes
              </Button>
            </div>
          </div>
        </Form>
      </Modal2>
    </div>
  );
}
