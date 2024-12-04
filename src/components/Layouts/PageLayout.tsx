import { useEffect, ReactNode, FC } from "react";
import { usePathname } from "next/navigation";
import cn from "classnames";
import { scrollTop } from "@/utils/scrollTop";
import { Footer } from "../Footer";
import Header from "../Header";

interface Props {
  children: ReactNode;
  className?: string;
  mainClassName?: string;
  isShownHeader?: boolean;
  isShownFooter?: boolean;
}

export const PageLayout: FC<Props> = ({
  children,
  className,
  mainClassName,
  isShownHeader = true,
  isShownFooter,
}) => {
  useEffect(() => {
    scrollTop();
  }, []);

  const pathname = usePathname();

  return (
    <div className={cn(className)}>
      <Header current={pathname} isShown={isShownHeader} />

      <main className={cn(mainClassName)}>{children}</main>

      <Footer isShown={isShownFooter} />
    </div>
  );
};
