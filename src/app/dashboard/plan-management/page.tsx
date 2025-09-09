"use client";
import ShadowBox from "@/components/common/shadow-box";
import { BackBtn } from "@/components/reuseble/back-btn";
import { ImgBox } from "@/components/reuseble/img-box";
import WapperBox from "@/components/reuseble/wapper-box";
import { ArrowUp, Plus, X } from "lucide-react";
import photo1 from "@/assets/unuse/photo1.jpg";
import FavIcon from "@/icon/favIcon";
import { useState } from "react";
import Avatars from "@/components/reuseble/avater";
import ModalOne from "@/components/reuseble/modal-one";
import { PlaceholderImg } from "@/lib";
import img1 from "@/assets/unuse/img1.jpg";
import LikeToggle from "@/components/reuseble/like-toggle";
import useConfirmation from "@/components/context/delete-modal";
import { Button } from "@/components/ui";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/components/reuseble/modal";
import Form from "@/components/reuseble/from";
import { FromInput } from "@/components/reuseble/from-input";
import { InputWordSelectField } from "@/components/reuseble/from-word-select";
import { Deletebtn, Editbtn } from "@/components/reuseble/icon-list";
import ColorPicker from "react-best-gradient-color-picker";
import tinycolor from "tinycolor2";

const pricingPlans = [
  {
    id: 1,
    title: "Video Creator Pro",
    price: "$9.99",
    period: "/ month",
    gradient: "from-purple-600 to-purple-800",
    buttonGradient: "from-purple-500 to-purple-700",
    color: "#513a89",
    features: [
      "All features from other plans included.",
      "Plus:",
      "Pin multiple vids at once.",
      "Add clickable links via music, silent, preset.",
      "Access to the new sharing charts, reactions, photos.",
      "Profile badge that marks them as a 'Verified VIP Creator'.",
    ],
  },
  {
    id: 2,
    title: "Premium Vibe Planning",
    price: "$3.99",
    period: "/ month",
    gradient: "from-orange-500 to-orange-700",
    buttonGradient: "from-orange-400 to-orange-600",
    color: "#7d3d0d",
    features: [
      "Customize shopping with colors and animated text/font styles.",
      "Spend unlimited money/buy up to 5x.",
      "About music or voice long-live.",
      "Higher tier placement on the voice map.",
    ],
  },
  {
    id: 3,
    title: "Local Music Station Pro",
    price: "$2.99",
    period: "/ month",
    gradient: "from-teal-500 to-teal-700",
    buttonGradient: "from-teal-400 to-teal-600",
    color: "#0d6f69",
    features: [
      "Gives full access to the live community, powered music streams.",
      "Unlocks live ability list.",
      "Up to 5 music live sound clips.",
      "View unknown songs.",
      "Get higher priority on track playtime.",
      "Listeners without a subscription can only hear live station.",
    ],
  },
  {
    id: 4,
    title: "Voice Podcast Builder",
    price: "$1.00",
    period: "/ month",
    gradient: "from-red-500 to-red-700",
    buttonGradient: "from-red-400 to-red-600",
    color: "#8a3333",
    features: [
      "Unlocks voice recording & posting.",
      "Users can add audio files to mini podcast.",
      "Voice notes appear as pins or feed content.",
      "Useful for creators using only their phone.",
    ],
  },
];

