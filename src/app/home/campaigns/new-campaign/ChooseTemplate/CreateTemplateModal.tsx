import React from "react";
import dynamic from "next/dynamic";
import { Modal } from "flowbite-react";
interface SelectTemplateProps {
  chooseTemplate: string;
  setChooseTemplate: React.Dispatch<React.SetStateAction<string>>;
}
const CreateTemplateModal: React.FC<SelectTemplateProps> = ({
  chooseTemplate,
  setChooseTemplate,
}) => {
  const Editor = dynamic(() => import("../../MainEditor"), {
    ssr: false,
  });
  return (
    <Modal
      dismissible
      show={chooseTemplate === "create"}
      onClose={() => setChooseTemplate("")}
      size={"7xl"}
      className="h-screen"
    >
      <Modal.Header className="dark:bg-dark-glass bg-violet-50 text-slate-300 ">
        Create a template
      </Modal.Header>
      <Modal.Body className="dark:bg-dark-black bg-violet-50 text-slate-300 h-[calc(100vh-100px)] overflow-y-auto">
        <Editor />
      </Modal.Body>
    </Modal>
  );
};

export default CreateTemplateModal;
