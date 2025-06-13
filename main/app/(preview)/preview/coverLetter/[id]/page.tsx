"use client";
import { CoverLettertemplateMap } from "@/components/cover-letter/cover-letter-template-map";
import { CoverLetterNotFound } from "@/components/coverletter-error";
import Loader from "@/components/Loader";
import { useCoverLetterById } from "@/query/resume/query";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  const id = params.id as string;
  console.log("a",id)
  const { data, isPending, isError, error } = useCoverLetterById(id);
  if (isPending) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (!data || isError) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <CoverLetterNotFound variant="empty" />
      </div>
    );
  }
  const Template = CoverLettertemplateMap[data.template] || "minimal";

  return (
    <div className="w-full h-full md:flex items-center justify-center ">
      <div className=" bg-white w-[800px]  p-5 md:p-8  " id="resume">
        <Template
          fullName={data.fullName}
          email={data.email}
          phone={data.phone}
          title={data.jobTitle}
          template={data.template}
          experience={data.experience}
          preferences={data.preferences}
          content={data.content}
          companyName={data.companyName}
          hiringManager={data.hiringManager}
          jobTitle={data.jobTitle}
        />{" "}
      </div>
    </div>
  );
};

export default page;
