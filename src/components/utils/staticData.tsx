export const sectionTwoData = [
  {
    title: "Automated Campaigns",
    description:
      "Simplify your marketing efforts with Quemailer’s intuitive automation tools. Effortlessly create, schedule, and manage your email campaigns, allowing you to focus on what truly matters—engaging your audience.With automation, you can send personalized emails based on user behavior, ensuring timely and relevant communication.",
  },
  {
    title: "High Deliverability",
    description:
      "Simplify your marketing efforts with Quemailer’s intuitive automation tools. Effortlessly create, schedule, and manage your email campaigns, allowing you to focus on what truly matters—engaging your audience. With automation, you can send personalized emails based on user behavior, ensuring timely and relevant communication.",
  },
  {
    title: "Seamless Integrations",
    description:
      "Simplify your marketing efforts with Quemailer’s intuitive automation tools. Effortlessly create, schedule, and manage your email campaigns, allowing you to focus on what truly matters—engaging your audience.With automation, you can send personalized emails based on user behavior, ensuring timely and relevant communication.",
  },
  {
    title: "24/7 Support",
    description:
      "Receive unparalleled assistance from Quemailer’s dedicated support team, available 24/7.Whether you need help setting up a campaign, troubleshooting an issue, or optimizing yourstrategy, our experts are always ready to provide the support you need. Access comprehensive resources, including guides, tutorials, and personalized assistance to ensure your success.",
  },
];

export const sectionThreePackage = [
  {
    title: "100%",
    description: "average list growth for all paid plans in the first 30 days",
  },
  {
    title: "99%",
    description: "deliverability rate for 10+ countries",
  },
  {
    title: "50+",
    description: "customers worldwide trust us with their email marketing",
  },
];
export const sectionThreeData = [
  {
    title: "Tailored Solutions:",
    description:
      "Customize your email marketing strategy with solutions that fit your specific needs. Whether you're looking to increase engagement, drive sales, or nurture leads, Quemailer provides the tools and flexibility to achieve your goals.",
  },
  {
    title: "AI-Powered Recommendations:",
    description:
      "Leverage artificial intelligence to optimize your campaigns and improve engagement. Our AI-driven insights help you understand your audience better, craft compelling messages, and maximize your marketing ROI.",
  },
  {
    title: "Dedicated IP Addresses:",
    description:
      "Enhance your email deliverability and reputation with dedicated IP addresses.By using a dedicated IP, you can ensure consistentdeliverability and build a strong sender reputation, crucial for large - scale email campaigns.",
  },
];

export const sectionFiveData = [
  "Blog and Articles: Stay updated with the latest trends, tips, and best practices in email marketing.",
  "Case Studies: Learn from the success stories of businesses that have leveraged Quemailer to achieve their marketing goals.",
  "Case Studies: Learn from the success stories of businesses that have leveraged Quemailer to achieve their marketing goals.",
];

export const campaignData = [
  {
    name: "John Doe",
    phone_number: "123-456-7890",
    opened: true,
    clicked: false,
    subscribed: true,
    date_added: "2023-07-01",
  },
  {
    name: "Jane Smith",
    phone_number: "987-654-3210",
    opened: false,
    clicked: true,
    subscribed: false,
    date_added: "2023-06-15",
  },
  {
    name: "Alice Johnson",
    phone_number: "555-123-4567",
    opened: true,
    clicked: true,
    subscribed: true,
    date_added: "2023-06-20",
  },
  {
    name: "Bob Brown",
    phone_number: "555-987-6543",
    opened: false,
    clicked: false,
    subscribed: false,
    date_added: "2023-07-02",
  },
];

export const fields = [
  {
    label: "Name",
    key: "name",
    alternateMatches: ["first name", "first"],
    fieldType: {
      type: "input",
    },
    example: "Stephanie",
    validations: [
      {
        rule: "required",
        errorMessage: "Name is required",
        level: "error",
      },
    ],
  },
  {
    label: "Email",
    key: "email",
    alternateMatches: ["email address"],
    fieldType: {
      type: "input",
    },
    example: "example@example.com",
    validations: [
      {
        rule: "required",
        errorMessage: "Email is required",
        level: "error",
      },
      {
        rule: "regex",
        // This regex might not cover all valid email addresses, but it's a basic example.
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: "Invalid email format",
        level: "error",
      },
    ],
  },
  {
    label: "Group",
    key: "group",
    alternateMatches: ["group", "tag", "companies", "company"],
    fieldType: {
      type: "input",
    },
    example: "Group1",
    validations: [],
  },
] as const;

export const pricingplan1 = [
  {
    ticked: true,
    content: "Custom Email Template",
  },
  {
    ticked: true,
    content: "100 emails / campaign",
  },
  {
    ticked: true,
    content: "Add up to 100 contacts",
  },
  {
    ticked: true,
    content: "Analytics and Reporting",
  },
  {
    ticked: true,
    content: "Run scheduled campaign",
  },
  {
    ticked: true,
    content: "Add multiple subadmin",
  },
];
export const pricingplan2 = [
  {
    ticked: true,
    content: "Custom Email Template",
  },
  {
    ticked: true,
    content: "500 emails / campaign",
  },
  {
    ticked: true,
    content: "Add up to 500 contacts",
  },
  {
    ticked: true,
    content: "Analytics and Reporting",
  },
  {
    ticked: true,
    content: "Run scheduled campaign",
  },
  {
    ticked: true,
    content: "Add multiple subadmin",
  },
];
export const pricingplan3 = [
  {
    ticked: true,
    content: "Custom Email Template",
  },
  {
    ticked: true,
    content: "1000 emails / campaign",
  },
  {
    ticked: true,
    content: "Add up to 1000 contacts",
  },
  {
    ticked: true,
    content: "Analytics and Reporting",
  },
  {
    ticked: true,
    content: "Run scheduled campaign",
  },
  {
    ticked: true,
    content: "Add multiple subadmin",
  },
];
export const pricingplan4 = [
  {
    ticked: true,
    content: "Custom Email Template",
  },
  {
    ticked: true,
    content: "1400 emails / campaign",
  },
  {
    ticked: true,
    content: "Add up to 1400 contacts",
  },
  {
    ticked: true,
    content: "Analytics and Reporting",
  },
  {
    ticked: true,
    content: "Run scheduled campaign",
  },
  {
    ticked: true,
    content: "Add multiple subadmin",
  },
];
