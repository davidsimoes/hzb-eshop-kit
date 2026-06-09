import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Mail, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
interface ExportDataProps {
  results: any;
  wizardData: any;
}
export const ExportData = ({
  results,
  wizardData
}: ExportDataProps) => {
  const { t } = useTranslation();
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('cs-CZ').format(Math.round(num));
  };
  const generatePDFData = () => {
    const data = {
      date: new Date().toLocaleDateString('cs-CZ'),
      goals: {
        desiredProfit: formatCurrency(wizardData.desiredProfit),
        isYearly: wizardData.isYearly
      },
      business: {
        aov: formatCurrency(wizardData.aov),
        cogs: formatCurrency(wizardData.cogs),
        extraCosts: formatCurrency(wizardData.extraCosts),
        grossMargin: results.grossMargin.toFixed(1) + '%'
      },
      marketing: {
        conversionRate: wizardData.conversionRate + '%',
        marketingCosts: formatCurrency(wizardData.marketingCosts)
      },
      results: {
        monthlyProfit: formatCurrency(results.monthlyProfit),
        yearlyProfit: formatCurrency(results.yearlyProfit),
        requiredOrders: formatNumber(results.requiredOrders),
        requiredVisitors: formatNumber(results.requiredVisitors),
        cac: results.requiredOrders > 0 && wizardData.marketingCosts > 0 ? formatCurrency(wizardData.marketingCosts / results.requiredOrders) : '-'
      }
    };
    return data;
  };
  const exportToPDF = () => {
    const data = generatePDFData();

    // Create a simple HTML content for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>E-shop Kalkulačka - Výsledky</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
          .header { text-align: center; margin-bottom: 30px; }
          .section { margin-bottom: 25px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
          .section h3 { color: #7c2d6e; margin-top: 0; }
          .row { display: flex; justify-content: space-between; margin: 10px 0; }
          .label { font-weight: bold; }
          .highlight { background-color: #f8f9fa; padding: 15px; border-radius: 5px; }
          .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🧮 E-shop Kalkulačka</h1>
          <h2>Tvůj plán k zisku</h2>
          <p>Vygenerováno: ${data.date}</p>
        </div>

        <div class="section">
          <h3>🎯 Tvůj cíl</h3>
          <div class="row">
            <span class="label">Požadovaný zisk:</span>
            <span>${data.goals.desiredProfit} ${data.goals.isYearly ? '(ročně)' : '(měsíčně)'}</span>
          </div>
        </div>

        <div class="section">
          <h3>🏪 Parametry e-shopu</h3>
          <div class="row">
            <span class="label">Průměrná objednávka (AOV):</span>
            <span>${data.business.aov}</span>
          </div>
          <div class="row">
            <span class="label">Náklady na zboží (COGS):</span>
            <span>${data.business.cogs}</span>
          </div>
          <div class="row">
            <span class="label">Další náklady:</span>
            <span>${data.business.extraCosts}</span>
          </div>
          <div class="row">
            <span class="label">Hrubá marže:</span>
            <span>${data.business.grossMargin}</span>
          </div>
        </div>

        <div class="section">
          <h3>📈 Marketing</h3>
          <div class="row">
            <span class="label">Konverzní sazba:</span>
            <span>${data.marketing.conversionRate}</span>
          </div>
          <div class="row">
            <span class="label">Marketingový rozpočet:</span>
            <span>${data.marketing.marketingCosts}</span>
          </div>
        </div>

        <div class="section highlight">
          <h3>✨ Tvoje výsledky</h3>
          <div class="row">
            <span class="label">Měsíční zisk:</span>
            <span><strong>${data.results.monthlyProfit}</strong></span>
          </div>
          <div class="row">
            <span class="label">Roční zisk:</span>
            <span><strong>${data.results.yearlyProfit}</strong></span>
          </div>
          <div class="row">
            <span class="label">Potřebné objednávky/měsíc:</span>
            <span><strong>${data.results.requiredOrders}</strong></span>
          </div>
          <div class="row">
            <span class="label">Potřební návštěvníci/měsíc:</span>
            <span><strong>${data.results.requiredVisitors}</strong></span>
          </div>
          <div class="row">
            <span class="label">CAC (náklady na zákazníka):</span>
            <span><strong>${data.results.cac}</strong></span>
          </div>
        </div>

        <div class="section">
          <h3>📋 Doporučené kroky</h3>
          <ol>
            <li>Nastav konverze v Google Analytics</li>
            <li>Spusť první marketingové kampaně podle rozpočtu</li>
            <li>Sleduj CAC první 2 týdny</li>
            <li>Optimalizuj nejlepší kampaně</li>
            <li>Postupně navyšuj úspěšné kanály</li>
          </ol>
        </div>

        <div class="footer">
          <p>Vytvořeno s ❤️ pro všechny, kdo chtějí uspět v e-commerce</p>
          <p>💡 Tip: Porovnávej tyto výsledky s realitou měsíc po měsíci</p>
        </div>
      </body>
      </html>
    `;

    // Create and download the file
    const blob = new Blob([htmlContent], {
      type: 'text/html'
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `e-shop-kalkulacka-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  const exportToCSV = () => {
    const data = generatePDFData();
    const csvContent = [['Kategorie', 'Položka', 'Hodnota'], ['Cíl', 'Požadovaný zisk', data.goals.desiredProfit], ['Cíl', 'Typ cíle', data.goals.isYearly ? 'Roční' : 'Měsíční'], ['E-shop', 'AOV', data.business.aov], ['E-shop', 'COGS', data.business.cogs], ['E-shop', 'Další náklady', data.business.extraCosts], ['E-shop', 'Hrubá marže', data.business.grossMargin], ['Marketing', 'Konverze', data.marketing.conversionRate], ['Marketing', 'Rozpočet', data.marketing.marketingCosts], ['Výsledky', 'Měsíční zisk', data.results.monthlyProfit], ['Výsledky', 'Roční zisk', data.results.yearlyProfit], ['Výsledky', 'Objednávky/měsíc', data.results.requiredOrders], ['Výsledky', 'Návštěvníci/měsíc', data.results.requiredVisitors], ['Výsledky', 'CAC', data.results.cac]].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `e-shop-kalkulacka-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  const shareViaEmail = () => {
    const data = generatePDFData();
    const subject = 'Moje e-shop kalkulačka - výsledky';
    const body = `Ahoj!

Právě jsem si spočítal/a plán pro můj e-shop a chtěl/a bych se podělit o výsledky:

🎯 MŮJ CÍL:
${data.goals.desiredProfit} ${data.goals.isYearly ? '(ročně)' : '(měsíčně)'}

🏪 PARAMETRY E-SHOPU:
• AOV: ${data.business.aov}
• COGS: ${data.business.cogs}
• Marže: ${data.business.grossMargin}

📈 MARKETING:
• Konverze: ${data.marketing.conversionRate}
• Rozpočet: ${data.marketing.marketingCosts}

✨ VÝSLEDKY:
• Potřebuji ${data.results.requiredOrders} objednávek měsíčně
• To znamená ${data.results.requiredVisitors} návštěvníků měsíčně
• CAC by měl být ${data.results.cac}

Co myslíš o těchto číslech?

--
Vygenerováno: ${data.date}
`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };
  const addToCalendar = () => {
    const now = new Date();
    const reviewDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

    const title = 'Přehodnocení e-shop plánu';
    const details = `Čas na kontrolu pokroku podle plánu z kalkulačky:

Cíl: ${formatCurrency(wizardData.desiredProfit)} ${wizardData.isYearly ? '(ročně)' : '(měsíčně)'}
Potřebné objednávky: ${formatNumber(results.requiredOrders)}/měsíc

Otázky k zamyšlení:
- Jak se daří plnit plán?
- Jaká je skutečná konverze?
- Jaký je skutečný CAC?
- Co funguje nejlépe?
- Co je třeba změnit?
`;
    const startDate = reviewDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endDate = new Date(reviewDate.getTime() + 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}`;
    window.open(googleCalendarUrl, '_blank');
  };
  return (
    <Card className="border-2 border-dashed border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          {t('calculator.export.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button 
            onClick={exportToPDF}
            variant="outline" 
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            {t('calculator.export.downloadHtml')}
          </Button>
          <Button 
            onClick={exportToCSV}
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {t('calculator.export.downloadCsv')}
          </Button>
          <Button 
            onClick={shareViaEmail}
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            {t('calculator.export.sendEmail')}
          </Button>
          <Button 
            onClick={addToCalendar}
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            {t('calculator.export.addCalendar')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};