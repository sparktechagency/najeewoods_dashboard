"use client";
import ShadowBox from "@/components/common/shadow-box";
import WapperBox from "@/components/reuseble/wapper-box";
import { CircleAlert, EllipsisVertical, Plus, X } from "lucide-react";
import FavIcon from "@/icon/favIcon";
import { useEffect, useState } from "react";
import Avatars from "@/components/reuseble/avater";
import ModalOne from "@/components/reuseble/modal-one";
import { helpers, PlaceholderImg, userVisibiliy } from "@/lib";
import LikeToggle from "@/components/reuseble/like-toggle";
import useConfirmation from "@/components/context/delete-modal";
import MusicPlayer from "@/components/common/music-player";
import { Button, Skeleton } from "@/components/ui";
import Modal from "@/components/reuseble/modal";
import { FieldValues, useForm } from "react-hook-form";
import Form from "@/components/reuseble/from";
import { FromInput } from "@/components/reuseble/from-input";
import { FromTextArea } from "@/components/reuseble/from-textarea";
import { InputSelectField } from "@/components/reuseble/from-select";
import AudioUpload from "@/components/reuseble/audio-box";
import { zodResolver } from "@hookform/resolvers/zod";
import { musicSchema, podcastSchema } from "@/components/schema";
import { InputWordSelectField } from "@/components/reuseble/from-word-select";
import { vibeOptions } from "@/components/dummy-json";
import {
  useDeletePostMutation,
  useGetPostQuery,
  useStorePostMutation,
  useUpdatePostMutation,
} from "@/redux/api/commonApi";
import { useGlobalState } from "@/components/hooks";
import { NoItemData } from "@/components/reuseble/table-no-item";
import { Pagination } from "@/components/reuseble/pagination";
import { MusicSkeleton } from "@/components/common/skeleton-card";

const intGlobal: any = {
  isPage: 1,
  isPreview: false,
  isStore: false,
  isUpdate: false,
  isShow: null,
  isDetails: {},
};

