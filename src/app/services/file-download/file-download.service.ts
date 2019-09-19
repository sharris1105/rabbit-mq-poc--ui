import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {
  private readonly fileType = 'text/plain;charset=utf-8';

  constructor() { }

  downloadErrorLog(e: Error): void {
    const blob = new Blob([e.message, e.stack], { type: this.fileType });
    saveAs(blob, this.getErrorLogFileName());
  }

  private getErrorLogFileName(): string {
    const now = new Date();

    return `Error_Log_${now.toISOString()}.txt`;
  }
}
