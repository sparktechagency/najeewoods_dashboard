"use client";
import ShadowBox from "@/components/common/shadow-box";
import WapperBox from "@/components/reuseble/wapper-box";
import { CircleAlert, Plus, X } from "lucide-react";
import FavIcon from "@/icon/favIcon";
import { useEffect, useState } from "react";
import useConfirmation from "@/components/context/delete-modal";
import { Button } from "@/components/ui";
import emoji from "@/assets/unuse/angry.png";
import Image from "next/image";
import { Deletebtn, Editbtn } from "@/components/reuseble/icon-list";
import Modal from "@/components/reuseble/modal";
import { FieldValues, useForm } from "react-hook-form";
import Form from "@/components/reuseble/from";
import { FromInput } from "@/components/reuseble/from-input";
import ImgUpload from "@/components/reuseble/img-upload";
import { ImgBox } from "@/components/reuseble/img-box";
import { moodSchema } from "@/components/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const intImg = {
  ImgPreview: "",
  UpdatePreview: "",
};

export default function Moods() {
  const { confirm } = useConfirmation();
  const [isStore, setIsStore] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isImg, setIsImg] = useState<any>(intImg);

  const from = useForm({
    resolver: zodResolver(moodSchema),
    defaultValues: {
      icon: null,
      mood_name: "",
    },
  });

  //reset form
  useEffect(() => {
    if (!isStore) {
      from.reset();
      setIsImg(intImg);
    }
  }, [isStore, from]);

  // handleSubmit
  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
    from.reset();
    setIsImg(intImg);
  };

  // Updatefrom
  const Updatefrom = useForm({
    resolver: zodResolver(moodSchema),
    defaultValues: {
      icon: null,
      mood_name: "",
    },
  });
  // UpdateSubmit
  const updateSubmit = async (values: FieldValues) => {
    console.log(values);
    Updatefrom.reset();
    setIsImg(intImg);
  };

  //  handleDelete
  const handleDelete = async (id: string) => {
    const con = await confirm({
      title: "You are going to delete this mood",
      subTitle: "Delete mood",
      description:
        "After deleting, users wont be able to find this mood in your app",
    });
    if (con) {
      console.log(id);
    }
  };

  return (
    <div>
      <ShadowBox>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
            <div>
              <h1 className="text-2xl font-semibold">Moods</h1>
              <h1 className="text-base">Total moods: 05</h1>
            </div>
          <Button
            onClick={() => setIsStore(!isStore)}
            variant="primary"
            size="lg"
          >
            <Plus className="size-5" /> Add new mood
          </Button>
        </div>
      </ShadowBox>
      <WapperBox>
        <div className="pt-4 flex gap-6 lg:gap-4  2xl:gap-6 flex-wrap">
          {Array.from({ length: 10 }).map((item, index) => {
            return (
              <div
                className="border h-fit w-[200px]  bg-card-figma rounded-xl p-5 flex flex-col justify-between"
                key={index}
              >
                <div className="mx-auto">
                  <Image src={emoji} alt="img" width={60} height={20} />
                </div>
                <div className="text-center text-white text-lg  mt-1 mb-2 font-medium">
                 Angry
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span>
                    <Editbtn
                      onClick={() => setIsUpdate(!isUpdate)}
                      className="border-1"
                    />
                  </span>
                  <span>
                    <Deletebtn
                      onClick={() => handleDelete("123")}
                      className="border-1"
                    />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </WapperBox>
      {/* =================modal custom ================ */}
      <Modal
        open={isStore}
        setIsOpen={setIsStore}
        title="Create new mood"
        titleStyle="text-center"
      >
        <Form from={from} onSubmit={handleSubmit}>
          <div className="space-y-4">
            <ImgUpload
              onFileSelect={(file: File) => {
                setIsImg({
                  ...isImg,
                  ImgPreview: URL.createObjectURL(file),
                });
                from.setValue("icon", file, { shouldValidate: true });
              }}
            >
              <div>
                {isImg.ImgPreview ? (
                  <div className="mx-auto relative p-2 py-3 w-[170px]  h-fit rounded-md border-2 border-dashed">
                    <ImgBox
                      className="size-20 mx-auto"
                      src={isImg.ImgPreview}
                      alt="img"
                    />
                    <span className="absolute top-1 right-1 border p-[5px] rounded-sm">
                      {" "}
                      <FavIcon name="chnage" />
                    </span>
                  </div>
                ) : (
                  <div>
                    <div className="relative block w-fit h-fit p-5 mx-auto border-2 border-dashed rounded-2xl cursor-pointer transition-colors duration-200">
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="relative mb-4">
                          <FavIcon name="upload" />
                        </div>
                        <span className="text-white text-lg font-medium">
                          Upload mood image
                        </span>
                      </div>
                    </div>
                    {from?.formState?.errors?.icon && (
                      <p className="text-red-400 justify-center mt-1 flex items-center gap-1 text-sm">
                        {from?.formState?.errors?.icon?.message as string}
                        <CircleAlert size={14} />
                      </p>
                    )}
                  </div>
                )}
              </div>
            </ImgUpload>

            <FromInput name="mood_name" label="Mood name" />
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => {
                  from.reset();
                  setIsImg(intImg);
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
                Create
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
       {/*===============modal update ====================*/}
      <Modal
        open={isUpdate}
        setIsOpen={setIsUpdate}
        title="Edit mood"
        titleStyle="text-center"
      >
        <Form from={Updatefrom} onSubmit={updateSubmit}>
          <div className="space-y-4">
            <ImgUpload
              onFileSelect={(file: File) => {
                setIsImg({
                  ...isImg,
                  ImgPreview: URL.createObjectURL(file),
                });
               Updatefrom.setValue("icon", file, { shouldValidate: true });
              }}
            >
              <div>
                {isImg.ImgPreview ? (
                  <div className="mx-auto relative p-2 py-3 w-[170px]  h-fit rounded-md border-2 border-dashed">
                    <ImgBox
                      className="size-20 mx-auto"
                      src={isImg.ImgPreview}
                      alt="img"
                    />
                    <span className="absolute top-1 right-1 border p-[5px] rounded-sm">
                      {" "}
                      <FavIcon name="chnage" />
                    </span>
                  </div>
                ) : (
                  <div>
                    <div className="relative block w-fit h-fit p-5 mx-auto border-2 border-dashed rounded-2xl cursor-pointer transition-colors duration-200">
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="relative mb-4">
                          <FavIcon name="upload" />
                        </div>
                        <span className="text-white text-lg font-medium">
                          Upload mood image
                        </span>
                      </div>
                    </div>
                    {Updatefrom?.formState?.errors?.icon && (
                      <p className="text-red-400 justify-center mt-1 flex items-center gap-1 text-sm">
                        {Updatefrom?.formState?.errors?.icon?.message as string}
                        <CircleAlert size={14} />
                      </p>
                    )}
                  </div>
                )}
              </div>
            </ImgUpload>

            <FromInput name="mood_name" label="Mood name" />
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => {
                  Updatefrom.reset();
                  setIsImg(intImg);
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
               <FavIcon name="save"/>
               Save changes
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
