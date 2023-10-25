import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'eu-north-1_pL98Yj0Sf',
  ClientId: '36ebgeausr38nk772ck56dvnm4'
};

const userPool = new CognitoUserPool(poolData);

export default userPool;