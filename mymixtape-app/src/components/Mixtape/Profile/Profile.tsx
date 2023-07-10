import { getUserProfile } from "@/api/api";
import ProfileImage from "@/components/controls/Profile/ProfileImage";
import ProfileName from "@/components/controls/Profile/ProfileName";
import ProfileLayout from "@/components/layouts/ProfileLayout";
import { Profile } from "@/types/models";

export default async function Profile(props: ProfileProps) {
  const { sessionCookie } = props;

  const userProfile = await getUserProfile(sessionCookie);

  return (
    <ProfileLayout>
      <ProfileImage
        image={userProfile.data.images[0]?.url ?? ""}
        isLoading={false}
      />
      <ProfileName name={userProfile.data.name} isLoading={false} />
    </ProfileLayout>
  );
}

interface ProfileProps {
  sessionCookie: string;
}
