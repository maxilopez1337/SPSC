
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { storage } from './storage';
import { CertFieldConfig, ExamResult } from '../types';

/**
 * Funkcja pomocnicza zamieniająca imię i nazwisko na Dopełniacz (Genitive).
 */
const getGenitiveName = (firstName: string, lastName: string): string => {
    const f = firstName.trim();
    const l = lastName.trim();
    const isFemale = f.endsWith('a') && !['Kuba', 'Barnaba', 'Bonawentura', 'Jarema'].includes(f);

    let genFirst = f;
    const maleExceptions: Record<string, string> = {
        'Marek': 'Marka', 'Paweł': 'Pawła', 'Piotr': 'Piotra', 'Jacek': 'Jacka', 
        'Radek': 'Radka', 'Kacper': 'Kacpra', 'Arek': 'Arka', 'Tomek': 'Tomka',
        'Bartek': 'Bartka', 'Wojtek': 'Wojtka', 'Przemek': 'Przemka', 'Michał': 'Michała',
        'Krzysztof': 'Krzysztofa', 'Mateusz': 'Mateusza', 'Łukasz': 'Łukasza', 
        'Aleksander': 'Aleksandra', 'Filip': 'Filipa'
    };

    if (isFemale) {
        if (f.endsWith('ia')) genFirst = f.slice(0, -1) + 'ii';
        else if (f.endsWith('ja')) genFirst = f.slice(0, -1) + 'ji';
        else if (f.endsWith('a')) genFirst = f.slice(0, -1) + 'y';
    } else {
        if (maleExceptions[f]) genFirst = maleExceptions[f];
        else if (!f.endsWith('a')) genFirst = f + 'a';
    }

    let genLast = l;
    if (isFemale) {
        if (l.endsWith('ska') || l.endsWith('cka') || l.endsWith('dzka')) genLast = l.slice(0, -1) + 'iej';
        else if (l.endsWith('owa')) genLast = l.slice(0, -1) + 'ej';
    } else {
        if (l.endsWith('ski') || l.endsWith('cki') || l.endsWith('dzki')) genLast = l.slice(0, -1) + 'iego';
        else if (l.endsWith('y')) genLast = l.slice(0, -1) + 'ego';
        else if (!l.endsWith('a') && !l.endsWith('e') && !l.endsWith('i') && !l.endsWith('o')) genLast = l + 'a';
    }

    return `${genFirst} ${genLast}`;
};

