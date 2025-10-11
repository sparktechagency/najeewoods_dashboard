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
import { FieldValues, useForm } from "react-hook-form";
import Form from "@/components/reuseble/from";
import { FromInput } from "@/components/reuseble/from-input";
import { FromTextArea } from "@/components/reuseble/from-textarea";
import { InputSelectField } from "@/components/reuseble/from-select";
import AudioUpload from "@/components/reuseble/audio-box";
import { zodResolver } from "@hookform/resolvers/zod";
import { musicSchema } from "@/components/schema";
import { vibeIcon, vibeOptions } from "@/components/dummy-json";
import Modal2 from "@/components/reuseble/modal2";
import { CloseIcon } from "@/components/reuseble/btn-modal";
import {
  useDeletePostMutation,
  useGetPostQuery,
  useStorePostMutation,
} from "@/redux/api/commonApi";
import { toast } from "sonner";
import RepeatCount from "@/components/reuseble/repeat-count/count";
import { NoItemData } from "@/components/reuseble/table-no-item";
import { Pagination } from "@/components/reuseble/pagination";
import AudioBers from "@/components/reuseble/audio-bers";
import { useGlobalState } from "@/components/hooks";
import MusicProgress from "@/components/reuseble/music-progress";

const intGlobal: any = {
  isPage: 1,
  isPreview: false,
  isStore: false,
  isUpdate: false,
  audioPreview: "",
  isShow: null,
  isDetails: {},
};

