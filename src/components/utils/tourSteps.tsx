export const tourSteps = [
  //step-1 does not exist, to show welcome in center
  {
    selector: ".step-1",
    content: (
      <div className="bg-violet-50 dark:bg-dark-black p-8 rounded-t-md">
        <h1 className="p-0 m-0 text-dark-black dark:text-slate-300">Welcome to QueMailer Tutorial</h1>
        <p className="p-0 m-0 text-dark-black dark:text-slate-300">This is the first step of the tour!</p>
      </div>
    ),
    style: {
      backgroundColor: "transparent",
      padding:0,
    },
  },
  {
    selector: ".step-2",
    content:
      "From here you can set your email. Currently google, yahoo and outlook is supported",
    style: {
      backgroundColor: "#BEB6FD",
      color: "#020507",
    },
  },
  {
    selector: ".step-3",
    content: "This is an overall performance report",
    style: {
      backgroundColor: "#BEB6FD",
      color: "#020507",
    },
  },
  {
    selector: ".step-4",
    content: "This is the quick actions section",
    style: {
      backgroundColor: "#BEB6FD",
      color: "#020507",
    },
  },
  {
    selector: ".step-5",
    content:
      "This is Contact Section. You can either manually add contact here.",
    style: {
      backgroundColor: "#BEB6FD",
      color: "#020507",
    },
  },
  {
    selector: ".step-6",
    content: "or Upload .xlsx, .xls or .csv file",
    style: {
      backgroundColor: "#BEB6FD",
      color: "#020507",
    },
  },
  {
    selector: ".step-7",
    content: "This is create template shortcut",
    style: {
      backgroundColor: "#BEB6FD",
      color: "#020507",
    },
  },
  {
    selector: ".step-8",
    content: "This is create campaigns shortcut",
    style: {
      backgroundColor: "#BEB6FD",
      color: "#020507",
    },
  },
  {
    selector: ".step-9",
    content: "Here you can see your account related informations",
    style: {
      backgroundColor: "#BEB6FD",
      color: "#020507",
    },
  },
  {
    selector: ".step-10",
    content: "And lastly, I am always here if you need me!",
    style: {
      backgroundColor: "#BEB6FD",
      color: "#020507",
    },
  },
];
