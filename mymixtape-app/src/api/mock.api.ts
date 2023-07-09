import { Playlist } from "@/types/models";

const getMockPlaylists = (): Playlist[] => {
  const defaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
  const defaultName = "test playlist";

  let playlists: Playlist[] = [];
  for (let i = 0; i < 5; i++) {
    playlists.push({
      id: i.toString(),
      name: defaultName,
      images: [
        {
          url: defaultImage,
          height: 0,
          width: 0,
        },
      ],
    });
  }

  return playlists;
};

const mockApi = {
  mockGetAuthorizationUrl: {
    data: {
      url: "",
      valid_token: false,
    },
  },
  mockGetAccessToken: {
    data: {
      token: "Test",
      expires_in: 3600,
    },
  },
  mockGetUserProfile: {
    data: {
      id: "0",
      name: "test user",
      images: [
        {
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png",
          height: 0,
          width: 0,
        },
      ],
    },
  },
  mockGetUserPlaylists: {
    data: {
      href: "test",
      limit: 0,
      next: "test",
      offset: 0,
      previous: "test",
      total: 0,
      items: getMockPlaylists(),
    },
  },
  mockCombinePlaylists: {
    data: {
      id: "0",
      name: "test",
    },
  },
  mockGetSession: {
    data: {
      count: 0,
    },
  },
};

export default mockApi;
