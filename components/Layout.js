import NavBar from "./NavBar";
export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div>{children}</div> {/* index component, about component */}
    </>
  );
}
