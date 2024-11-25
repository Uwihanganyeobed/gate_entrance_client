// src/types/react-qr-scanner.d.ts
declare module "react-qr-scanner" {
  import { ComponentType } from "react";

  interface QrScannerProps {
    delay?: number;
    onError?: (error: any) => void;
    onScan?: (data: string | null) => void;
    style?: React.CSSProperties;
  }

  const QrScanner: ComponentType<QrScannerProps>;

  export default QrScanner;
}
