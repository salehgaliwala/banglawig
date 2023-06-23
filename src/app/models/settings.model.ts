export interface SettingsRes {
  success: boolean;
  data: Setting[];
  message: string;
}

export interface Setting {
  key: string;
  value: any;
}
