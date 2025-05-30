import { LoaderCircle } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <LoaderCircle className="animate-spin" />
    </div>
  );
};

export default Loader;
