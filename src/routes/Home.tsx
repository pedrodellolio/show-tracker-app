import useAuth from "../hooks/useAuth";

function Home() {
  const { user } = useAuth();
  return (
    <>
      <p>Olá, {user?.email}</p>
    </>
  );
}

export default Home;
