declare module 'bcryptjs' {
  function genSalt(rounds?: number): Promise<string>;
  function hash(data: string, saltOrRounds: string | number): Promise<string>;
  function compare(data: string, encrypted: string): Promise<boolean>;
  
  export { genSalt, hash, compare };
}
