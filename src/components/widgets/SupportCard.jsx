import React from 'react';
import { SettingsCard } from './SettingsCard';
import { Button } from '../ui/Button';
import { HelpCircle, ExternalLink, LifeBuoy, FileText, Info } from 'lucide-react';

export const SupportCard = ({ onAction }) => {
  return (
    <SettingsCard
      title="Support & Documentation"
      subtitle="Access guidelines, policies, and support staff"
      icon={HelpCircle}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onAction('Help Center')}
          className="justify-start py-3 cursor-pointer"
        >
          <LifeBuoy className="w-4 h-4 mr-2 text-gold-400" />
          Help Center
          <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onAction('Contact Support')}
          className="justify-start py-3 cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 mr-2 text-gold-400" />
          Contact Support
          <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onAction('Privacy Policy')}
          className="justify-start py-3 cursor-pointer"
        >
          <FileText className="w-4 h-4 mr-2 text-gold-400" />
          Privacy Policy
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onAction('Terms & Conditions')}
          className="justify-start py-3 cursor-pointer"
        >
          <FileText className="w-4 h-4 mr-2 text-gold-400" />
          Terms & Conditions
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onAction('About Geomancy Solutions')}
          className="justify-start py-3 cursor-pointer sm:col-span-2 lg:col-span-1"
        >
          <Info className="w-4 h-4 mr-2 text-gold-400" />
          About Geomancy Solutions
        </Button>
      </div>
    </SettingsCard>
  );
};