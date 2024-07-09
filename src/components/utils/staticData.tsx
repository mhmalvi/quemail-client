export const sectionTwoData = [
  {
    title: "Create community with newsletters",
    description:
      "Connect with subscribers and share your knowledge with timely email broadcasts.",
  },
  {
    title: "Win more sales with abandoned cart emails",
    description:
      "Recover sales with abandoned cart emails to remind customers about unfinished purchases.",
  },
  {
    title: "Engage your audience with autoresponders",
    description:
      "Increase engagement with autoresponder emails triggered at a particular time.",
  },
  {
    title: "Foster trust with transactional emails",
    description:
      "Keep your customers informed with prompt emails confirming each step of their purchase.",
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
  {
    title: "24/7",
    description: "support from a 5-star rated Customer Success",
  },
];

export const sectionFiveData = [
  "Dedicated IP Address",
  "SMS marketing automation",
  "Dedicated 24/7 support",
  "Single sign-on (SSO)",
  "AI recommendations",
  "Transactional emails",
];

export const campaignData = [
  {
    "name": "John Doe",
    "phone_number": "123-456-7890",
    "opened": true,
    "clicked": false,
    "subscribed": true,
    "date_added": "2023-07-01"
  },
  {
    "name": "Jane Smith",
    "phone_number": "987-654-3210",
    "opened": false,
    "clicked": true,
    "subscribed": false,
    "date_added": "2023-06-15"
  },
  {
    "name": "Alice Johnson",
    "phone_number": "555-123-4567",
    "opened": true,
    "clicked": true,
    "subscribed": true,
    "date_added": "2023-06-20"
  },
  {
    "name": "Bob Brown",
    "phone_number": "555-987-6543",
    "opened": false,
    "clicked": false,
    "subscribed": false,
    "date_added": "2023-07-02"
  }
]

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
