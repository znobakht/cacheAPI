export const appConf: any = {
  port: process.env.port || 3000, //determines which port used for running server
  TTLAmount: process.env.TTLAmount || 60, //determines how many seconds is TTL
};