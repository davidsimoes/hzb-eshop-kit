import { useState } from 'react';
import { Download, Upload, AlertTriangle, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ChecklistProgress } from '@/hooks/useChecklist';
import { useToast } from '@/hooks/use-toast';

interface BackupRestoreProps {
  progress: ChecklistProgress;
  onRestore: (progress: ChecklistProgress) => void;
}

export const BackupRestore = ({ progress, onRestore }: BackupRestoreProps) => {
  const [isRestoring, setIsRestoring] = useState(false);
  const { t } = useTranslation();
  const { toast } = useToast();

  const exportProgress = () => {
    try {
      const backup = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        progress,
        metadata: {
          totalTasks: Object.keys(progress).length,
          completedTasks: Object.values(progress).filter(p => p.completed).length
        }
      };

      const dataStr = JSON.stringify(backup, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `checklist-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: t('checklist.backup.exportSuccess'),
        description: t('checklist.backup.exportSuccessDesc'),
      });
    } catch (error) {
      toast({
        title: t('checklist.backup.exportError'),
        description: t('checklist.backup.exportErrorDesc'),
        variant: 'destructive'
      });
    }
  };

  const importProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsRestoring(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const result = e.target?.result as string;
        const backup = JSON.parse(result);
        
        // Validate backup structure
        if (!backup.progress || typeof backup.progress !== 'object') {
          throw new Error('Invalid backup format');
        }

        // Convert date strings back to Date objects
        const restoredProgress: ChecklistProgress = {};
        Object.entries(backup.progress).forEach(([key, value]: [string, any]) => {
          restoredProgress[key] = {
            ...value,
            completedAt: value.completedAt ? new Date(value.completedAt) : undefined
          };
        });

        onRestore(restoredProgress);
        
        toast({
          title: t('checklist.backup.importSuccess'),
          description: t('checklist.backup.importSuccessDesc'),
        });
      } catch (error) {
        toast({
          title: t('checklist.backup.importError'),
          description: t('checklist.backup.importErrorDesc'),
          variant: 'destructive'
        });
      } finally {
        setIsRestoring(false);
        // Reset file input
        event.target.value = '';
      }
    };

    reader.readAsText(file);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          {t('checklist.backup.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertTriangle className="w-4 h-4" />
          <AlertDescription>
            {t('checklist.backup.warning')}
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">{t('checklist.backup.export.title')}</h4>
            <p className="text-sm text-muted-foreground">
              {t('checklist.backup.export.description')}
            </p>
            <Button onClick={exportProgress} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              {t('checklist.backup.export.button')}
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">{t('checklist.backup.import.title')}</h4>
            <p className="text-sm text-muted-foreground">
              {t('checklist.backup.import.description')}
            </p>
            <div className="relative">
              <input
                type="file"
                accept=".json"
                onChange={importProgress}
                disabled={isRestoring}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
              <Button variant="outline" className="w-full" disabled={isRestoring}>
                <Upload className="w-4 h-4 mr-2" />
                {isRestoring ? t('checklist.backup.importing') : t('checklist.backup.import.button')}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};