export const pdfService = {
  /**
   * Tworzy element HTML szablonu.
   */
  createTemplate(userData: { firstName: string, lastName: string, hierarchicalId: string }, date: string): HTMLElement {
    const templateData = storage.getCertTemplate();
    const layout = storage.getCertLayout();
    
    const div = document.createElement('div');
    div.style.width = '297mm';
    div.style.height = '210mm';
    div.style.padding = '0';
    div.style.margin = '0';
    div.style.position = 'fixed';
    div.style.top = '-10000px';
    div.style.left = '-10000px';
    div.style.boxSizing = 'border-box';
    div.style.backgroundColor = '#ffffff';

    const getStyle = (config: CertFieldConfig) => `
        position: absolute;
        top: ${config.y}%;
        left: ${config.x}%;
        transform: ${config.align === 'center' ? 'translateX(-50%)' : 'none'};
        font-family: '${config.fontFamily}', sans-serif;
        font-weight: ${config.fontWeight};
        font-size: ${config.fontSize}px;
        color: ${config.color};
        text-align: ${config.align};
        white-space: nowrap;
        z-index: 10;
        display: ${config.visible ? 'block' : 'none'};
        text-transform: uppercase;
    `;

    const holoConf = layout.hologram;
    const holoStyle = `
        position: absolute; 
        top: ${holoConf.y}%; 
        left: ${holoConf.x}%; 
        width: ${holoConf.fontSize}px; 
        height: ${holoConf.fontSize}px; 
        z-index: 20;
        transform: translate(-50%, -50%);
        display: ${holoConf.visible ? 'block' : 'none'};
    `;

    const hologramHtml = `
      <div style="${holoStyle}">
        <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.3));">
          <defs>
            <linearGradient id="sealGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#F8E488;stop-opacity:1" />
              <stop offset="30%" style="stop-color:#C89932;stop-opacity:1" />
              <stop offset="60%" style="stop-color:#FDF4BA;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#B07D16;stop-opacity:1" />
            </linearGradient>
             <radialGradient id="innerGoldGrad" cx="50%" cy="50%" r="50%">
               <stop offset="60%" style="stop-color:#E9C55C;stop-opacity:1" />
               <stop offset="100%" style="stop-color:#B38525;stop-opacity:1" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="95" fill="url(#sealGoldGrad)" stroke="#8A6208" stroke-width="1" />
          <circle cx="100" cy="100" r="95" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-dasharray="2,5" opacity="0.4" />
          <circle cx="100" cy="100" r="75" fill="url(#innerGoldGrad)" stroke="#B07D16" stroke-width="1" />
          <circle cx="100" cy="100" r="72" fill="none" stroke="#FFFFFF" stroke-width="0.5" opacity="0.6" />
          <path d="M 50,130 Q 30,100 50,70" stroke="#FDF4BA" stroke-width="3" fill="none" stroke-linecap="round" />
          <path d="M 50,130 L 45,120 M 50,120 L 40,110 M 50,110 L 40,100 M 50,100 L 42,90 M 50,90 L 45,80" stroke="#FDF4BA" stroke-width="2" fill="none" />
          <path d="M 150,130 Q 170,100 150,70" stroke="#FDF4BA" stroke-width="3" fill="none" stroke-linecap="round" />
          <path d="M 150,130 L 155,120 M 150,120 L 160,110 M 150,110 L 160,100 M 150,100 L 158,90 M 150,90 L 155,80" stroke="#FDF4BA" stroke-width="2" fill="none" />
          <path id="curveTop" d="M 35,100 A 65,65 0 1,1 165,100" fill="none" />
          <text font-size="14" font-weight="900" fill="#422900" font-family="Montserrat, sans-serif" letter-spacing="2">
            <textPath href="#curveTop" startOffset="50%" text-anchor="middle">STRATTON PRIME</textPath>
          </text>
          <text x="100" y="115" text-anchor="middle" font-size="10" font-weight="bold" fill="#422900" font-family="Montserrat, sans-serif" letter-spacing="1">OFFICIAL</text>
          <text x="100" y="128" text-anchor="middle" font-size="9" font-weight="bold" fill="#422900" font-family="Montserrat, sans-serif" letter-spacing="1">CERTIFIED</text>
          <path d="M 100,75 L 105,88 L 118,88 L 108,96 L 112,108 L 100,100 L 88,108 L 92,96 L 82,88 L 95,88 Z" fill="#FFFFFF" stroke="#B07D16" stroke-width="1" transform="translate(0, -5)" />
        </svg>
      </div>
    `;

    if (templateData && templateData.base64) {
        div.style.backgroundImage = `url('${templateData.base64}')`;
        div.style.backgroundSize = 'cover';
        div.style.backgroundPosition = 'center';
        div.style.backgroundRepeat = 'no-repeat';
        
        div.innerHTML = `
          <div style="position: relative; width: 100%; height: 100%;">
            <div style="${getStyle(layout.fullName)}">${userData.firstName} ${userData.lastName}</div>
            <div style="${getStyle(layout.hierarchicalId)}">ID: ${userData.hierarchicalId}</div>
            <div style="${getStyle(layout.date)}">${date}</div>
            ${hologramHtml}
          </div>
        `;
    } else {
        const declinedFullName = getGenitiveName(userData.firstName, userData.lastName);
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.border = '20px solid #002147';
        div.innerHTML = `
          <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px; position: relative; font-family: 'Montserrat', sans-serif;">
            <div style="color: #002147; font-size: 64px; font-weight: 800; margin-bottom: 10px; letter-spacing: 4px;">CERTYFIKAT</div>
            <div style="color: #C5A059; font-size: 24px; font-weight: 600; margin-bottom: 60px; text-transform: uppercase; letter-spacing: 2px;">Doradca Biznesowy</div>
            <div style="color: #605E5C; font-size: 18px; margin-bottom: 20px;">Przyznany dla:</div>
            <div style="color: #002147; font-size: 56px; font-weight: 800; text-transform: uppercase; margin-bottom: 15px; border-bottom: 2px solid #C5A059; padding-bottom: 10px; min-width: 600px;">
              ${declinedFullName}
            </div>
            <div style="color: #002147; font-size: 20px; font-weight: 600; margin-bottom: 40px; letter-spacing: 2px;">ID: ${userData.hierarchicalId}</div>
            <div style="position: absolute; bottom: 50px; left: 60px; text-align: left;">
                <div style="font-size: 12px; color: #888;">Data:</div>
                <div style="font-size: 16px; font-weight: bold; color: #002147;">${date}</div>
            </div>
            ${hologramHtml}
          </div>
        `;
    }

    document.body.appendChild(div);
    return div;
  },

  async generateCertificate(userData: { firstName: string, lastName: string, hierarchicalId: string }, date: string) {
    try {
        const template = this.createTemplate(userData, date);
        // ZWIĘKSZONA SKALA DLA WYSOKIEJ JAKOŚCI (4x)
        const canvas = await html2canvas(template, { 
            scale: 4, 
            useCORS: true, 
            logging: false, 
            allowTaint: true, 
            backgroundColor: null 
        });
        const imgData = canvas.toDataURL('image/png', 1.0); // Maximum quality
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
        
        // Generowanie profesjonalnej nazwy pliku: Imię_Nazwisko_Certyfikat_Ekspercki_Stratton_Prime_[DATA].pdf
        const safeName = `${userData.firstName}_${userData.lastName}`.replace(/ /g, '_');
        const fileName = `${safeName}_Certyfikat_Ekspercki_Stratton_Prime_${date.replace(/\./g, '-')}.pdf`;
        
        pdf.save(fileName);
        document.body.removeChild(template);
    } catch (e) {
        console.error("Błąd generowania PDF:", e);
        alert("Wystąpił błąd podczas generowania certyfikatu.");
    }
  },

  async previewCertificate(userData: { firstName: string, lastName: string, hierarchicalId: string }, date: string) {
    try {
        const template = this.createTemplate(userData, date);
        // PODGLĄD RÓWNIEŻ W WYSOKIEJ JAKOŚCI
        const canvas = await html2canvas(template, { scale: 3, useCORS: true, logging: false, allowTaint: true, backgroundColor: null });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
        window.open(pdf.output('bloburl'), '_blank');
        document.body.removeChild(template);
    } catch (e) { console.error(e); }
  },

  async getCertificateDataUri(userData: { firstName: string, lastName: string, hierarchicalId: string }, date: string): Promise<string> {
    const template = this.createTemplate(userData, date);
    const canvas = await html2canvas(template, { scale: 2, useCORS: true, logging: false, allowTaint: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
    const dataUri = pdf.output('datauristring');
    document.body.removeChild(template);
    return dataUri;
  },

  async generateAuditReport(result: ExamResult) {
      this.generateHtmlReport(result, "RAPORT DOWODOWY", `Raport_Dowodowy_${result.hierarchicalId}.pdf`);
  },

  /**
   * Generuje Raport Błędów dla uczestnika (tylko błędne odpowiedzi).
   */
  async generateMistakesReport(result: ExamResult) {
      if (!result.answersLog) return;
      const incorrect = result.answersLog.filter(x => !x.isCorrect);
      
      if (incorrect.length === 0) {
          alert("Gratulacje! Brak błędów do raportowania.");
          return;
      }

      const reportData = {
          ...result,
          answersLog: incorrect
      };
      this.generateHtmlReport(reportData, "ANALIZA BŁĘDÓW EGZAMINACYJNYCH", `Raport_Bledow_${result.hierarchicalId}.pdf`, true);
  },

  /**
   * Uniwersalny generator raportów z HTML do PDF.
   */
  async generateHtmlReport(result: ExamResult, title: string, filename: string, isUserReport = false) {
      if (!result.answersLog || result.answersLog.length === 0) {
          alert("Brak danych do wygenerowania raportu.");
          return;
      }

      const div = document.createElement('div');
      div.style.width = '210mm';
      div.style.minHeight = '297mm';
      div.style.padding = '15mm';
      div.style.backgroundColor = '#ffffff';
      div.style.position = 'absolute';
      div.style.top = '-10000px';
      div.style.left = '-10000px';
      div.style.fontFamily = "'Montserrat', sans-serif";
      div.style.boxSizing = 'border-box';
      div.style.color = '#002147';

      div.innerHTML = `
        <div style="border-bottom: 2px solid #002147; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-end;">
            <div>
                <h1 style="margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase; color: #002147;">${title}</h1>
                <p style="margin: 5px 0 0; font-size: 10px; text-transform: uppercase; color: #C5A059; letter-spacing: 2px;">Stratton Prime Certification System</p>
            </div>
            <div style="text-align: right;">
                <p style="margin: 0; font-size: 12px; font-weight: bold;">Uczestnik: ${result.userName}</p>
                <p style="margin: 0; font-size: 12px;">Data: ${result.date}</p>
            </div>
        </div>

        <div style="background: ${result.passed ? '#f0fdf4' : '#fef2f2'}; padding: 15px; border-left: 5px solid ${result.passed ? '#107c10' : '#a80000'}; margin-bottom: 30px;">
            <p style="margin:0; font-size: 14px; font-weight:bold;">Wynik Egzaminu: ${result.score}% (${result.passed ? 'POZYTYWNY' : 'NEGATYWNY'})</p>
            ${isUserReport ? `<p style="margin:5px 0 0; font-size: 11px;">Poniższy raport zawiera wyłącznie pytania, na które udzielono błędnej odpowiedzi.</p>` : ''}
        </div>

        <h3 style="font-size: 14px; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 10px; margin-bottom: 15px;">
            ${isUserReport ? 'Wykaz Błędnych Odpowiedzi' : 'Pełny Log Odpowiedzi'}
        </h3>

        <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
            <thead>
                <tr style="background-color: #002147; color: white; text-transform: uppercase;">
                    <th style="padding: 8px; text-align: left; width: 30px;">#</th>
                    <th style="padding: 8px; text-align: left;">Pytanie</th>
                    <th style="padding: 8px; text-align: left; width: 25%;">Odpowiedź Udzielona</th>
                    <th style="padding: 8px; text-align: left; width: 25%;">Poprawna Odpowiedź</th>
                </tr>
            </thead>
            <tbody>
                ${result.answersLog.map((log, index) => `
                    <tr style="border-bottom: 1px solid #EDEBE9; background-color: ${index % 2 === 0 ? '#fff' : '#faf9f8'};">
                        <td style="padding: 8px; font-weight: bold;">${index + 1}</td>
                        <td style="padding: 8px; color: #323130;">${log.questionText}</td>
                        <td style="padding: 8px; color: ${log.isCorrect ? '#107c10' : '#a80000'}; font-weight: bold;">${log.userAnswer}</td>
                        <td style="padding: 8px; color: #323130;">${log.correctAnswer}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
      `;

      document.body.appendChild(div);
      try {
          const canvas = await html2canvas(div, { scale: 2 });
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(filename);
      } catch (err) {
          console.error("PDF Error", err);
          alert("Błąd generowania pliku PDF.");
      } finally {
          document.body.removeChild(div);
      }
  },

  /**
   * Generuje Rejestr Egzaminów (Cała tabela) dla Admina w PDF.
   */
  async generateExamRegistryPDF(results: ExamResult[]) {
      const div = document.createElement('div');
      div.style.width = '297mm'; // Landscape
      div.style.minHeight = '210mm';
      div.style.padding = '10mm';
      div.style.backgroundColor = '#fff';
      div.style.position = 'absolute';
      div.style.top = '-10000px';
      div.style.fontFamily = "'Montserrat', sans-serif";

      div.innerHTML = `
        <h1 style="color: #002147; font-size: 24px; text-transform: uppercase; border-bottom: 2px solid #C5A059; padding-bottom: 10px; margin-bottom: 20px;">Rejestr Egzaminów Stratton Prime</h1>
        <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
            <thead style="background-color: #002147; color: white;">
                <tr>
                    <th style="padding: 8px;">Data</th>
                    <th style="padding: 8px;">Imię i Nazwisko</th>
                    <th style="padding: 8px;">ID</th>
                    <th style="padding: 8px;">Email</th>
                    <th style="padding: 8px;">Przełożony</th>
                    <th style="padding: 8px;">Wynik</th>
                    <th style="padding: 8px;">Status</th>
                </tr>
            </thead>
            <tbody>
                ${results.map((r, i) => `
                    <tr style="background-color: ${i % 2 === 0 ? '#fff' : '#f3f2f1'}; border-bottom: 1px solid #ddd;">
                        <td style="padding: 6px;">${r.date}</td>
                        <td style="padding: 6px;"><b>${r.userName}</b></td>
                        <td style="padding: 6px;">${r.hierarchicalId}</td>
                        <td style="padding: 6px;">${r.email}</td>
                        <td style="padding: 6px;">${r.managerName || '-'}</td>
                        <td style="padding: 6px; font-weight: bold;">${r.score}%</td>
                        <td style="padding: 6px; color: ${r.passed ? 'green' : 'red'}; font-weight: bold;">${r.passed ? 'POZYTYWNY' : 'NEGATYWNY'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
      `;

      document.body.appendChild(div);
      try {
          const canvas = await html2canvas(div, { scale: 2 });
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`Rejestr_Egzaminow_${new Date().toLocaleDateString().replace(/\./g, '-')}.pdf`);
      } catch (e) {
          console.error(e);
          alert('Błąd generowania rejestru PDF.');
      } finally {
          document.body.removeChild(div);
      }
  }
};
