import { Credentials, executeSQL } from '@carto/react-api';

export async function getFormulaModelData({
  credentials,
  opts = {},
}: {
  credentials: Credentials;
  opts: any;
}) {
  const query = `TYPE YOUR QUERY HERE`;

  const data = await executeSQL({ credentials, query, opts });
  return data;
}
