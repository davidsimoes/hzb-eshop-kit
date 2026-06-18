import { ReactNode, useState, useId } from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
  content: string;
  children?: ReactNode;
}

export const Tooltip = ({ content, children }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();

  return (
    <span className="relative inline-block">
      <button
        type="button"
        className="cursor-help bg-transparent border-0 p-0 inline-flex items-center align-middle focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-wine focus-visible:ring-offset-1 rounded"
        aria-label={children ? undefined : 'Více informací'}
        aria-describedby={isVisible ? tooltipId : undefined}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        onClick={() => setIsVisible((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setIsVisible(false);
        }}
      >
        {children || (
          <Info
            className="w-4 h-4 text-brand-wine/70 hover:text-brand-wine transition-colors"
            aria-hidden="true"
          />
        )}
      </button>

      {isVisible && (
        <span
          role="tooltip"
          id={tooltipId}
          className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-brand-wine text-white text-sm rounded-lg shadow-lg max-w-xs text-center whitespace-normal"
        >
          <span className="absolute top-full left-1/2 transform -translate-x-1/2">
            <span className="block w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-brand-wine"></span>
          </span>
          {content}
        </span>
      )}
    </span>
  );
};
