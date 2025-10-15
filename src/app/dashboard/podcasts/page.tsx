"use client";
import ShadowBox from "@/components/common/shadow-box";
import WapperBox from "@/components/reuseble/wapper-box";
import { CircleAlert, EllipsisVertical, Plus, X } from "lucide-react";
import FavIcon from "@/icon/favIcon";
import { useEffect, useState } from "react";
import Avatars from "@/components/reuseble/avater";
import ModalOne from "@/components/reuseble/modal-one";
import { PlaceholderImg } from "@/lib";
import LikeToggle from "@/components/reuseble/like-toggle";
import useConfirmation from "@/components/context/delete-modal";
import MusicPlayer from "@/components/common/music-player";
import { Button } from "@/components/ui";
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


export default function Podcasts() {
  const { confirm } = useConfirmation();
  const [isPreview, setIsPreview] = useState(false);
  const [isActive, setIsActive] = useState("Owned");
  const [isShow, setIsShow] = useState<number | null>(null);
  const [isStore, setIsStore] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isAudio, setIsAudio] = useState<any>({ audioPreview: "" });
  const [isPlay, setIsPlay] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".menu-container")) {
        setIsShow(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  useEffect(() => {
    if (!isStore) {
      from.reset();
      setIsAudio({ audioPreview: "" });
    }
  }, [isStore, from]);

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
      description:
        "After deleting, users wont be able to find this music in your app",
    });
    if (con) {
      console.log(id);
    }
  };
  const handleDeletePodcast = async (id: string) => {
    const con = await confirm({
      title: "You are going to delete this podcast",
      subTitle: "Delete podcast",
      description:
        "After deleting, users wont be able to find this podcast in your app",
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
            <h1 className="text-2xl font-semibold">Podcasts</h1>
            <h1 className="text-base">Total podcasts: 50</h1>
          </div>
          <Button
            onClick={() => setIsStore(!isStore)}
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
          <div className="pt-4 flex gap-6 lg:gap-4  2xl:gap-6 flex-wrap">
            {Array.from({ length: 10 }).map((item, index) => {
              return (
                <div
                  className="h-[190px] w-[200px] bg-card-figma rounded-md p-5 flex flex-col justify-between"
                  key={index}
                >
                  <div className="flex justify-between relative items-center menu-container">
                    <FavIcon name="musicBers" />
                    <div
                      onClick={() => setIsShow(index)}
                      className="border cursor-pointer size-10 grid place-items-center rounded-full"
                    >
                      <EllipsisVertical />
                    </div>
                    {isShow === index && (
                      <div className="absolute py-2 w-[100px] space-y-2 blur-bg rounded-md overflow-hidden border top-3 right-2">
                        <h1
                          onClick={() => setIsUpdate(!isUpdate)}
                          className="flex items-center px-2 cursor-pointer"
                        >
                          <FavIcon name="edit" className="mr-2" />
                          Edit
                        </h1>
                        <h2 className="border-b my-1"></h2>
                        <h1
                          onClick={() => handleDeletePodcast("1234")}
                          className="flex items-center px-2 cursor-pointer"
                        >
                          <FavIcon name="delete" className="mr-2" />
                          Delete
                        </h1>
                      </div>
                    )}
                  </div>
                  <h1 className="text-start text-secondery-figma text-lg font-medium">
                    0:50
                  </h1>
                  <h1 className="bg-secondery-figma relative w-full h-px">
                    <span
                      style={{
                        width: "20%",
                      }}
                      className="bg-white h-px absolute inset"
                    ></span>
                  </h1>
                  <div className="flex items-center justify-between">
                    <span className="font-medium flex items-center">
                      {" "}
                      <FavIcon name="like" className="mr-1" /> 120
                    </span>
                    <span>
                      <FavIcon name="play" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // ==========Users ===========
          <div className="pt-4 flex gap-6 lg:gap-4  2xl:gap-6 flex-wrap">
            {Array.from({ length: 10 }).map((item, index) => {
              return (
                <div
                  className="cursor-pointer h-[190px] w-[200px] bg-card-figma rounded-md p-5 flex flex-col justify-between"
                  key={index}
                  onClick={() => setIsPreview(!isPreview)}
                >
                  <h1 className="flex justify-center">
                    <FavIcon name="musicBers" />
                  </h1>
                  <h1 className="text-center text-secondery-figma text-lg font-medium">
                    0:50
                  </h1>
                  <h1 className="bg-[#F7F7F7] w-full h-px"></h1>
                  <div className="flex items-center justify-between">
                    <span className="font-medium flex items-center">
                      {" "}
                      <FavIcon name="like" className="mr-1" /> 120
                    </span>
                    <span>
                      <FavIcon name="play" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </WapperBox>

      {/* =================Upload new podcast  ================ */}
      <Modal
        open={isStore}
        setIsOpen={setIsStore}
        title="Upload New podcast"
        titleStyle="text-center"
      >
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
                      from.setValue("audio", file as any, { shouldValidate: true });
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
                    from.setValue("audio", file as any, { shouldValidate: true });
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
                Upload
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
      {/* =================Edit podcast ================ */}
      <Modal
        open={isUpdate}
        setIsOpen={setIsUpdate}
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
                  fromUpdate.setValue("audio", file as any, { shouldValidate: true });
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
                <Plus className="size-5" />
                Upload
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
      {/* =============audio modal========== */}
      <ModalOne
        open={isPreview}
        setIsOpen={setIsPreview}
        className="sm:max-w-xs"
        headerStyle="pt-4 px-4 pb-0"
        profile={
          <>
            <Avatars
              src={PlaceholderImg()}
              fallback={"E"}
              alt="profile"
              fallbackStyle="bg-[#cb4ec9]/70 text-white"
            />
            <div className="leading-5">
              <h1 className="flex font-medium items-center">
                Elizabeth Olson{" "}
                <FavIcon className="ml-2 size-4" name="internet" />
              </h1>
              <h1 className="text-secondery-figma">😥Mental</h1>
            </div>
          </>
        }
      >
        <div className="space-y-4">
          {/* <MusicPlayer /> */}
          <p className="text-[#FFF]">
            Lorem ipsum dolor sit amet consectetur. Semper vel phasellus commodo
            neque. Duis turpis nascetur tincidunt egestas laoreet elementum
            bibendum.
          </p>
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
            <LikeToggle likes={10} />
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
