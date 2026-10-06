_Personal information_

# Manuel Pérez Martínez

**Cloud Platform Engineer / Architect · SRE · AI Platform and Infrastructure**

**Location** Gijón, Spain · remote
**Phone** (+34) 660 163 565
**Email** [manugijon@gmail.com](mailto:manugijon@gmail.com)
**LinkedIn** [linkedin.com/in/mperezmartin](https://www.linkedin.com/in/mperezmartin)
**Web** [manuelpm.com](https://manuelpm.com) · [scoutr.gg](https://scoutr.gg)
**Nationality** Spanish (EU work rights)

## Profile

Cloud platform engineer and architect with 11 years in cloud and platform engineering for SaaS, fintech and telecom R&D, on Kubernetes since 2015 and Google Cloud in production since 2019. I design platforms, write IaC and run them in production, with a focus on developer experience and cloud cost. My production clusters ran on GKE, and I have also built AWS infrastructure.

I also build AI products end to end. In 2026 I founded Scoutr.gg, a real-time AI coaching product with paying subscribers, and I deliver it with coding agents: written specs, automated review, and CI/CD on infrastructure I designed.

Interested in senior, principal or architect roles in platform engineering, SRE, and AI platform and infrastructure, remote from Spain.

## Core skills

_GCP_ GKE, Cloud Run, Compute, VPC networking, load balancing, Cloud Armor, IAM, IAP, VPC Service Controls

_AWS_ Lambda, API Gateway, CloudFront, S3, DynamoDB, Cognito, IAM, Route 53, ECR, WAF, Bedrock

_Kubernetes and platform_ Kubernetes, Helm, Istio, ArgoCD, Argo Rollouts, autoscaling, operators, ephemeral environments

_IaC and CI/CD_ Terraform, Config Connector, Jsonnet and Tanka, Ansible, GitLab CI, GitHub Actions, Jenkins, GitOps

_Reliability and security_ SRE and on-call, Datadog, New Relic, Prometheus, Grafana, Sentry, HashiCorp Vault, zero trust

_FinOps and cost_ Cost allocation, billing dashboards, committed-use discounts, right-sizing, LLM cost limits

_AI platform and agents_ Claude API, Amazon Bedrock, Vertex AI, RAG and vector stores, Claude Code agents, MCP

_Languages_ Python, TypeScript, Bash

## Work experience

_2022 – 2026_

### Cloud Platform Engineer / Architect

**Storyteq**  · London, United Kingdom (remote from Spain)

- Designed and implemented the company's cloud platform on GCP and Kubernetes, and migrated the workloads onto it, in a platform team of 7: 10+ GKE clusters across EU and US regions, running 20+ microservices per environment, all defined in Terraform and Config Connector.

- Contributed to the design of the move from a regional (EU) to a global (EU and US) SaaS offering, using global external load balancing, and leveraging Istio as a Gateway API provider.

- Designed the ephemeral environments that replaced a single shared staging environment: a label on a GitLab merge request deploys the full application in under a minute, or instantly from a pre-warmed pool. Built on ArgoCD ApplicationSets and Helm, and used daily by 30+ engineers.

- Published golden paths and mentored teams on them, migrated legacy manifests to reusable Helm charts shared across business units, and built GitOps delivery with ArgoCD and progressive rollouts with Argo Rollouts.

- Ran cloud cost management (FinOps): cost allocation by business unit through labels, billing-export dashboards, and savings from committed-use discounts, right-sizing and preemptible nodes.

- Operated the clusters day to day: workload and node-pool autoscaling, resource sizing, and the production on-call rota one week in four.

- Ran observability on Datadog and New Relic (dashboards, alerts, APM, log pipelines, SLOs), compared the two vendors on cost, and cut the bill with log exclusion and sampling.

- Rolled out Anthropic models on Vertex AI to the engineering team with IAM access control and usage quotas, after being among the first to adopt AI coding agents, and provisioned GPU VMs for model training.

_2026 – Present_

### Founder and Engineer

**Scoutr.gg**  · Remote · [scoutr.gg](https://scoutr.gg)

Real-time AI coaching companion for League of Legends: computer vision reads the live game, an LLM reasons about it, and a voice-guided overlay coaches the player mid-match. Built, launched and operated solo.

- Launched publicly in September 2026, six months after the first commit, with paid subscription plans, currently at 7% conversion.

- Built the LLM coaching layer on the Claude API with retrieval-augmented generation, per-game token accounting, a shared call budget and server-side limits. Inference cost is measured at €0.05 to €0.07 per coached game.

- Designed a hybrid architecture: a deterministic core ships in the Windows desktop app (Python, OpenCV, Electron, TypeScript), while the AI layer, prompts and keys stay server-side on GCP behind per-user authentication.

- Run the backend on two Cloud Run services with separate trust levels, Firestore and Secret Manager, all in Terraform. The public service's account has no IAM roles, so a compromise cannot read data or secrets through its identity.

- Built path-filtered continuous deployment on GitHub Actions with Workload Identity Federation (no service account keys) and self-hosted runners, and observability with Sentry, log-based metrics and Grafana.

- Implemented billing: Paddle subscriptions and webhooks, tiered entitlements, usage metering and server-enforced quotas.

- Run a spec-driven delivery workflow on Claude Code: every change is gated by a GitHub issue, a written spec and a pull request I approve; an implementing agent writes it and parallel agents review it. More than 40 desktop releases since March 2026.

_2021 – 2022_

### Site Reliability Engineer (contract)

**Ziglu**  · London, United Kingdom (remote) · FCA-regulated fintech

- Ran the GKE clusters behind the live application and the corporate tooling in a team of 4 SREs, with production on-call, plus Cloud Run and Compute workloads (Envoy proxies, VyOS gateways, Windows servers).

- Helped design and operate the network (shared VPCs, firewall policies, load balancers, partner VPNs and peering) and hardened security: least-privilege IAM, zero-trust access with Identity-Aware Proxy, and Cloud Armor.

- Migrated static secrets from GCP Secret Manager to short-lived dynamic secrets in HashiCorp Vault.

- Migrated Helm charts to Jsonnet, kept cluster state in sync through Tanka and ArgoCD, and ran Argo Workflows pipelines with Prometheus and Grafana monitoring.

_2019 – 2021_

### Cloud Platform Technical Lead

**Quantexa**  · London, United Kingdom

- Joined as Senior Cloud Platform Engineer and was promoted to lead a team of 5 cloud platform engineers: architected new platform features, helped define the team's workstreams, decided on implementation approaches and acted as Scrum Master.

- Owned the GCP platform the data analytics product ran on, in production and for the engineering teams' development environments: GKE, Compute, Cloud Functions, networking, security (including data-leak protection with VPC Service Controls) and the infrastructure for ETL workloads, with production on-call one week in four.

- Automated provisioning and configuration with Terraform, Ansible and Packer, delivery with Jenkins, and monitoring with Prometheus and Grafana.

_2015 – 2019_

### Senior R&D Engineer

**Nokia Bell Labs**  · Budapest, Hungary

- Built software for SDN, cloud and orchestration systems in 5G research on OpenStack, Docker and Kubernetes, including the "5G Connected Cars" demo shown at Mobile World Congress 2016.

- Led a 5-person DevOps team, setting what to automate and how (Terraform, Ansible, Helm, Jenkins).

- Lead inventor of a patent on testing network services, granted in the US and Europe, and co-author of a SOFSEM 2018 paper.

_2012 – 2015_

### Software Engineer

**DXC Technology (formerly CSC), and freelance**  · Asturias, Spain

- Developed and administered Alfresco, Liferay and SharePoint platforms, and managed technical projects for regional public administration clients.

## Projects

_2026_

### Kyrian World — AI travel planner on AWS

**Final team project, Master's at pontia.tech**  · [kyrian-world.com](https://kyrian-world.com)

Main contributor to a web application that streams day-by-day trip itineraries from an LLM, grounded in a city knowledge base, and author of most of its infrastructure.

- Built the AWS platform in Terraform: container-image Lambda functions behind API Gateway with response streaming, CloudFront and S3 for the frontend, Cognito sign-in, DynamoDB, Route 53, ECR, a WAF, and one least-privilege IAM role per function.

- Redesigned the architecture for cost: replaced a Fargate, load balancer, NAT gateway and RDS design estimated at more than €55 a month with a serverless one that runs for about €5 a month, inside a €30 monthly budget.

- Integrated Amazon Bedrock for chat and embeddings, with retrieval from an S3 Vectors index, a trace of every AI turn, and a daily token limit per account.

- Set up keyless delivery: GitHub Actions deploys through OIDC, engineers sign in through IAM Identity Center, and no access keys exist.

_Side project_

### Genetic Neural Snake

[manuelpm.com/playground/gnsnake](https://manuelpm.com/playground/gnsnake/)

Neural networks trained by a genetic algorithm to play Snake.

## Education

_2026_

### Master in Artificial Intelligence, Cloud Computing and DevOps

**pontia.tech**  · completing October 2026

Includes MLOps pipelines with MLflow and CI/CD model releases, model serving, Amazon Bedrock and Azure AI agent services.

_2005 – 2012_

### MSc Telecommunication Engineering

**University of Oviedo**  · Gijón, Spain · with an Erasmus year at the University of Bologna, Italy

## Additional

_Patent_
[WO2019210958A1](https://patents.google.com/patent/WO2019210958A1/), "Method for testing network services", lead inventor, Nokia Solutions and Networks. Granted as US11171858B2 and EP3788744B1.

_Publications and talks_
"Multivendor Deployment Integration for Future Mobile Networks", SOFSEM 2018 · "DevOps: A Bell Labs perspective", DevOps Budapest meetup.

_Languages_
Spanish (native) · English (C1) · Italian (B1), CEFR levels.
