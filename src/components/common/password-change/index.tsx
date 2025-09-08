import Form from "@/components/reuseble/from";
import { FromInput } from "@/components/reuseble/from-input";
import { ImgBox } from "@/components/reuseble/img-box";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import passImg from "@/assets/pass.png";
import { Button } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordChangeSchema } from "@/components/schema";
import { toast } from "sonner";

export default function PasswordChange() {
  //  password
  const passwordfrom = useForm({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      c_password: "",
    },
  });
  const handlePasswordSubmit = async (values: FieldValues) => {
    toast.success("Password Changed Successfully", {
      description: "Your password has been updated successfully",
      position: "bottom-right",
    });
    console.log(values);
  };
  return (
    <Form
      from={passwordfrom}
      className="space-y-7"
      onSubmit={handlePasswordSubmit}
    >
      <ImgBox
        src={passImg}
        className="w-[300px] h-[140px] mx-auto"
        alt="img1"
      />

      <FromInput
        eye={true}
        name="current_password"
        label="Current password"
        placeholder="Enter your current password"
        stylelabel="bg-background"
      />
      <FromInput
        eye={true}
        name="new_password"
        label="New password"
        placeholder="Enter your new password"
        stylelabel="bg-background"
      />
      <FromInput
        eye={true}
        name="c_password"
        label="Confirm new password"
        placeholder="Re-enter your new password"
        stylelabel="bg-background"
      />
      <div className="flex justify-center">
        <Button variant={"primary"}>
          <FavIcon name="save" />
          Save Change
        </Button>
      </div>
    </Form>
  );
}
