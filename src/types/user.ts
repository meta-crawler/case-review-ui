export interface ITeam {
  id: number;
  name: string;
  description: string;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  dateJoined: string;
  lastLogin: string;
  isAdmin: boolean;
  isStaff: boolean;
  isActive: boolean;
  isSuperuser: boolean;
  team: ITeam;
}
