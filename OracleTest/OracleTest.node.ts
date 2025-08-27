import type {
	ICredentialDataDecryptedObject,
	ICredentialTestFunctions,
	ICredentialsDecrypted,
	IExecuteFunctions,
	INodeCredentialTestResult,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

export class OracleTest implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Oracle Test',
		name: 'oracleTest',
		icon: 'file:oracle.svg',
		group: ['database'],
		version: 1,
		description: 'Simple Oracle node for testing credential functionality',
		defaults: {
			name: 'Oracle Test',
		},
	inputs: [NodeConnectionType.Main],
	outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'oracleTest',
				required: true,
				testedBy: 'oracleTestConnectionTest',
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Test Connection',
						value: 'testConnection',
						description: 'Test the Oracle database connection',
						action: 'Test the Oracle database connection',
					},
				],
				default: 'testConnection',
			},
		],
	};

	methods = {
		credentialTest: {
			async oracleTestConnectionTest(
				this: ICredentialTestFunctions,
				credential: ICredentialsDecrypted<ICredentialDataDecryptedObject>,
			): Promise<INodeCredentialTestResult> {
				const credentials = credential.data;

				try {
					// Simula uma conexão Oracle (sem dependências externas)
					// Em um caso real, aqui seria feita a conexão com oracledb

					// Validação básica dos campos obrigatórios
					if (!credentials?.host || !credentials?.user || !credentials?.password) {
						return {
							status: 'Error',
							message: 'Host, User and Password are required fields',
						};
					}

					// Simula delay de conexão
					await new Promise(resolve => setTimeout(resolve, 1000));

					// Simula sucesso da conexão
					return {
						status: 'OK',
						message: `Successfully connected to Oracle database at ${credentials.host}:${credentials.port || 1521}/${credentials.sid}`,
					};

				} catch (error) {
					return {
						status: 'Error',
						message: `Connection failed: ${(error as Error).message}`,
					};
				}
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const credentials = await this.getCredentials('oracleTest');

			returnData.push({
				json: {
					message: 'Oracle Test node executed successfully',
					credentials_host: credentials.host,
					timestamp: new Date().toISOString(),
				},
				pairedItem: { item: i },
			});
		}

		return [returnData];
	}
}
