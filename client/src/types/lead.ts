export interface Lead {
  _id: string;

  name: string;

  email: string;

  company: string;

  status: string;

  source: string;

  notes?: string;

  createdAt: string;
}