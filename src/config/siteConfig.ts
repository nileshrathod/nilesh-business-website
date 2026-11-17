import heroVisual from '../assets/images/hero_teal_architecture_1794953687542.jpg';
import solutionsVisual from '../assets/images/solutions_digital_workplace_1794929569428.jpg';
import insightsVisual from '../assets/images/insights_teal_prisms_1794953687776.jpg';

export type ServiceIconKey =
  | 'sparkles'
  | 'cloud'
  | 'folder'
  | 'workflow'
  | 'code'
  | 'globe'
  | 'chart'
  | 'compass';

export type TechIconKey =
  | 'microsoft365'
  | 'sharepoint'
  | 'powerapps'
  | 'powerautomate'
  | 'azure'
  | 'entraid'
  | 'ai'
  | 'apis'
  | 'analytics';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  icon: ServiceIconKey;
  deliverables: string[];
  commonChallenges: string[];
  solutionApproach: string;
}

export interface SolutionItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  challengesSolved: string[];
  architectureHighlights: string[];
  relatedServiceIds: string[];
}

export interface InsightArticle {
  id: string;
  slug: string;
  category: string;
  statusLabel: string;
  readTime: string;
  title: string;
  excerpt: string;
  keyTakeaways: string[];
  bodyParagraphs: string[];
}

const baseUrl = import.meta.env.BASE_URL;

