import gijonImg from '../assets/images/gijon.png';
import bolognaImg from '../assets/images/bologna.png';
import budapestImg from '../assets/images/budapest.png';
import londonImg from '../assets/images/london.png';

// Reusable location data to avoid duplication
const LOCATIONS = {
  gijon: { city: "Gijón", image: gijonImg },
  bologna: { city: "Bologna", image: bolognaImg },
  budapest: { city: "Budapest", image: budapestImg },
  london: { city: "London", image: londonImg }
};

export const timelineDataEn = [
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
        ...LOCATIONS.gijon,
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
        ...LOCATIONS.bologna,
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
        ...LOCATIONS.gijon,
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
        ...LOCATIONS.gijon,
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
        ...LOCATIONS.budapest,
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
        ...LOCATIONS.london,
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
        ...LOCATIONS.gijon,
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

export const timelineDataEs = [
  {
    id: "intro",
    period: "Intro",
    title: "Manuel Pérez Martínez",
    location: "Gijón, España",
    type: "intro",
    content: {
      role: "Ingeniero de Plataformas Cloud",
      email: "manugijon@gmail.com",
      mobile: "(+34) 660 163 565",
      summary: "Arquitecto de Plataformas Cloud con amplia experiencia en GCP, Kubernetes y prácticas DevOps.",
      socials: [
        { name: "LinkedIn", url: "https://www.linkedin.com/in/mperezmartin/" },
        { name: "GitHub", url: "https://github.com/manupm87" }
      ]
    }
  },
  {
    id: "education",
    period: "2003 - 2012",
    title: "La Base",
    location: "Gijón y Bolonia",
    type: "slide",
    description: "Construyendo la base académica.",
    locations: [
      {
        ...LOCATIONS.gijon,
        cards: [
          {
            title: "Bachillerato Internacional",
            organization: "R.I.E.S. Jovellanos",
            period: "2003 - 2005",
            details: ["Educación Secundaria"],
            tags: ["IB"],
            type: "education"
          }
        ]
      },
      {
        ...LOCATIONS.bologna,
        cards: [
          {
            title: "ERASMUS Ingeniería de Telecomunicaciones",
            organization: "Universitá di Bologna",
            period: "2010 - 2011",
            details: ["Experiencia internacional en Italia"],
            tags: ["Erasmus", "Italia"],
            type: "education"
          }
        ]
      },
      {
        ...LOCATIONS.gijon,
        cards: [
          {
            title: "Máster en Ingeniería de Telecomunicaciones",
            organization: "Universidad de Oviedo",
            period: "2005 - 2012",
            details: [
              "Ciencias de la Computación",
              "Física, Electrónica y Electromagnetismo",
              "Telemática y Redes",
              "Tesis de Máster y Especialización"
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
    title: "Inicios Profesionales",
    location: "Gijón, España",
    type: "slide",
    description: "Primeros pasos en el mundo profesional.",
    locations: [
      {
        ...LOCATIONS.gijon,
        cards: [
          {
            title: "Ingeniero de Software",
            organization: "DXC (antes CSC)",
            period: "07/2012 – 10/2014",
            details: [
              "Desarrollador y administrador de sistemas Alfresco, Liferay y SharePoint.",
              "Gestor de proyectos técnicos interactuando con entidades administrativas regionales."
            ],
            tags: ["SharePoint", "Liferay", "Alfresco", "Project Management"],
            type: "job"
          },
          {
            title: "Administrador de Sistemas Alfresco (Freelance)",
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
    title: "La Era de I+D",
    location: "Budapest, Hungría",
    type: "slide",
    description: "Inmersión en investigación y telecomunicaciones en Nokia Bell Labs.",
    locations: [
      {
        ...LOCATIONS.budapest,
        cards: [
          {
            title: "Ingeniero Senior de I+D",
            organization: "Nokia Bell Labs",
            period: "06/2015 – 01/2019",
            details: [
              "Ingeniero DevOps: OpenStack, Docker, Kubernetes, Terraform, Ansible, Helm.",
              "Escritura y revisión de artículos científicos.",
              "Generación de IPR: Una patente registrada.",
              "Liderazgo de un pequeño equipo DevOps."
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
    title: "Escalado en Fintech y Datos",
    location: "Londres, Reino Unido",
    type: "slide",
    description: "Escalando plataformas en el centro financiero del mundo.",
    locations: [
      {
        ...LOCATIONS.london,
        cards: [
          {
            title: "Líder de Equipo de Plataforma Cloud",
            organization: "Quantexa",
            period: "02/2019 – 01/2021",
            details: [
              "Arquitecto de nuevas funcionalidades de la Plataforma Cloud.",
              "Ingeniero Cloud: GCP, GKE, Cloud Functions.",
              "Redes y Seguridad.",
              "CICD con Jenkins.",
              "Actuar como Scrum Master."
            ],
            tags: ["Team Lead", "GCP", "Big Data", "Architecture"],
            type: "job"
          },
          {
            title: "Ingeniero de Fiabilidad del Sitio (SRE)",
            organization: "Ziglu",
            period: "02/2021 – 09/2022",
            details: [
              "Competencia en GCP: Compute, Cloud Run, GKE.",
              "Gestión de múltiples clústeres para aplicaciones en vivo y herramientas corporativas.",
              "Diseño y soporte de redes.",
              "Implementación de seguridad: IAM con privilegios mínimos, Zero-trust.",
              "Infraestructura como Código: Terraform, Tanka, Jsonnet."
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
    period: "2022 - Actualidad",
    title: "El Arquitecto y la IA",
    location: "Gijón, España (Remoto)",
    type: "slide",
    description: "Liderando la arquitectura cloud y expandiéndose hacia la IA.",
    locations: [
      {
        ...LOCATIONS.gijon,
        cards: [
          {
            title: "Ingeniero / Arquitecto de Plataformas Cloud",
            organization: "Storyteq",
            period: "10/2022 – Actualidad",
            details: [
              "Diseño e implementación de infraestructura de plataforma cloud (GCP, Terraform, K8s).",
              "Transición de oferta regional a SaaS global.",
              "DevOps: Golden paths, estandarización de recursos K8s.",
              "Tutoría y programación en pareja.",
              "Programación con herramientas de IA."
            ],
            tags: ["Architecture", "GCP", "K8s", "Global SaaS"],
            type: "job"
          },
          {
            title: "Máster en IA, Cloud Computing y DevOps",
            organization: "pontia.tech",
            period: "02/2026 – Actualidad",
            details: ["Educación continua en tecnologías de vanguardia."],
            tags: ["AI", "Cloud", "DevOps", "Master"],
            type: "education"
          }
        ]
      }
    ]
  }
];

// Default export for backward compatibility
export const timelineData = timelineDataEn;
