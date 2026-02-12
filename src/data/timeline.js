import gijonImg from '../assets/images/gijon.png';
import bolognaImg from '../assets/images/bologna.png';
import budapestImg from '../assets/images/budapest.png';
import londonImg from '../assets/images/london.png';

export const timelineData = [
  {
    id: "intro",
    period: "Intro",
    title: "Manuel Pérez Martínez",
    location: "Gijón, Spain",
    type: "intro",
    content: {
      role: "Cloud Platform Engineer",
      email: "manugijon@gmail.com",
      mobile: "(+34) 660 163 565",
      summary: "Cloud Platform Architect with extensive experience in GCP, Kubernetes, and DevOps practices.",
      socials: [
        { name: "LinkedIn", url: "https://www.linkedin.com/in/mperezmartin/" },
        { name: "GitHub", url: "https://github.com/manupm87" }
      ]
    }
  },
  {
    id: "education",
    period: "2003 - 2012",
    title: "The Foundation",
    location: "Gijón & Bologna",
    type: "slide",
    description: "Building the academic base.",
    locations: [
      {
        city: "Gijón",
        image: gijonImg,
        cards: [
          {
            title: "International Baccalaureate",
            organization: "R.I.E.S. Jovellanos",
            period: "2003 - 2005",
            details: ["High School Education"],
            tags: ["IB"],
            type: "education"
          }
        ]
      },
      {
        city: "Bologna",
        image: bolognaImg,
        cards: [
          {
            title: "ERASMUS Telecommunication Engineering",
            organization: "Universitá di Bologna",
            period: "2010 - 2011",
            details: ["International experience in Italy"],
            tags: ["Erasmus", "Italy"],
            type: "education"
          }
        ]
      },
      {
        city: "Gijón",
        image: gijonImg,
        cards: [
          {
            title: "MSc Telecommunication Engineering",
            organization: "University of Oviedo",
            period: "2005 - 2012",
            details: [
              "Computer Science",
              "Physics, Electronics & Electromagnetism",
              "Telematics and Networking",
              "Master Thesis & Specialization"
            ],
            tags: ["Telecommunications", "Engineering", "MSc", "BSc"],
            type: "education"
          }
        ]
      }
    ]
  },
  {
    id: "gijon-early",
    period: "2012 - 2015",
    title: "Early Career",
    location: "Gijón, Spain",
    type: "slide",
    description: "First steps in the professional world.",
    locations: [
      {
        city: "Gijón",
        image: gijonImg,
        cards: [
          {
            title: "Software Engineer",
            organization: "DXC (former CSC)",
            period: "07/2012 – 10/2014",
            details: [
              "Alfresco, Liferay and SharePoint developer and sys admin.",
              "Project Manager on technical projects interfacing with regional administrative entities."
            ],
            tags: ["SharePoint", "Liferay", "Alfresco", "Project Management"],
            type: "job"
          },
          {
            title: "Alfresco System Administrator (Freelance)",
            organization: "Freelance",
            period: "11/2014 – 05/2015",
            details: [],
            tags: ["Alfresco", "SysAdmin"],
            type: "job"
          }
        ]
      }
    ]
  },
  {
    id: "budapest",
    period: "2015 - 2019",
    title: "The R&D Era",
    location: "Budapest, Hungary",
    type: "slide",
    description: "Deep dive into research and telecommunications at Nokia Bell Labs.",
    locations: [
      {
        city: "Budapest",
        image: budapestImg,
        cards: [
          {
            title: "Senior R&D Engineer",
            organization: "Nokia Bell Labs",
            period: "06/2015 – 01/2019",
            details: [
              "DevOps engineer: OpenStack, Docker, Kubernetes, Terraform, Ansible, Helm.",
              "Scientific paper writing and reviewing.",
              "IPR generation: One registered patent.",
              "Lead small DevOps team."
            ],
            tags: ["R&D", "OpenStack", "Kubernetes", "DevOps", "Patents"],
            type: "job"
          }
        ]
      }
    ]
  },
  {
    id: "london",
    period: "2019 - 2022",
    title: "The Fintech & Data Scale-up",
    location: "London, UK",
    type: "slide",
    description: "Scaling platforms in the financial hub of the world.",
    locations: [
      {
        city: "London",
        image: londonImg,
        cards: [
          {
            title: "Cloud Platform Team Lead",
            organization: "Quantexa",
            period: "02/2019 – 01/2021",
            details: [
              "Architect new features of the Cloud Platform.",
              "Cloud Engineer: GCP, GKE, Cloud Functions.",
              "Networking and Security.",
              "CICD with Jenkins.",
              "Act as Scrum Master."
            ],
            tags: ["Team Lead", "GCP", "Big Data", "Architecture"],
            type: "job"
          },
          {
            title: "Site Reliability Engineer",
            organization: "Ziglu",
            period: "02/2021 – 09/2022",
            details: [
              "GCP Proficiency: Compute, Cloud Run, GKE.",
              "Managed multiple clusters for live application and corporate tooling.",
              "Networking design and support.",
              "Security implementation: Least privileged IAM, Zero-trust.",
              "Infrastructure as Code: Terraform, Tanka, Jsonnet."
            ],
            tags: ["SRE", "GCP", "Fintech", "Security", "IaC"],
            type: "job"
          }
        ]
      }
    ]
  },
  {
    id: "gijon-return",
    period: "2022 - Present",
    title: "The Architect & AI",
    location: "Gijón, Spain (Remote)",
    type: "slide",
    description: "Leading cloud architecture and expanding into AI.",
    locations: [
      {
        city: "Gijón",
        image: gijonImg,
        cards: [
          {
            title: "Cloud Platform Engineer / Architect",
            organization: "Storyteq",
            period: "10/2022 – Present",
            details: [
              "Design and implement cloud platform infrastructure (GCP, Terraform, K8s).",
              "Transition from regional to global SaaS offering.",
              "DevOps: Golden paths, standardize K8s resources.",
              "Mentoring & Pair programming.",
              "Vibe coding with AI tools."
            ],
            tags: ["Architecture", "GCP", "K8s", "Global SaaS"],
            type: "job"
          },
          {
            title: "Master in AI, Cloud Computing & DevOps",
            organization: "pontia.tech",
            period: "02/2026 – Present",
            details: ["Continuing education in cutting-edge technologies."],
            tags: ["AI", "Cloud", "DevOps", "Master"],
            type: "education"
          }
        ]
      }
    ]
  }
];
