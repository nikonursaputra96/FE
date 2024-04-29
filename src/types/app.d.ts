export interface IThread {
    id? : number
    content? : string
    image? : IThreadImage[]
    userId : number
    threadId? : number
    author? : IUser
    createdAt : string
    like? : boolean | any
}



  

interface IThreadImage {
    image? : string
}

export interface IUser {
    id: number
    username: string
    fullname: string
    email: string
    profile: IProfile
    follower: []
    following: []
    _count : {
        follower: number
        following:number
    }
}

export interface IProfile {
    bio? : string
    avatar? : string
    cover? :string
    user: IUser
}


















interface UserProfileResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    userId: number;
    avatar: string;
    bio: string;
    cover: string;
    user: {
      threads: Thread[];
      username: string;
      fullname: string;
      like: any[];
      profile: UserProfile;
      _count : {
        follower: number
        following:number
    }
    };
  };
}

interface Thread {
  createdAt: string;
  content: string;
  image: any[];
  like: any[]; 
  replies: Reply[]; 
  _count: {
    replies: number;
  };
}

interface Reply {
  id: number;
  content: string;
  userId: number;
  threadId: number;
  createdAt: string;
  updatedAt: string;
}

interface UserProfile {
  avatar: string;
  cover: string;
}

interface ThreadItem {
  id: number;
  content: string;
  userId: number;
  threadId: number | null;
  createdAt: string;
  updatedAt: string;
  image: ThreadImage[];
  author: ThreadAuthor;
  _count: {
    replies: number;
  };
}

interface ThreadAuthor {
  id: number;
  username: string;
  fullname: string;
  profile: {
    avatar: string;
  };
}

interface ThreadImage {
  image: string;
}


