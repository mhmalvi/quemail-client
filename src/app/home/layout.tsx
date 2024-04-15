import Sidebar from "@/components/HomeLayoutUI/sidebar";
import Topnav from "@/components/HomeLayoutUI/topnav";
import { Flowbite } from "flowbite-react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flowbite>
      <section className="flex h-screen w-full">
        <Sidebar />
        <div className="p-8 flex flex-col gap-4 w-full">
          <Topnav />
          {children}
        </div>
      </section>
    </Flowbite>
  );
};
export default DashboardLayout;