export default function Podcasts() {
  const { confirm } = useConfirmation();
  const [global, updateGlobal] = useGlobalState(intGlobal);
  const [isActive, setIsActive] = useState("Owned");
  const [isAudio, setIsAudio] = useState<any>({ audioPreview: "" });
  const [storePost, { isLoading }] = useStorePostMutation();
  const [deletePost] = useDeletePostMutation();
  const query = {
    post_type: "podcast",
    page: global.isPage,
    get: isActive === "Owned" ? "owned" : "user",
    // limt:"10"
  };
  const { data: podcasts, isLoading: podcastIsLoading } = useGetPostQuery({
    ...query,
  });
  console.log(podcasts);
  const [updatePost, { isLoading: updateIsLoading }] = useUpdatePostMutation();
  const [isEditItem, setIsEditItem] = useState<any>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".menu-container")) {
        updateGlobal("isShow", null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [updateGlobal]);

  const from = useForm({
    // resolver: zodResolver(podcastSchema),
    defaultValues: {
      audio: null,
      location: "",
      caption: "",
      vibe: "",
      guests: [],
      visibility: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
  };
  // update music
  const fromUpdate = useForm({
    // resolver: zodResolver(podcastSchema),
    defaultValues: {
      audio: null,
      location: "",
      caption: "",
      vibe: "",
      guests: ["good", "nice"],
      visibility: "",
    },
  });
  const handleSubmitMusic = async (values: FieldValues) => {
    console.log(values);
  };

  // hanldedelete
  const handleDelete = async (id: string) => {
    const con = await confirm({
      title: "You are going to delete this music",
      subTitle: "Delete Music",
      description: `After deleting, ${isActive} won't be able to find this music in your app`,
    });
    if (con) {
      const res = await deletePost(id).unwrap();
      if (res.success && global?.isPreview) {
        updateGlobal("isPreview", false);
      }
    }
  };

  return (
    <div>
      <ShadowBox>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div>
            <h1 className="text-2xl font-semibold">Podcasts</h1>
            <h1 className="text-base">
              Total Podcasts: {podcasts?.meta?.total || 0}
            </h1>
          </div>
          <Button
            onClick={() => updateGlobal("isStore", true)}
            variant="primary"
            size="lg"
          >
            <Plus className="size-5" /> Upload
          </Button>
        </div>
      </ShadowBox>
      <WapperBox>
        <div className="flex items-center space-x-5 border-b-2 my-4">
          {["Owned", "Users"].map((item) => (
            <div
              key={item}
              onClick={() => setIsActive(item)}
              className="cursor-pointer font-medium text-lg"
            >
              <span className="px-6"> {item}</span>
              <div
                className={`${
                  isActive === item ? "bgOne" : "bg-transparent"
                } w-full h-1 rounded-t-md px-5`}
              ></div>
            </div>
          ))}
        </div>
        {isActive == "Owned" ? (
          <div className="pt-4">
            {podcastIsLoading ? (
              <MusicSkeleton />
            ) : podcasts?.data?.length > 0 ? (
              <div className="flex gap-6 lg:gap-4  2xl:gap-6 flex-wrap">
                {podcasts?.data?.map((item: any, index: any) => (
                  <div key={index}>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        updateGlobal("isDetails", item);
                        updateGlobal("isPreview", true);
                      }}
                      className="h-[190px] w-[200px] bg-card-figma rounded-md p-5 flex flex-col justify-between"
                    >
                      <div className="flex justify-between relative items-center menu-container">
                        <FavIcon name="musicBers" />
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            updateGlobal("isShow", index);
                          }}
                          className="border cursor-pointer size-10 grid place-items-center rounded-full"
                        >
                          <EllipsisVertical />
                        </div>
                        {global.isShow === index && (
                          <div className="absolute py-2 w-[100px] space-y-2 blur-bg rounded-md overflow-hidden border top-5 right-3">
                            <h1
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsEditItem(item);
                                updateGlobal("isUpdate", true);
                              }}
                              className="flex items-center px-2 cursor-pointer"
                            >
                              <FavIcon name="edit" className="mr-2" /> Edit
                            </h1>
                            <h2 className="border-b my-1"></h2>
                            <h1
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(item._id);
                              }}
                              className="flex items-center px-2 cursor-pointer"
                            >
                              <FavIcon name="delete" className="mr-2" /> Delete
                            </h1>
                          </div>
                        )}
                      </div>

                      <h1 className="text-center text-secondery-figma text-xl font-medium">
                        {item?.podcast?.length} Music&apos;s
                      </h1>
                      {/* Progress bar */}
                      <div className="h-5 cursor-pointer flex flex-col items-center justify-center">
                        <div className="bg-secondery-figma relative w-full h-px">
                          <span className="bg-white h-px absolute inset-y-0 left-0"></span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="font-medium flex items-center">
                          <FavIcon name="like" className="mr-1 size-6" />
                          <span className="mt-px">{item?.likes}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <NoItemData title="No Owned Data Available" />
            )}
          </div>
        ) : (
          // ========= Users ==========
          <div className="pt-4">
            {podcastIsLoading ? (
              <MusicSkeleton />
            ) : podcasts?.data?.length > 0 ? (
              <div className="flex gap-6 lg:gap-4  2xl:gap-6 flex-wrap">
                {podcasts?.data?.map((item: any, index: any) => (
                  <div key={index}>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        updateGlobal("isDetails", item);
                        updateGlobal("isPreview", true);
                      }}
                      className="h-[190px] w-[200px] bg-card-figma rounded-md p-5 flex flex-col justify-between"
                    >
                      <div className="flex justify-center relative items-center menu-container">
                        <FavIcon name="musicBers" />
                      </div>

                      <h1 className="text-center text-secondery-figma text-xl font-medium">
                        {item?.podcast?.length} Music&apos;s
                      </h1>
                      {/* Progress bar */}
                      <div className="h-5 cursor-pointer flex flex-col items-center justify-center">
                        <div className="bg-secondery-figma relative w-full h-px">
                          <span className="bg-white h-px absolute inset-y-0 left-0"></span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="font-medium flex items-center">
                          <FavIcon name="like" className="mr-1 size-6" />
                          <span className="mt-px">{item?.likes}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <NoItemData title="No User Data Available" />
            )}
          </div>
        )}

        {/* Pagination */}
        <ul className="flex flex-wrap justify-end mt-10 lg:mt-20">
          <li className="font-medium">
            <Pagination
              onPageChange={(v: any) => updateGlobal("isPage", v)}
              {...podcasts?.meta}
            />
          </li>
        </ul>
      </WapperBox>

      {/* =================Upload new podcast  ================ */}
      <Modal
        open={global.isStore}
        setIsOpen={(v) => updateGlobal("isStore", v)}
        title="Upload New podcast"
        titleStyle="text-center"
      >
        {/* <CloseIcon className="mt-2 mr-2" onClose={() => handleUploadReset()} /> */}
        <Form from={from} onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              {isAudio?.audioPreview ? (
                <div className="mw-full h-fit rounded-md">
                  {/* <MusicPlayer /> */}
                  <AudioUpload
                    onFileSelect={(file: File) => {
                      setIsAudio({
                        ...isAudio,
                        audioPreview: URL.createObjectURL(file),
                      });
                      from.setValue("audio", file as any, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <span className="flex items-center space-x-2 py-1 px-2 rounded-md mt-2 border p-1 w-fit h-fit">
                      {" "}
                      <FavIcon name="chnage" />
                      <span>Replace audio</span>
                    </span>
                  </AudioUpload>
                </div>
              ) : (
                <AudioUpload
                  onFileSelect={(file: File) => {
                    setIsAudio({
                      ...isAudio,
                      audioPreview: URL.createObjectURL(file),
                    });
                    from.setValue("audio", file as any, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <div>
                    <div className="relative block w-fit h-fit p-5 mx-auto border-2 border-dashed rounded-2xl cursor-pointer transition-colors duration-200">
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="relative mb-4">
                          <FavIcon name="upload" />
                        </div>
                        <span className="text-white text-lg font-medium">
                          Upload New Music
                        </span>
                      </div>
                    </div>
                    {from?.formState?.errors?.audio && (
                      <p className="text-red-400 justify-center mt-1 flex items-center gap-1 text-sm">
                        {from?.formState?.errors?.audio?.message as string}
                        <CircleAlert size={14} />
                      </p>
                    )}
                  </div>
                </AudioUpload>
              )}
            </div>

            <InputSelectField
              items={vibeOptions}
              label="Vibe"
              name="vibe"
              placeholder="Select hare"
              iconStyle="mt-1"
            />

            <FromInput name="location" label="Location" />
            <InputWordSelectField
              name="guests"
              label="Guest Name"
              placeholder="Add guest names (press Enter)"
              matching={false}
              className="w-full"
            />
            <FromTextArea
              label="Caption"
              name="caption"
              placeholder="Enter your Caption"
            />
            <InputSelectField
              items={[
                {
                  label: "Public",
                  value: "public",
                  icon: <FavIcon className="size-[18px]" name="internet" />,
                },
                {
                  label: "Solo",
                  value: "solo",
                  icon: <FavIcon className="size-[18px]" name="lock" />,
                },
              ]}
              label="Visibility"
              name="visibility"
              placeholder="Select hare"
              iconStyle="mr-2"
            />
            <div className="grid grid-cols-2 gap-3">
              <Button
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
                Upload
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
      {/* =================Edit podcast ================ */}
      <Modal
        open={global.isUpdate}
        setIsOpen={(v) => updateGlobal("isUpdate", v)}
        title="Edit podcast"
        titleStyle="text-center"
      >
        <Form from={fromUpdate} onSubmit={handleSubmitMusic}>
          <div className="space-y-5">
            <div className="mw-full h-fit rounded-md">
              {/* <MusicPlayer /> */}
              <AudioUpload
                onFileSelect={(file: File) => {
                  setIsAudio({
                    ...isAudio,
                    audioPreview: URL.createObjectURL(file),
                  });
                  fromUpdate.setValue("audio", file as any, {
                    shouldValidate: true,
                  });
                }}
              >
                <span className="flex items-center space-x-2 py-1 px-2 rounded-md mt-2 border p-1 w-fit h-fit">
                  {" "}
                  <FavIcon name="chnage" />
                  <span>Replace audio</span>
                </span>
              </AudioUpload>
            </div>

            <InputSelectField
              items={vibeOptions}
              label="Vibe"
              name="vibe"
              placeholder="Select hare"
              iconStyle="mt-1"
            />
            <FromInput name="location" label="Location" />
            <InputWordSelectField
              name="guests"
              label="Guest Name"
              placeholder="Add guest names (press Enter)"
              matching={false}
              className="w-full"
            />
            <FromTextArea
              label="Caption"
              name="caption"
              placeholder="Enter your Caption"
            />
            <InputSelectField
              items={[
                {
                  label: "Public",
                  value: "public",
                  icon: <FavIcon className="size-[18px]" name="internet" />,
                },
                {
                  label: "Solo",
                  value: "solo",
                  icon: <FavIcon className="size-[18px]" name="lock" />,
                },
              ]}
              label="Visibility"
              name="visibility"
              placeholder="Select hare"
              iconStyle="mr-2"
            />
            <div className="grid grid-cols-2 gap-3">
              <Button
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
                Upload
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
      {/* =============audio modal========== */}
      <ModalOne
        open={global.isPreview}
        setIsOpen={(v) => updateGlobal("isPreview", v)}
        className="sm:max-w-xs"
        headerStyle="pt-4 px-4 pb-0"
        profile={
          <>
            <Avatars
              src={helpers.imgSource(global?.isDetails?.user?.avatar)}
              fallback={global?.isDetails?.user?.name}
              alt="profile"
              fallbackStyle="bg-[#cb4ec9]/70 text-white"
            />
            <div className="leading-5">
              <h1 className="flex font-medium items-center">
                {global?.isDetails?.user?.name}
                <span className="ml-2">
                  {" "}
                  {userVisibiliy[global?.isDetails?.privacy] || "public"}
                </span>
              </h1>
              <div className="text-secondery-figma flex  items-center">
                <picture>
                  <img
                    className="size-6 mt-[2px]"
                    src={helpers.imgSource(global?.isDetails?.mood?.icon)}
                    alt="img"
                  />
                </picture>
                <span className="ml-[2px]">
                  {helpers.capitalize(global?.isDetails?.mood?.name)}
                </span>
              </div>
            </div>
          </>
        }
      >
        <div className="space-y-4">
          {global?.isDetails?.podcast?.map((item: any, idx: any) => (
            <div key={idx} className="space-y-2">
              <MusicPlayer idx={idx} audioSource={item?.url} />
            </div>
          ))}
          <p className="text-[#FFF]">{global?.isDetails?.captions || "N/A"}</p>
          <div>
            <h1 className="text-lg">Host: Host name goes here</h1>
            <ul>
              <li>Guests:</li>
              <li>
                <ul>
                  <li>1.Guest 1</li>
                  <li>2.Guest 2</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <LikeToggle likes={global?.isDetails?.likes} />
            <div
              onClick={() => handleDelete(global?.isDetails?._id)}
              className="border cursor-pointer size-10  grid place-items-center rounded-md"
            >
              <FavIcon name="delete" className="size-5" />
            </div>
          </div>
        </div>
      </ModalOne>
    </div>
  );
}
