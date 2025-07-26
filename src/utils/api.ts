export enum USERTYPE {
  CREATE_TOKEN = 'CREATE_TOKEN',
  GET_CONTENT = 'GET_CONTENT',
}

export const URLS = {
  [USERTYPE.CREATE_TOKEN]:
    'https://swsut62sse.execute-api.ap-south-1.amazonaws.com/prod/generateToken',
  [USERTYPE.GET_CONTENT]:
    'https://tzab40im77.execute-api.ap-south-1.amazonaws.com/prod/getContent',
};
