import React, { useEffect } from "react";
import { Dropdown } from "flowbite-react";
import { fetchGroup } from "@/app/api/contact";

const Groups = () => {
  useEffect(() => {
    (async () => {
      const res = await fetchGroup();
      console.log(res);
    })();
  });
  return (
    <div>
      <Dropdown
        label="Groups"
        placement="right-start"
        renderTrigger={() => (
          <div className="px-4 py-2 rounded-md border border-brand-color cursor-pointer overflow-hidden">
            <h1>Groups</h1>
          </div>
        )}
        className="dark:bg-dark-glass bg-light-glass backdrop-blur-2xl border-none z-40"
      ></Dropdown>
    </div>
  );
};

export default Groups;
