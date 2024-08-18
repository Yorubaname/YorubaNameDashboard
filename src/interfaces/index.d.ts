export interface ICategory {
  id: number;
  title: string;
}
export interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
}

export interface INameEntries {
  name: string;
  meaning: string;
}

export interface IUser {
  email: string;
  username: string;
  role: string[];
}

export interface IMetaData {
  totalNames: number;
  totalNewNames: number;
  totalModifiedNames: number;
  totalPublishedNames: number;
}
