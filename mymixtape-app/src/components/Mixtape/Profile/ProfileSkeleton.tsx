import ProfileImage from "@/components/controls/Profile/ProfileImage";
import ProfileName from "@/components/controls/Profile/ProfileName";
import ProfileLayout from "@/components/layouts/ProfileLayout";

export default function ProfileSkeleton() {
  return (
    <ProfileLayout>
      <ProfileImage image={""} isLoading={false} isSkeleton={true} />
      <ProfileName name={""} isLoading={false} isSkeleton={true} />
    </ProfileLayout>
  );
}
