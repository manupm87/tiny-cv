import gijonImg from '../assets/images/gijon.webp';
import gijonImgSmall from '../assets/images/gijon-small.webp';
import bolognaImg from '../assets/images/bologna.webp';
import bolognaImgSmall from '../assets/images/bologna-small.webp';
import budapestImg from '../assets/images/budapest.webp';
import budapestImgSmall from '../assets/images/budapest-small.webp';
import londonImg from '../assets/images/london.webp';
import londonImgSmall from '../assets/images/london-small.webp';

// Reusable location data to avoid duplication
const LOCATIONS = {
  gijon: { city: "Gijón", image: gijonImg, imageSmall: gijonImgSmall },
  bologna: { city: "Bologna", image: bolognaImg, imageSmall: bolognaImgSmall },
  budapest: { city: "Budapest", image: budapestImg, imageSmall: budapestImgSmall },
  london: { city: "London", image: londonImg, imageSmall: londonImgSmall }
};

const SOCIALS = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/mperezmartin/" },
  { name: "GitHub", url: "https://github.com/manupm87" },
  { name: "Scoutr.gg", url: "https://scoutr.gg" }
];

export const timelineDataEn = [
  {
    id: "intro",
    period: "Intro",
    title: "Manuel Pérez Martínez",
    location: "Gijón, Spain",
    type: "intro",
    content: {
      role: "Cloud Platform Engineer / Architect · SRE · AI Platform and Infrastructure",
      email: "manugijon@gmail.com",
      mobile: "(+34) 660 163 565",
      summary: "Cloud platform engineer and architect with 11 years in cloud and platform engineering, on Kubernetes since 2015 and Google Cloud in production since 2019. Founder of Scoutr.gg, a real-time AI coaching product with paying subscribers.",
      socials: SOCIALS
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
            period: "2003 – 2005",
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
            organization: "Università di Bologna",
            period: "2010 – 2011",
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
            period: "2005 – 2012",
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
            organization: "DXC Technology (formerly CSC), and freelance",
            period: "2012 – 2015",
            details: [
              "Developed and administered Alfresco, Liferay and SharePoint platforms.",
              "Managed technical projects for regional public administration clients."
            ],
            tags: ["SharePoint", "Liferay", "Alfresco", "Project Management"],
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
            period: "2015 – 2019",
            details: [
              "Built software for SDN, cloud and orchestration systems in 5G research on OpenStack, Docker and Kubernetes.",
              "Built the \"5G Connected Cars\" demo shown at Mobile World Congress 2016.",
              "Led a 5-person DevOps team (Terraform, Ansible, Helm, Jenkins).",
              "Lead inventor of a patent on testing network services, granted in the US and Europe.",
              "Co-author of a SOFSEM 2018 paper."
            ],
            tags: ["R&D", "5G", "OpenStack", "Kubernetes", "Patent"],
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
            title: "Cloud Platform Technical Lead",
            organization: "Quantexa",
            period: "2019 – 2021",
            details: [
              "Joined as Senior Cloud Platform Engineer and was promoted to lead a team of 5 cloud platform engineers.",
              "Architected new platform features, defined the team's workstreams and acted as Scrum Master.",
              "Owned the GCP platform behind the data analytics product: GKE, Compute, Cloud Functions, networking and security, including VPC Service Controls.",
              "Automated provisioning with Terraform, Ansible and Packer, and delivery with Jenkins.",
              "Production on-call one week in four."
            ],
            tags: ["Technical Lead", "GCP", "GKE", "Terraform"],
            type: "job"
          },
          {
            title: "Site Reliability Engineer (contract)",
            organization: "Ziglu",
            period: "2021 – 2022",
            details: [
              "Ran the GKE clusters behind an FCA-regulated fintech application, in a team of 4 SREs with production on-call.",
              "Helped design and operate the network: shared VPCs, firewall policies, load balancers, partner VPNs and peering.",
              "Hardened security: least-privilege IAM, zero-trust access with Identity-Aware Proxy, and Cloud Armor.",
              "Migrated static secrets to short-lived dynamic secrets in HashiCorp Vault.",
              "Migrated Helm charts to Jsonnet, synced through Tanka and ArgoCD."
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
    period: "2022 - 2026",
    title: "The Architect",
    location: "Gijón, Spain (Remote)",
    type: "slide",
    description: "Designing and running a global cloud platform.",
    locations: [
      {
        ...LOCATIONS.gijon,
        cards: [
          {
            title: "Cloud Platform Engineer / Architect",
            organization: "Storyteq",
            period: "2022 – 2026",
            details: [
              "Designed and implemented the company's cloud platform on GCP and Kubernetes: 10+ GKE clusters across EU and US regions, in Terraform and Config Connector.",
              "Designed the ephemeral environments that replaced shared staging: a label on a merge request deploys the full application in under a minute. Used daily by 30+ engineers.",
              "Built GitOps delivery with ArgoCD and progressive rollouts with Argo Rollouts.",
              "Ran cloud cost management (FinOps): cost allocation by business unit, billing dashboards, committed-use discounts and right-sizing.",
              "Ran observability on Datadog and New Relic, and the production on-call rota one week in four.",
              "Rolled out Anthropic models on Vertex AI to the engineering team with IAM access control and usage quotas."
            ],
            tags: ["Architecture", "GCP", "Kubernetes", "GitOps", "FinOps"],
            type: "job"
          }
        ]
      }
    ]
  },
  {
    id: "ai-builder",
    period: "2026 - Present",
    title: "The AI Builder",
    location: "Gijón, Spain (Remote)",
    type: "slide",
    description: "Building AI products end to end, on platforms I design.",
    locations: [
      {
        ...LOCATIONS.gijon,
        cards: [
          {
            title: "Founder and Engineer",
            organization: "Scoutr.gg",
            period: "2026 – Present",
            details: [
              "Real-time AI coaching companion for League of Legends: computer vision reads the live game, an LLM reasons about it, and a voice-guided overlay coaches the player.",
              "Launched publicly in September 2026 with paid subscription plans. Built, launched and operated solo.",
              "Built the LLM coaching layer on the Claude API with retrieval, per-game token accounting and server-side limits.",
              "Run the backend on two Cloud Run services with separate trust levels, all in Terraform, with keyless continuous deployment.",
              "Run a spec-driven delivery workflow on Claude Code: written specs, agent implementation and review, and pull requests I approve."
            ],
            tags: ["AI", "LLM", "GCP", "Cloud Run", "Claude"],
            type: "job"
          },
          {
            title: "Master in AI, Cloud Computing & DevOps",
            organization: "pontia.tech",
            period: "2026",
            details: [
              "Final project: Kyrian World (kyrian-world.com), an AI travel planner on AWS. Main contributor and author of most of its infrastructure.",
              "Built the AWS platform in Terraform: Lambda, API Gateway, CloudFront, Cognito, DynamoDB and Bedrock.",
              "Redesigned the architecture for cost: from more than €55 a month to about €5 a month.",
              "Coursework in MLOps with MLflow, model serving, and AI agent services."
            ],
            tags: ["AI", "AWS", "Bedrock", "MLOps", "Master"],
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
      role: "Ingeniero / Arquitecto de Plataformas Cloud · SRE · Plataforma e Infraestructura de IA",
      email: "manugijon@gmail.com",
      mobile: "(+34) 660 163 565",
      summary: "Ingeniero y arquitecto de plataformas cloud con 11 años en ingeniería cloud y de plataformas, con Kubernetes desde 2015 y Google Cloud en producción desde 2019. Fundador de Scoutr.gg, un producto de coaching con IA en tiempo real con suscriptores de pago.",
      socials: SOCIALS
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
            period: "2003 – 2005",
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
            organization: "Università di Bologna",
            period: "2010 – 2011",
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
            period: "2005 – 2012",
            details: [
              "Ciencias de la Computación",
              "Física, Electrónica y Electromagnetismo",
              "Telemática y Redes",
              "Tesis de Máster y Especialización"
            ],
            tags: ["Telecomunicaciones", "Ingeniería", "MSc", "BSc"],
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
            organization: "DXC Technology (antes CSC), y freelance",
            period: "2012 – 2015",
            details: [
              "Desarrollo y administración de plataformas Alfresco, Liferay y SharePoint.",
              "Gestión de proyectos técnicos para clientes de la administración pública regional."
            ],
            tags: ["SharePoint", "Liferay", "Alfresco", "Gestión de proyectos"],
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
            period: "2015 – 2019",
            details: [
              "Desarrollo de software para sistemas SDN, cloud y de orquestación en investigación 5G, sobre OpenStack, Docker y Kubernetes.",
              "Desarrollo de la demo \"5G Connected Cars\" presentada en el Mobile World Congress 2016.",
              "Liderazgo de un equipo DevOps de 5 personas (Terraform, Ansible, Helm, Jenkins).",
              "Inventor principal de una patente sobre pruebas de servicios de red, concedida en EE. UU. y Europa.",
              "Coautor de un artículo en SOFSEM 2018."
            ],
            tags: ["R&D", "5G", "OpenStack", "Kubernetes", "Patent"],
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
            title: "Líder Técnico de Plataforma Cloud",
            organization: "Quantexa",
            period: "2019 – 2021",
            details: [
              "Me incorporé como Ingeniero Senior de Plataforma Cloud y fui promocionado a liderar un equipo de 5 ingenieros de plataforma cloud.",
              "Arquitectura de nuevas funcionalidades de la plataforma, definición de las líneas de trabajo del equipo y rol de Scrum Master.",
              "Responsable de la plataforma GCP del producto de analítica de datos: GKE, Compute, Cloud Functions, redes y seguridad, incluyendo VPC Service Controls.",
              "Automatización del aprovisionamiento con Terraform, Ansible y Packer, y del despliegue con Jenkins.",
              "Guardias de producción una semana de cada cuatro."
            ],
            tags: ["Líder técnico", "GCP", "GKE", "Terraform"],
            type: "job"
          },
          {
            title: "Ingeniero de Fiabilidad del Sitio (SRE, contrato)",
            organization: "Ziglu",
            period: "2021 – 2022",
            details: [
              "Operación de los clústeres GKE de una aplicación fintech regulada por la FCA, en un equipo de 4 SREs con guardias de producción.",
              "Diseño y operación de la red: VPCs compartidas, políticas de firewall, balanceadores, VPNs con terceros y peering.",
              "Refuerzo de la seguridad: IAM de mínimo privilegio, acceso zero-trust con Identity-Aware Proxy y Cloud Armor.",
              "Migración de secretos estáticos a secretos dinámicos de corta duración en HashiCorp Vault.",
              "Migración de charts de Helm a Jsonnet, sincronizados con Tanka y ArgoCD."
            ],
            tags: ["SRE", "GCP", "Fintech", "Seguridad", "IaC"],
            type: "job"
          }
        ]
      }
    ]
  },
  {
    id: "gijon-return",
    period: "2022 - 2026",
    title: "El Arquitecto",
    location: "Gijón, España (Remoto)",
    type: "slide",
    description: "Diseñando y operando una plataforma cloud global.",
    locations: [
      {
        ...LOCATIONS.gijon,
        cards: [
          {
            title: "Ingeniero / Arquitecto de Plataformas Cloud",
            organization: "Storyteq",
            period: "2022 – 2026",
            details: [
              "Diseño e implementación de la plataforma cloud de la empresa en GCP y Kubernetes: más de 10 clústeres GKE en regiones de la UE y EE. UU., en Terraform y Config Connector.",
              "Diseño de los entornos efímeros que sustituyeron al staging compartido: una etiqueta en una merge request despliega la aplicación completa en menos de un minuto. Usados a diario por más de 30 ingenieros.",
              "Entrega GitOps con ArgoCD y despliegues progresivos con Argo Rollouts.",
              "Gestión de costes cloud (FinOps): asignación de costes por unidad de negocio, paneles de facturación, descuentos por compromiso de uso y right-sizing.",
              "Observabilidad con Datadog y New Relic, y guardias de producción una semana de cada cuatro.",
              "Despliegue de modelos de Anthropic en Vertex AI para el equipo de ingeniería, con control de acceso IAM y cuotas de uso."
            ],
            tags: ["Arquitectura", "GCP", "Kubernetes", "GitOps", "FinOps"],
            type: "job"
          }
        ]
      }
    ]
  },
  {
    id: "ai-builder",
    period: "2026 - Actualidad",
    title: "Construyendo con IA",
    location: "Gijón, España (Remoto)",
    type: "slide",
    description: "Construyendo productos de IA de principio a fin, sobre plataformas que diseño.",
    locations: [
      {
        ...LOCATIONS.gijon,
        cards: [
          {
            title: "Fundador e Ingeniero",
            organization: "Scoutr.gg",
            period: "2026 – Actualidad",
            details: [
              "Asistente de coaching con IA en tiempo real para League of Legends: la visión por computador lee la partida, un LLM razona sobre ella y un overlay con voz guía al jugador.",
              "Lanzado al público en septiembre de 2026 con planes de suscripción de pago. Construido, lanzado y operado en solitario.",
              "Capa de coaching con LLM sobre la API de Claude, con recuperación de contexto, contabilidad de tokens por partida y límites en el servidor.",
              "Backend en dos servicios de Cloud Run con niveles de confianza separados, todo en Terraform, con despliegue continuo sin claves.",
              "Flujo de entrega guiado por especificaciones con Claude Code: specs escritas, implementación y revisión por agentes, y pull requests que apruebo yo."
            ],
            tags: ["AI", "LLM", "GCP", "Cloud Run", "Claude"],
            type: "job"
          },
          {
            title: "Máster en IA, Cloud Computing y DevOps",
            organization: "pontia.tech",
            period: "2026",
            details: [
              "Proyecto final: Kyrian World (kyrian-world.com), un planificador de viajes con IA en AWS. Principal contribuidor y autor de la mayor parte de su infraestructura.",
              "Plataforma AWS en Terraform: Lambda, API Gateway, CloudFront, Cognito, DynamoDB y Bedrock.",
              "Rediseño de la arquitectura por coste: de más de 55 € al mes a unos 5 € al mes.",
              "Formación en MLOps con MLflow, despliegue de modelos y servicios de agentes de IA."
            ],
            tags: ["AI", "AWS", "Bedrock", "MLOps", "Máster"],
            type: "education"
          }
        ]
      }
    ]
  }
];

// Default export for backward compatibility
export const timelineData = timelineDataEn;
