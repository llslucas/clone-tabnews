import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseInfo />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div> Última atualização: {updatedAtText}</div>;
}

function DatabaseInfo() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  return (
    <div>
      <p>Informações do banco de dados:</p>
      {isLoading ? (
        "Carregando..."
      ) : (
        <>
          <p> Versão: {data.dependencies.database.version} </p>
          <p>
            Limite de conexões: {data.dependencies.database.max_connections}
          </p>
          <p>
            Conexões Abertas: {data.dependencies.database.opened_connections}
          </p>
        </>
      )}
    </div>
  );
}
