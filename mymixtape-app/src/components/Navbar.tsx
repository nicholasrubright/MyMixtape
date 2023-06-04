import ProfileButton from "./ProfileButton";

export default function Navbar() {
  const profile = {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png",
    name: "Test",
  };

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="d-flex">
          <ProfileButton name={profile.name} image={profile.image} />
        </div>
      </div>
    </nav>
  );
}
