import { useRouter } from "next/router";
import Layout from "./../../components/layout";
import Title from "./../../components/title";

export default function User({ user }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>CARGANDO...</div>;
  }

  return (
    <Layout>
      <Title>User ID {user.id}</Title>
      <div className="card">
        <h3>User</h3>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Website: {user.website}</p>
      </div>
      {/* <p>User ID: {router.query.id}</p> */}
      <style jsx>
        {`
          .card {
            margin: 1rem;
            flex-basis: 45%;
            padding: 1.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease;
          }

          .card:hover,
          .card:focus,
          .card:active {
            color: #0070f3;
            border-color: #0070f3;
          }

          .card h3 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }

          .card p {
            margin: 0;
            font-size: 1.25rem;
            line-height: 1.5;
          }
        `}
      </style>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/");
  const users = await res.json();

  // const paths = [{ params: { id: "1" } }, { params: { id: "2" } }];

  const paths = users.map((user) => {
    return {
      params: { id: `${user.id}` },
    };
  });

  return {
    paths,
    //true: renderiza todas los paths declarados durante el envío y si alguien intenta acceder a una ruta no declarada
    // con getStaticPaths, en vez de llevar a la página 404, nextjs mostrará una versión fallback de la página en la
    // primera solicitud a ese paths, mientras tanto nextjs generará estáticamente el html y la información que alimenta
    // a ese path y cuando este proceso se completó, la página va a ser prerenderizada con los props necesarios, y a ojos
    // del usuario el fallback va a ser reemplazado por la página completa, después de eso nextjs añade el path a la lista
    // de páginas prerenderizadas y los mismos o siguientes request al mismo path, van a servir a la página generada, así
    // como el resto de las páginas que se declararon en el arreglo paths
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  //context.params <- params es una de las propiedades de context para leer rutas
  //context.params.id <- podemos acceder a id dado que dimos ese valor en la ruta dinámica

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.id}`
  );
  const user = await res.json();

  return {
    props: {
      user,
    },
  };
}
