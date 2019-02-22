// API Audit
export interface IAudit {
  url: string;
  saveInDB?: boolean;
  mobile?: '1' | '0';
  fvonly?: '1' | '0';
}
