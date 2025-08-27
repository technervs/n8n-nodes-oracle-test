import type {
	Icon,
	ICredentialType,
	INodeProperties
} from 'n8n-workflow';

export class OracleTest implements ICredentialType {
	name = 'oracleTest';
	displayName = 'Oracle Test';
	icon: Icon = 'file:../nodes/OracleTest/oracle.svg';
	documentationUrl = 'oracleTest';

	// Configuração para usar função customizada de teste
	testedBy = 'oracleTestConnectionTest';

	properties: INodeProperties[] = [
		{
			displayName: 'Host',
			name: 'host',
			type: 'string',
			default: 'localhost',
			description: 'Oracle database host',
		},
		{
			displayName: 'Port',
			name: 'port',
			type: 'number',
			default: 1521,
			description: 'Oracle database port',
		},
		{
			displayName: 'Service Name / SID',
			name: 'sid',
			type: 'string',
			default: 'ORCL',
			description: 'Oracle service name or SID',
		},
		{
			displayName: 'User',
			name: 'user',
			type: 'string',
			default: '',
			description: 'Database username',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Database password',
		},
	];
}
