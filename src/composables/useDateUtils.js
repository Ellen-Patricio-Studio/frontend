export function useDateUtils() {
  const formatarParaDataBR = (dateString) => {
    if (!dateString) return "";

    // 1. Caso a data venha com o horário (ex: "2026-05-05 09:00:00")
    // Pegamos apenas a primeira parte antes do espaço
    const apenasData = dateString.split(" ")[0];

    // 2. Fazemos o split pelo hífen
    const partes = apenasData.split("-");

    // 3. Verificamos se temos as 3 partes (ano, mes, dia)
    if (partes.length !== 3) return dateString; // Retorna original se não conseguir processar

    const [year, month, day] = partes;

    // 4. Retorna no formato dd-mm-yyyy
    return `${day} / ${month} / ${year}`;
  };

  return { formatarParaDataBR };
}