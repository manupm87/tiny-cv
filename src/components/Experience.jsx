import React from 'react';
import ComicPanel from './ComicPanel';
import { Briefcase } from 'lucide-react';

const Experience = () => {
  return (
    <ComicPanel title="Work Experience">
      <div className="experience-list">

        {/* Storyteq */}
        <div className="job-entry">
          <h3><Briefcase size={24} className="icon"/> Cloud Platform Engineer</h3>
          <h4>Storyteq, London (UK) | 10/2022 – Present</h4>
          <ul>
            <li><strong>Cloud Platform Architect:</strong> Designed and implemented cloud infrastructure (GCP, Terraform, K8s). Implemented "dev envs" for microservices. Transitioned SaaS from regional to global.</li>
            <li><strong>DevOps:</strong> Produced golden paths for SDLC. Standardized K8s resources with Helm. Integrated monitoring (Datadog, New Relic). Mentoring & Pair programming. Vibe coding with AI tools.</li>
          </ul>
        </div>

        {/* Ziglu */}
        <div className="job-entry">
          <h3><Briefcase size={24} className="icon"/> Site Reliability Engineer</h3>
          <h4>Ziglu, London (UK) | 02/2021 – 09/2022</h4>
          <ul>
            <li><strong>SRE:</strong> Managed GCP (Compute, Cloud Run, GKE). Handled clusters and corporate tooling. Deployed K8s operators (CertManager, Istio, Vault). Operated specific VM payloads.</li>
            <li><strong>Networking & Security:</strong> Designed network topography. Integrated VPNs and peerings. Implemented Least Privileged IAM and Zero-Trust tools. Cloud Armor & DLP.</li>
            <li><strong>Technologies:</strong> Docker, Kubernetes, Helm, Istio, Terraform, Tanka, Jsonnet, Vault, ArgoCD, Prometheus, Grafana.</li>
          </ul>
        </div>

        {/* Quantexa */}
        <div className="job-entry">
          <h3><Briefcase size={24} className="icon"/> Cloud Platform Team Lead</h3>
          <h4>Quantexa, London (UK) | 02/2019 – 01/2021</h4>
          <ul>
            <li><strong>Team Lead:</strong> Architected Cloud Platform features. Code reviews. Scrum Master.</li>
            <li><strong>Cloud Engineer:</strong> GCP proficiency. Networking & Security. Docker, K8s, Helm, Istio. IaC (Terraform, Ansible, Packer). CI/CD (Jenkins). Monitoring (Prometheus, Grafana). Scripting.</li>
          </ul>
        </div>

        {/* Nokia Bell Labs */}
        <div className="job-entry">
          <h3><Briefcase size={24} className="icon"/> Senior R&D Engineer</h3>
          <h4>Nokia Bell Labs, Budapest (Hungary) | 06/2015 – 01/2019</h4>
          <ul>
            <li><strong>DevOps Engineer:</strong> OpenStack, Docker, Kubernetes, Terraform, Ansible, Helm, Jenkins, ChatOps.</li>
            <li>Scientific paper writing and patent generation. Prototype & PoC development. Led small DevOps team and mentored students.</li>
          </ul>
        </div>

        {/* Freelance */}
        <div className="job-entry">
          <h3><Briefcase size={24} className="icon"/> Alfresco System Administrator</h3>
          <h4>Freelance | 11/2014 – 05/2015</h4>
        </div>

        {/* DXC */}
        <div className="job-entry">
          <h3><Briefcase size={24} className="icon"/> Software Engineer</h3>
          <h4>DXC (former CSC), Oviedo (Spain) | 07/2012 – 10/2014</h4>
          <ul>
            <li>Alfresco, Liferay and SharePoint developer and sys admin.</li>
            <li>Project Manager on technical projects interfacing with regional administrative entities.</li>
          </ul>
        </div>

      </div>
    </ComicPanel>
  );
};

export default Experience;