export default function Music() {
  const { confirm } = useConfirmation();
  const [global, updateGlobal] = useGlobalState(intGlobal);
  const [isActive, setIsActive] = useState("Owned");
  const [storePost, { isLoading }] = useStorePostMutation();
  const [deletePost] = useDeletePostMutation();
  const query = {
    post_type: "audio",
    page: global.isPage,
    get: isActive === "Owned" ? "me" : "all",
  };
  const { data: music, isLoading: postIsLoading } = useGetPostQuery(query);

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
  }, []);

  const from = useForm({
    resolver: zodResolver(musicSchema),
    defaultValues: {
      audio: null,
      location: "",
      caption: "",
      vibe: "",
      visibility: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    const value = {
      post_type: "audio",
      mood: values.vibe,
      privacy: values?.visibility,
      location: values?.location,
      audio: values?.audio,
      captions: values?.caption,
    };
    const fromData = helpers.fromData(value);
    const res = await storePost(fromData).unwrap();
    if (res.success) {
      handleUploadReset();
      toast.success("Audio uploaded successfully", {
        description: "Your audio has been uploaded successfully.",
      });
    }
  };
  // update music
  const fromUpdate = useForm({
    resolver: zodResolver(musicSchema),
    defaultValues: {
      audio: null,
      location: "",
      caption: "",
      vibe: "",
      visibility: "",
    },
  });
  const handleSubmitMusic = async (values: FieldValues) => {};

  // === hanldedelete ===
  const handleDelete = async (id: string) => {
    const con = await confirm({
      title: "You are going to delete this music",
      subTitle: "Delete Music",
      description:
        "After deleting, users wont be able to find this music in your app",
    });
    if (con) {
      await deletePost(id).unwrap();
    }
  };
  // === handleDeletePodcast ===
  const handleDeletePodcast = async (id: string) => {
    const con = await confirm({
      title: "You are going to delete this podcast",
      subTitle: "Delete podcast",
      description:
        "After deleting, users wont be able to find this podcast in your app",
    });
    if (con) {
      await deletePost(id).unwrap();
    }
  };
  // reset from store
  const handleUploadReset = () => {
    updateGlobal("audioPreview", "");
    from.reset();
    updateGlobal("isStore", false);
  };

  const handleUpdateReset = () => {
    updateGlobal("audioPreview", "");
    fromUpdate.reset();
    updateGlobal("isUpdate", false);
  };

  const vibe=vibeIcon(global?.isDetails?.user?.salt)
  console.log(vibe)

  return (
    <div>
      <ShadowBox>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div>
            <h1 className="text-2xl font-semibold">Music&apos;s</h1>
            <h1 className="text-base">
              Total music: {music?.meta?.total || 0}
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
          // ========="Owned=========
          <div className="pt-4">
            {postIsLoading ? (
              <div className="flex gap-6 lg:gap-4  2xl:gap-6 flex-wrap">
                <RepeatCount count={20}>
                  <Skeleton className="w-[200px]  h-[180px]" />
                </RepeatCount>
              </div>
            ) : music?.data?.length > 0 ? (
              <div className="flex gap-6 lg:gap-4  2xl:gap-6 flex-wrap">
                {music?.data?.map((item: any, index: any) => (
                  <AudioBers
                    key={index}
                    uniqueId={item._id}
                    audioSource={item?.audio[0]}
                  >
                    {({
                      isPlaying,
                      duration,
                      progress,
                      togglePlay,
                      handleProgressBarClick,
                    }) => (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          updateGlobal("isDetails", item);
                          updateGlobal("isPreview", true);
                          // modal open song off
                          if (isPlaying) {
                            togglePlay(new MouseEvent("click"));
                          }
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
                                  handleDeletePodcast(item._id);
                                }}
                                className="flex items-center px-2 cursor-pointer"
                              >
                                <FavIcon name="delete" className="mr-2" />{" "}
                                Delete
                              </h1>
                            </div>
                          )}
                        </div>

                        <h1 className="text-start text-secondery-figma text-lg font-medium">
                          {duration}
                        </h1>
                        {/* Progress bar */}
                        <MusicProgress
                          onClick={(e: any) => {
                            e.stopPropagation();
                            handleProgressBarClick(e);
                          }}
                          progress={progress}
                        />
                        <div className="flex items-center justify-between">
                          <span className="font-medium flex items-center">
                            <FavIcon name="like" className="mr-1" />{" "}
                            {item?.likes}
                          </span>
                          <span onClick={togglePlay} className="cursor-pointer">
                            {isPlaying ? (
                              <FavIcon name="pluse" className="size-9" />
                            ) : (
                              <FavIcon name="play" className="size-9" />
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </AudioBers>
                ))}
              </div>
            ) : (
              <NoItemData title="No Owned Data Available" />
            )}
          </div>
        ) : (
          // ==========Users ===========
          <div className="pt-4">
            {postIsLoading ? (
              <div className="flex gap-6 lg:gap-4  2xl:gap-6 flex-wrap">
                <RepeatCount count={20}>
                  <Skeleton className="w-[200px]  h-[180px]" />
                </RepeatCount>
              </div>
            ) : music?.data?.length > 0 ? (
              <div className="flex gap-6 lg:gap-4  2xl:gap-6 flex-wrap">
                {music?.data?.map((item: any, index: any) => (
                  <AudioBers
                    key={index}
                    uniqueId={item._id}
                    audioSource={item?.audio[0]}
                  >
                    {({
                      isPlaying,
                      duration,
                      progress,
                      togglePlay,
                      handleProgressBarClick,
                    }) => (
                      <div
                        className="cursor-pointer h-[190px] w-[200px] bg-card-figma rounded-md p-5 flex flex-col justify-between"
                        key={index}
                        onClick={() => updateGlobal("isPreview", true)}
                      >
                        <h1 className="flex justify-center">
                          <FavIcon name="musicBers" />
                        </h1>
                        <h1 className="text-center text-secondery-figma text-lg font-medium">
                          {duration}
                        </h1>
                        <MusicProgress
                          onClick={handleProgressBarClick}
                          progress={progress}
                        />
                        <div className="flex items-center justify-between">
                          <span className="font-medium flex items-center">
                            {" "}
                            <FavIcon name="like" className="mr-1" />{" "}
                            {item?.likes}
                          </span>
                          <span onClick={togglePlay} className="cursor-pointer">
                            {isPlaying ? (
                              <FavIcon name="pluse" className="size-9" />
                            ) : (
                              <FavIcon name="play" className="size-9" />
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </AudioBers>
                ))}
              </div>
            ) : (
              <NoItemData title="No Owned Data Available" />
            )}
          </div>
        )}
        {/* pagination */}
        <ul className="flex flex-wrap justify-end mt-10 lg:mt-20">
          <li className="font-medium">
            <Pagination
              onPageChange={(v: any) => updateGlobal("isPage", v)}
              {...music?.meta}
            ></Pagination>
          </li>
        </ul>
      </WapperBox>
      {/* =================upload music  ================ */}
      <Modal2
        open={global.isStore}
        setIsOpen={(v) => updateGlobal("isStore", v)}
        title="Upload New Music"
        titleStyle="text-center"
      >
        <CloseIcon className="mt-2 mr-2" onClose={() => handleUploadReset()} />
        <Form from={from} onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              {global.audioPreview ? (
                <div className="mw-full h-fit rounded-md">
                  <MusicPlayer
                    key={global.audioPreview}
                    audioSource={global.audioPreview}
                  />
                  <AudioUpload
                    onFileSelect={(file: File) => {
                      updateGlobal("audioPreview", URL.createObjectURL(file));
                      from.setValue("audio", file, { shouldValidate: true });
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
                    updateGlobal("audioPreview", URL.createObjectURL(file));
                    from.setValue("audio", file, { shouldValidate: true });
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
                onClick={() => handleUploadReset()}
                size="lg"
                type="button"
                className="bg-modal-figma hover:bg-modal-figma cursor-pointer  rounded-xl w-full"
              >
                <X className="size-5" />
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                variant="primary"
                size="lg"
                className="w-full"
              >
                {" "}
                <Plus className="size-5" />
                Upload
              </Button>
            </div>
          </div>
        </Form>
      </Modal2>
      {/* =================update music  ================ */}
      <Modal2
        open={global.isUpdate}
        setIsOpen={(v) => updateGlobal("isUpdate", v)}
        title="Edit music"
        titleStyle="text-center"
      >
        <CloseIcon className="mt-2 mr-2" onClose={() => handleUpdateReset()} />
        <Form from={fromUpdate} onSubmit={handleSubmitMusic}>
          <div className="space-y-5">
            <div className="mw-full h-fit rounded-md">
              <MusicPlayer audioSource="/original-song-239607.mp3" />
              <AudioUpload
                onFileSelect={(file: File) => {
                  updateGlobal("audioPreview", URL.createObjectURL(file));
                  fromUpdate.setValue("audio", file, { shouldValidate: true });
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
                onClick={() => handleUpdateReset()}
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
      </Modal2>
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
                <span className="ml-2"> {userVisibiliy[global?.isDetails?.privacy] || "public"}</span>
              </h1>
              <h1 className="text-secondery-figma">😥Mental</h1>
            </div>
          </>
        }
      >
        <div className="space-y-3">
          <MusicPlayer audioSource="/original-song-239607.mp3" />
          <p className="text-[#FFF]">
            Lorem ipsum dolor sit amet consectetur. Semper vel phasellus commodo
            neque. Duis turpis nascetur tincidunt egestas laoreet elementum
            bibendum.
          </p>
          <div className="mt-4 flex justify-between items-center">
            <LikeToggle />
            <div
              onClick={() => handleDelete("123")}
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