export default function Planmanagement() {
  const [isStore, setIsStore] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isColor, setIsColor] = useState({
    add: false,
    addColor: "rgb(59,130,246)",
    update: false,
    updateColor: "rgb(59,130,246)",
  });
  const { confirm } = useConfirmation();

  // handleDelete
  const handleDelete = async (id: string) => {
    const con = await confirm({
      title: "You are going to delete this plan",
      subTitle: "Delete plan",
      description:
        "After deleting, users wont be able to see and purchase this plan.",
    });
    if (con) {
      console.log(id);
    }
  };

  const from = useForm({
    // resolver: zodResolver(podcastSchema),
    defaultValues: {
      color: "",
      name: "",
      price: "",
      feature: [],
    },
  });

  // useEffect(() => {
  //   if (!isStore) {
  //     from.reset();
  //     setIsAudio({ audioPreview: "" });
  //   }
  // }, [isStore, from]);

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
  };

  // update form
  const fromUpdate = useForm({
    // resolver: zodResolver(podcastSchema),
    defaultValues: {
      color: "#db8505",
      name: "",
      price: "",
      feature: [],
    },
  });

  const handleSubmitUpdate = async (values: FieldValues) => {
    console.log(values);
  };

  return (
    <div>
      <ShadowBox>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div className="flex gap-2">
            <BackBtn />
            <div>
              <h1 className="text-2xl font-semibold">Plan management</h1>
              <h1 className="text-base">4 active plans</h1>
            </div>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsStore(!isStore)}
            size="lg"
          >
            <Plus className="size-5" /> Add new plan
          </Button>
        </div>
      </ShadowBox>
      <WapperBox>
        <div className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl flex flex-col bg-blur justify-between py-6 pl-6  border text-white relative overflow-hidden`}
              >
                <div
                  // style={{
                  //   background:`linear-gradient(180deg, #d41414 0%, #d41414 0%)`,
                  // }}
                  className="w-[200px] h-[150px] absolute bottom-0 z-0 right-0"
                ></div>
                <div className="z-1">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-xl font-medium mb-2">{plan.title}</h3>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-semibold">
                        {plan.price}
                      </span>
                      <span className="ml-1 text-secondery-figma">
                        {plan.period}
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
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          {feature === "Plus:" ? (
                            <span className="font-medium">{feature}</span>
                          ) : (
                            <>
                              <span className="text-white/80 mr-2 mt-1 flex-shrink-0">
                                •
                              </span>
                              <span className="text-white/90 leading-relaxed">
                                {feature}
                              </span>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex z-1 justify-center gap-3">
                  <span>
                    <Button
                      onClick={() => setIsUpdate(!isUpdate)}
                      size={"lg"}
                      variant={"outline"}
                      className="!px-10"
                    >
                      <FavIcon className="size-4" name="edit" />
                      Edit
                    </Button>
                  </span>
                  <span>
                    <Button
                      onClick={() => handleDelete("345")}
                      size={"lg"}
                      variant={"outline"}
                      className="!px-10"
                    >
                      <FavIcon className="size-4" name="delete" />
                      Delete
                    </Button>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </WapperBox>
      {/* =================Upload plan  ================ */}
      <Modal
        open={isStore}
        setIsOpen={setIsStore}
        title="Create new plan"
        titleStyle="text-center"
      >
        <Form from={from} onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="grid py-1 place-items-center relative border rounded-2xl">
              <div
                onClick={() => setIsColor({ ...isColor, add: !isColor.add })}
                className="w-[95%] cursor-pointer mx-auto p-2 rounded-sm  m-2"
                style={{
                  background: isColor.addColor,
                }}
              ></div>
              <span className="text-secondery-figma text-base font-medium absolute -top-3 left-7 bg-blacks px-3">
                Color Select
              </span>
              {isColor.add && (
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
                    value={from.watch("color")}
                    onChange={(color) => {
                      const hexValue = tinycolor(color).toHexString();
                      setIsColor({ ...isColor, addColor: color });
                      from.setValue("color", hexValue);
                    }}
                  />
                </div>
              )}
            </div>
            <FromInput
              name="name"
              label="Plan name"
              placeholder="Plan name hare"
            />
            <FromInput
              name="price"
              label="Price"
              type="number"
              placeholder="Price hare for number"
            />

            <InputWordSelectField
              name="feature"
              label="Features"
              placeholder="Add Features name (press Enter)"
              matching={false}
              className="w-full"
            />
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => {
                  from.reset();
                  setIsStore(!isStore);
                }}
                size="lg"
                type="button"
                className="bg-modal-figma hover:bg-modal-figma cursor-pointer  rounded-xl w-full"
              >
                <X className="size-5" />
                Cancel
              </Button>
              <Button variant="primary" size="lg" className="w-full">
                {" "}
                <Plus className="size-5" />
                Add
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
      {/* =================Update plan  ================ */}
      <Modal
        open={isUpdate}
        setIsOpen={setIsUpdate}
        title="Update plan"
        titleStyle="text-center"
      >
        <Form from={fromUpdate} onSubmit={handleSubmitUpdate}>
          <div className="space-y-5">
            <div className="grid py-1 place-items-center relative border rounded-2xl">
              <div
                onClick={() =>
                  setIsColor({ ...isColor, update: !isColor.update })
                }
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
                    value={from.watch("color")}
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
              label="Plan name"
              placeholder="Plan name hare"
            />
            <FromInput
              name="price"
              label="Price"
              type="number"
              placeholder="Price hare for number"
            />

            <InputWordSelectField
              name="feature"
              label="Features"
              placeholder="Add Features name (press Enter)"
              matching={false}
              className="w-full"
            />
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => {
                  fromUpdate.reset();
                  setIsUpdate(!isUpdate);
                }}
                size="lg"
                type="button"
                className="bg-modal-figma hover:bg-modal-figma cursor-pointer  rounded-xl w-full"
              >
                <X className="size-5" />
                Cancel
              </Button>
              <Button variant="primary" size="lg" className="w-full">
                {" "}
                <FavIcon name="save" />
                Save changes
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
