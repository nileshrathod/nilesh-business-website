import {
  BarChart3,
  Bot,
  Cloud,
  Code2,
  Compass,
  Cpu,
  Database,
  FolderKanban,
  Globe,
  Layers,
  Lock,
  Network,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { ServiceIconKey, TechIconKey } from '../config/siteConfig';

export function ServiceIcon({ icon, className = 'h-5 w-5' }: { icon: ServiceIconKey; className?: string }) {
  switch (icon) {
    case 'sparkles':
      return <Sparkles className={className} aria-hidden="true" />;
    case 'cloud':
      return <Cloud className={className} aria-hidden="true" />;
    case 'folder':
      return <FolderKanban className={className} aria-hidden="true" />;
    case 'workflow':
      return <Workflow className={className} aria-hidden="true" />;
    case 'code':
      return <Code2 className={className} aria-hidden="true" />;
    case 'globe':
      return <Globe className={className} aria-hidden="true" />;
    case 'chart':
      return <BarChart3 className={className} aria-hidden="true" />;
    case 'compass':
      return <Compass className={className} aria-hidden="true" />;
  }
}

export function TechIcon({ icon, className = 'h-5 w-5' }: { icon: TechIconKey; className?: string }) {
  switch (icon) {
    case 'microsoft365':
      return <Layers className={className} aria-hidden="true" />;
    case 'sharepoint':
      return <FolderKanban className={className} aria-hidden="true" />;
    case 'powerapps':
      return <Cpu className={className} aria-hidden="true" />;
    case 'powerautomate':
      return <Workflow className={className} aria-hidden="true" />;
    case 'azure':
      return <Cloud className={className} aria-hidden="true" />;
    case 'entraid':
      return <Lock className={className} aria-hidden="true" />;
    case 'ai':
      return <Bot className={className} aria-hidden="true" />;
    case 'apis':
      return <Network className={className} aria-hidden="true" />;
    case 'analytics':
      return <Database className={className} aria-hidden="true" />;
  }
}

export { ShieldCheck };
