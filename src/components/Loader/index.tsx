import { FC } from "react";
import cn from "classnames";
import { Sizes } from "@/@types/sizes";
import { LOADER_SIZES } from "./constants";

interface Props {
  size?: Sizes;
  className?: string;
}

export const Loader: FC<Props> = ({ size = Sizes.XS, className }) => (
  <div
    className={cn(
      "mx-auto animate-spin rounded-full border-2 border-orange-base border-t-black-medium",
      LOADER_SIZES[size],
      className,
    )}
  />
);
