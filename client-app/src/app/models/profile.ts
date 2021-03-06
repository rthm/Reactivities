export interface IProfile {
  userName: string;
  image: string;
  displayName: string;
  bio?: string;
  following: boolean;
  followersCount: number;
  followingCount: number;
  photos: IPhoto[];
}

export interface IProfileFormValues extends Partial<IProfile> {}

export interface IPhoto {
  id: string;
  url: string;
  isMain: boolean;
}

export class ProfileFormValues implements IProfileFormValues {
  displayName?: string;
  bio?: string;
  constructor(init?: IProfileFormValues) {
    if (init && init.displayName) {
      if (init.displayName) {
        this.displayName = init.displayName;
      }
      if (init.bio) {
        this.bio = init.bio;
      }
    }
    Object.assign(this, init);
  }
}

export interface IUserActivity {
  id: string;
  title: string;
  category: string;
  date: Date;
}