export const siteConfig = {
  brand: {
    companyName: 'AASTRA Digital',
    shortName: 'AASTRA',
    wordmarkPrimary: 'AASTRA',
    wordmarkSecondary: 'Digital',
    tagline: 'Smarter Systems. Better Business.',
    supportingMessage: 'Turning technology into business advantage.',
    description:
      'Proposed technology consulting and digital solutions practice focused on AI integration, workflow automation, Microsoft 365, SharePoint, and custom business applications.',
    location: 'Regina, Saskatchewan, Canada',
    serviceArea: 'Serving organizations locally in Saskatchewan and internationally',
    prototypeNotice:
      'Website prototype — brand identity, content, and legal templates are configured for evaluation prior to formal business registration.',
    faviconPath: `${baseUrl}favicon.svg`,
    accentColors: {
      lightBg: '#F3F3FF',
      lightPrimaryInk: '#031634',
      tealAccent: '#00CBA0',
      goldAccent: '#FFC830',
      darkBg: '#000000',
    },
  },

  assets: {
    heroVisual,
    solutionsVisual,
    insightsVisual,
  },

  contact: {
    contactName: 'Nilesh Rathod',
    phone: '+1 639-997-9925',
    phoneHref: 'tel:+16399979925',
    email: 'njrathod@gmail.com',
    isEmailConfigured: true,
    emailPlaceholderLabel: 'Email address placeholder (configure in src/config/siteConfig.ts)',
    location: 'Regina, Saskatchewan, Canada',
    /**
     * Optional webhook or serverless form endpoint (e.g., Azure Static Web Apps /api/contact,
     * Formspree, or Web3Forms). When empty, the contact form runs in clearly labelled
     * Prototype Demo Mode without transmitting or storing personal data.
     */
    formEndpoint: '',
  },

  navigation: {
    links: [
      { label: 'Home', path: '/' },
      { label: 'Services', path: '/services' },
      { label: 'Solutions', path: '/solutions' },
      { label: 'Insights', path: '/insights' },
      { label: 'Contact', path: '/contact' },
    ],
    primaryCta: {
      label: "Let's Talk",
      path: '/contact',
    },
    legalLinks: [
      { label: 'Privacy Policy (Draft)', path: '/privacy-policy' },
      { label: 'Terms of Use (Draft)', path: '/terms-of-use' },
    ],
  },

  seo: {
    defaultTitle: 'AASTRA Digital — Smarter Systems. Better Business.',
    titleTemplate: '%s | AASTRA Digital',
    defaultDescription:
      'Technology consulting and digital solutions in AI integration, workflow automation, Microsoft 365, SharePoint, and custom business applications. Based in Regina, Saskatchewan.',
  },

  hero: {
    headline: 'Technology That Moves Your Business Forward.',
    supportingCopy:
      'We help organizations simplify operations, automate workflows, build smarter applications, and unlock the value of AI through practical, secure, and scalable digital solutions.',
    primaryCtaLabel: "Let's Talk",
    primaryCtaPath: '/contact',
    secondaryCtaLabel: 'Explore Our Services',
    secondaryCtaPath: '/services',
  },

  services: [
    {
      id: 'ai-integration',
      number: '01',
      title: 'AI Integration and Intelligent Automation',
      shortDescription:
        'Connect practical AI capabilities directly to everyday business processes, documents, and internal tools.',
      icon: 'sparkles',
      deliverables: [
        'AI-powered business workflows',
        'AI assistants and practical business use cases',
        'Integration of AI services with existing systems',
        'Document processing and information extraction',
        'Process optimization using AI',
      ],
      commonChallenges: [
        'Teams spending hours manually sorting, summarizing, and re-keying documents.',
        'Disconnected AI experiments that do not integrate with existing permissions or business data.',
        'Uncertainty around where AI adds measurable operational value versus unnecessary complexity.',
      ],
      solutionApproach:
        'We focus on scoped, verifiable AI integrations anchored to existing systems and human review checkpoints—prioritizing reliability, data boundaries, and clear operational savings.',
    },
    {
      id: 'microsoft-365-cloud',
      number: '02',
      title: 'Microsoft 365 and Cloud Solutions',
      shortDescription:
        'Configure, secure, and integrate your Microsoft 365 and cloud environment for dependable daily operations.',
      icon: 'cloud',
      deliverables: [
        'Microsoft 365 consulting and implementation',
        'Microsoft Entra ID and identity integration',
        'Microsoft 365 administration and configuration',
        'Secure collaboration and productivity solutions',
        'Cloud architecture and application integration',
      ],
      commonChallenges: [
        'Underutilized Microsoft 365 licensing alongside fragmented file-sharing habits.',
        'Inconsistent identity, access control, and external sharing policies.',
        'Manual provisioning and ad-hoc cloud configurations that slow down onboarding.',
      ],
      solutionApproach:
        'We structure Microsoft 365 and Entra ID around clear governance, identity hygiene, and seamless integration with line-of-business applications.',
    },
    {
      id: 'sharepoint-workplace',
      number: '03',
      title: 'SharePoint and Digital Workplace',
      shortDescription:
        'Build structured intranets, document libraries, and knowledge portals that teams can actually navigate.',
      icon: 'folder',
      deliverables: [
        'SharePoint intranets and employee portals',
        'Document management and information architecture',
        'Permissions and access management',
        'Digital workplace solutions',
        'Business information and knowledge portals',
      ],
      commonChallenges: [
        'Important policies and project records buried across nested folders and personal drives.',
        'Unclear document ownership, version confusion, and overly broad permissions.',
        'Intranets that launch with static links and quickly fall out of date.',
      ],
      solutionApproach:
        'We design clean information architecture, metadata conventions, and role-aligned permissions so employees can locate authoritative documents in seconds.',
    },
    {
      id: 'power-platform',
      number: '04',
      title: 'Power Platform and Workflow Automation',
      shortDescription:
        'Replace repetitive spreadsheet handoffs and email approvals with dependable Power Apps and Power Automate flows.',
      icon: 'workflow',
      deliverables: [
        'Microsoft Power Apps',
        'Power Automate workflows',
        'Approval and document processes',
        'Business process automation',
        'Reporting and operational efficiency',
      ],
      commonChallenges: [
        'Approval requests stalling in shared inboxes without visibility or audit trails.',
        'Shadow spreadsheets maintained manually across departments.',
        'High error rates from repetitive copy-and-paste data entry between forms and records.',
      ],
      solutionApproach:
        'We map the underlying business rules first, then build maintainable Power Apps and Power Automate workflows with clear exception handling and ownership.',
    },
    {
      id: 'custom-apps',
      number: '05',
      title: 'Custom Application Development',
      shortDescription:
        'Engineer tailored web and internal business applications when off-the-shelf tools no longer fit your workflow.',
      icon: 'code',
      deliverables: [
        'Custom web applications',
        'Internal business applications',
        'API and third-party system integrations',
        'Application modernization',
        'Responsive user interfaces and dashboards',
      ],
      commonChallenges: [
        'Legacy internal tools that are difficult to maintain or incompatible with modern browsers.',
        'Critical operational systems that cannot exchange data without manual exports.',
        'Rigid SaaS software forcing teams into awkward workarounds.',
      ],
      solutionApproach:
        'We build clean, modular TypeScript and web applications with well-documented APIs, straightforward interfaces, and long-term maintainability.',
    },
    {
      id: 'web-experiences',
      number: '06',
      title: 'Website Design and Digital Experiences',
      shortDescription:
        'Create fast, accessible, responsive websites and web applications that represent your organization clearly.',
      icon: 'globe',
      deliverables: [
        'Professional business websites',
        'Responsive web application development',
        'Landing pages and digital experiences',
        'Website modernization',
        'Website deployment and maintenance',
      ],
      commonChallenges: [
        'Outdated websites that render poorly on mobile devices or fail accessibility checks.',
        'Cluttered page structures that obscure core services and slow down inquiries.',
        'High maintenance overhead for simple content and branding updates.',
      ],
      solutionApproach:
        'We combine clean architectural typography, responsive layouts, structured SEO fundamentals, and portable static or cloud deployment.',
    },
    {
      id: 'data-reporting',
      number: '07',
      title: 'Data, Dashboards and Reporting',
      shortDescription:
        'Turn scattered operational records into clear dashboards and automated reporting for timely decisions.',
      icon: 'chart',
      deliverables: [
        'Business intelligence dashboards',
        'KPI and operational reporting',
        'Data integration',
        'Reporting automation',
        'Decision-support solutions',
      ],
      commonChallenges: [
        'Weekly or monthly management reports assembled manually from multiple CSV exports.',
        'Conflicting metric definitions across finance, operations, and service teams.',
        'Lack of timely visibility into bottlenecks or service workloads.',
      ],
      solutionApproach:
        'We establish clean data pipelines and focused executive views centered on decisions your team actually makes every week.',
    },
    {
      id: 'digital-transformation',
      number: '08',
      title: 'Digital Transformation and Technology Consulting',
      shortDescription:
        'Align systems, processes, and technical roadmaps with practical business priorities before writing code.',
      icon: 'compass',
      deliverables: [
        'Business process assessment',
        'Technology strategy and planning',
        'Systems integration',
        'Solution architecture',
        'Modernization roadmaps',
      ],
      commonChallenges: [
        'Competing software proposals without an objective technical architecture evaluation.',
        'Unclear sequencing between quick operational wins and longer-term system replacements.',
        'Change fatigue from rolling out new tools without workflow alignment.',
      ],
      solutionApproach:
        'We start with how work actually moves through your organization, then define phased, budget-aware roadmaps with transparent scope.',
    },
  ] as ServiceItem[],

  whyPrinciples: [
    {
      number: '01',
      title: 'Business-first problem solving',
      description:
        'Every engagement starts with operational bottlenecks, team workflows, and measurable outcomes rather than adopting tools for their own sake.',
    },
    {
      number: '02',
      title: 'Practical technology choices',
      description:
        'We recommend architectures your organization can operate confidently—matching complexity to actual scale and team capacity.',
    },
    {
      number: '03',
      title: 'Secure and scalable solutions',
      description:
        'Identity boundaries, least-privilege permissions, and clean deployment practices are built in from the first architectural sketch.',
    },
    {
      number: '04',
      title: 'Integration with existing systems',
      description:
        'Rather than forcing disruptive rip-and-replace projects, we connect Microsoft 365, APIs, and internal tools into a coherent flow.',
    },
    {
      number: '05',
      title: 'Maintainable and user-friendly applications',
      description:
        'Clear interfaces increase adoption while modular, documented codebases keep future updates straightforward.',
    },
    {
      number: '06',
      title: 'Clear communication and transparent scope',
      description:
        'Plain-language technical explanations, defined deliverables, and steady progress visibility from discovery through handoff.',
    },
  ],

  approachSteps: [
    {
      step: '01',
      name: 'Discover',
      summary: 'Understand business needs and challenges.',
      detail:
        'Review current workflows, system constraints, compliance needs, and team pain points to identify high-leverage opportunities.',
    },
    {
      step: '02',
      name: 'Design',
      summary: 'Define the right solution and implementation plan.',
      detail:
        'Map data flows, permissions, user interfaces, and phased delivery milestones so scope and trade-offs are clear before build.',
    },
    {
      step: '03',
      name: 'Build',
      summary: 'Develop, integrate, test, and refine.',
      detail:
        'Implement applications, automations, and integrations iteratively with realistic test data and structured review checkpoints.',
    },
    {
      step: '04',
      name: 'Improve',
      summary: 'Support adoption and identify opportunities for improvement.',
      detail:
        'Assist with rollout, documentation, and post-launch refinements as operational needs evolve.',
    },
  ],

  technologyEcosystem: [
    { id: 'microsoft365', name: 'Microsoft 365', category: 'Workplace & Productivity', icon: 'microsoft365' as TechIconKey },
    { id: 'sharepoint', name: 'SharePoint', category: 'Knowledge & Documents', icon: 'sharepoint' as TechIconKey },
    { id: 'powerapps', name: 'Power Apps', category: 'Low-Code Applications', icon: 'powerapps' as TechIconKey },
    { id: 'powerautomate', name: 'Power Automate', category: 'Workflow Automation', icon: 'powerautomate' as TechIconKey },
    { id: 'azure', name: 'Microsoft Azure', category: 'Cloud Infrastructure', icon: 'azure' as TechIconKey },
    { id: 'entraid', name: 'Microsoft Entra ID', category: 'Identity & Access', icon: 'entraid' as TechIconKey },
    { id: 'ai', name: 'AI Integrations', category: 'Intelligent Processing', icon: 'ai' as TechIconKey },
    { id: 'apis', name: 'APIs and Web Technologies', category: 'Custom Engineering', icon: 'apis' as TechIconKey },
    { id: 'analytics', name: 'Data Analytics & Dashboards', category: 'Reporting & Visibility', icon: 'analytics' as TechIconKey },
  ],

  solutions: [
    {
      id: 'intranets-workplaces',
      category: 'Digital Workplace',
      title: 'Employee intranets and digital workplaces',
      summary:
        'Unify announcements, policies, department workspaces, and operational resources inside a structured SharePoint and Microsoft 365 hub.',
      challengesSolved: [
        'Staff unsure where to find current HR policies, SOPs, or templates.',
        'Fragmented communication across email threads and unindexed shared drives.',
      ],
      architectureHighlights: [
        'Role-based SharePoint hub and department site hierarchy',
        'Managed metadata and document lifecycle governance',
        'Single sign-on via Microsoft Entra ID',
      ],
      relatedServiceIds: ['sharepoint-workplace', 'microsoft-365-cloud'],
    },
    {
      id: 'automated-approvals',
      category: 'Process Automation',
      title: 'Automated approvals and document workflows',
      summary:
        'Standardize intake forms, multi-step sign-offs, and document generation with reliable status tracking and audit records.',
      challengesSolved: [
        'Purchase, onboarding, or document sign-offs delayed in manual email chains.',
        'Missing audit visibility into who approved what and when.',
      ],
      architectureHighlights: [
        'Structured intake forms connected to Power Automate orchestration',
        'Automated reminders, escalation paths, and archival rules',
        'Centralized status tracking for requesters and managers',
      ],
      relatedServiceIds: ['power-platform', 'sharepoint-workplace'],
    },
    {
      id: 'ai-business-processes',
      category: 'Applied AI',
      title: 'AI-powered business processes',
      summary:
        'Embed document extraction, triage, and internal knowledge assistance directly into existing operational tools with human oversight.',
      challengesSolved: [
        'High manual effort classifying incoming requests, invoices, or reports.',
        'Difficulty searching across dense internal manuals and reference records.',
      ],
      architectureHighlights: [
        'Scoped AI service integrations behind secure API boundaries',
        'Structured JSON extraction feeding existing workflows or databases',
        'Human-in-the-loop review before downstream record updates',
      ],
      relatedServiceIds: ['ai-integration', 'custom-apps'],
    },
    {
      id: 'custom-internal-apps',
      category: 'Custom Engineering',
      title: 'Custom internal business applications',
      summary:
        'Build focused portals, scheduling tools, and line-of-business interfaces tailored to how your team actually operates.',
      challengesSolved: [
        'Complex spreadsheet trackers breaking as team size or data volume grows.',
        'Disconnected systems requiring duplicate manual data entry.',
      ],
      architectureHighlights: [
        'Responsive TypeScript web interfaces with clean role permissions',
        'REST API integrations connecting ERP, CRM, or cloud storage',
        'Portable cloud-ready deployment architecture',
      ],
      relatedServiceIds: ['custom-apps', 'web-experiences'],
    },
    {
      id: 'reporting-dashboards',
      category: 'Data & Visibility',
      title: 'Reporting and management dashboards',
      summary:
        'Consolidate operational metrics into clear, consistent dashboards so leadership and operations teams share one view of performance.',
      challengesSolved: [
        'Hours spent weekly compiling recurring operational spreadsheets.',
        'Delayed insight into workflow queues, capacity, or service delivery.',
      ],
      architectureHighlights: [
        'Automated data ingestion and normalization pipelines',
        'Role-tailored KPI views with consistent definitions',
        'Scheduled reporting exports for stakeholder reviews',
      ],
      relatedServiceIds: ['data-reporting', 'power-platform'],
    },
    {
      id: 'm365-modernization',
      category: 'Cloud Foundations',
      title: 'Microsoft 365 modernization',
      summary:
        'Reorganize legacy file servers, permissions, and collaboration habits into a governed, modern Microsoft 365 environment.',
      challengesSolved: [
        'Aging on-premises file shares with brittle permissions and VPN friction.',
        'Sprawl across Teams channels and unmonitored external links.',
      ],
      architectureHighlights: [
        'Structured content migration and permission cleanup',
        'Entra ID conditional access and identity alignment',
        'Practical governance standards and team adoption guidance',
      ],
      relatedServiceIds: ['microsoft-365-cloud', 'digital-transformation'],
    },
  ] as SolutionItem[],

  insights: [
    {
      id: 'practical-ai-workflows',
      slug: 'practical-ai-workflows-without-disruption',
      category: 'AI & Automation',
      statusLabel: 'Sample Article',
      readTime: '4 min read',
      title: 'Integrating AI Into Business Workflows Without Disrupting Core Operations',
      excerpt:
        'Why starting with structured document intake, triage, and human-reviewed drafts outperforms standalone AI experiments.',
      keyTakeaways: [
        'Anchor AI steps inside existing workflows rather than creating separate tools employees forget to open.',
        'Treat permissions, data residency, and verification checkpoints as design requirements from day one.',
        'Measure cycle-time reduction and error rates on one clear process before expanding scope.',
      ],
      bodyParagraphs: [
        'Many organizations want to evaluate AI but hesitate when proposals sound disconnected from daily operations. In practice, the most dependable early uses rarely require rebuilding core systems.',
        'Focused improvements—such as extracting structured fields from incoming PDFs, summarizing long service histories before a handoff, or routing support requests by topic—fit neatly into existing approval and Microsoft 365 workflows.',
        'Keeping a human review step before final record updates builds operational trust while steadily reducing manual preparation work.',
      ],
    },
    {
      id: 'sharepoint-architecture',
      slug: 'sharepoint-information-architecture-that-scales',
      category: 'Microsoft 365 & SharePoint',
      statusLabel: 'Sample Article',
      readTime: '5 min read',
      title: 'Designing SharePoint Information Architecture Teams Actually Maintain',
      excerpt:
        'Moving away from deep nested folders toward flat site structures, clear ownership, and sustainable permissions.',
      keyTakeaways: [
        'Flat hub-and-site structures adapt far better to organizational changes than rigid folder trees.',
        'Consistent metadata reduces duplicate copies and clarifies which document is authoritative.',
        'Assigning site owners and periodic access reviews prevents permission sprawl over time.',
      ],
      bodyParagraphs: [
        'When a digital workplace feels hard to search, the underlying cause is usually structure rather than software capability. Replicating legacy network-drive folder hierarchies directly into SharePoint often carries old friction into a new platform.',
        'A cleaner pattern pairs dedicated department or function sites with purposeful document libraries, lightweight metadata columns, and group-based permissions managed through Microsoft Entra ID.',
        'When staff can trust search results and understand where new files belong, intranet adoption happens naturally without constant reminders.',
      ],
    },
    {
      id: 'when-to-build-custom-apps',
      slug: 'when-spreadsheets-and-saas-reach-their-limit',
      category: 'Custom Applications',
      statusLabel: 'Sample Article',
      readTime: '4 min read',
      title: 'Recognizing When Spreadsheets and Off-the-Shelf Tools Hold Operations Back',
      excerpt:
        'A practical framework for deciding between Power Platform configuration, system integration, and custom web applications.',
      keyTakeaways: [
        'Not every workflow gap calls for custom software—Power Apps and Power Automate often cover internal forms cleanly.',
        'Custom web applications make sense when external users, complex integrations, or specialized interfaces are central.',
        'Designing around clean APIs protects your investment as connected tools evolve.',
      ],
      bodyParagraphs: [
        'Growing organizations routinely outgrow shared spreadsheets long before they feel ready for major enterprise software. Manual version reconciliation, broken formulas, and missing audit history quietly consume hours every week.',
        'Choosing the right response depends on audience, integration complexity, and lifecycle needs. Internal workflows tied closely to Microsoft 365 data often map well to Power Platform, while specialized portals or multi-system hubs benefit from custom TypeScript web applications.',
        'Evaluating total maintenance effort alongside initial build cost helps ensure the solution stays practical years after launch.',
      ],
    },
    {
      id: 'digital-modernization-roadmap',
      slug: 'sequencing-a-practical-modernization-roadmap',
      category: 'Digital Strategy',
      statusLabel: 'Draft Framework',
      readTime: '5 min read',
      title: 'Sequencing a Practical Digital Modernization Roadmap for Mid-Sized Teams',
      excerpt:
        'How to prioritize identity foundations, quick workflow wins, and long-term application modernization without overwhelming staff.',
      keyTakeaways: [
        'Stabilize identity, access hygiene, and core cloud storage before layering automation.',
        'Deliver visible, low-risk operational improvements early to build internal momentum.',
        'Document architecture decisions plainly so internal stakeholders retain full clarity.',
      ],
      bodyParagraphs: [
        'Digital transformation stalls when roadmaps try to change every system simultaneously. Teams end up managing overlapping migrations while still trying to serve customers.',
        'A phased sequence—starting with identity and information structure, followed by targeted workflow automation, and then custom integration or reporting—keeps operational risk low and makes each step easier to validate.',
        'Clear milestones and transparent scope allow leadership to adjust priorities as business conditions change.',
      ],
    },
  ] as InsightArticle[],

  finalCta: {
    heading: "Let's Build Something That Makes a Difference.",
    supportingText:
      'Have a business process to improve, an application to build, or an opportunity to put AI to work? Let’s discuss your goals.',
    buttonLabel: 'Start a Conversation',
    buttonPath: '/contact',
  },
};
