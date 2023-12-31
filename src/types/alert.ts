export interface IAlertType {
  id: number;
  name: string;
  description: string;
}

export interface IAlert {
  id: number;
  zone: string;
  camera: string;
  alertType: IAlertType;
  createdAt: string;
  updatedAt: string;
}
