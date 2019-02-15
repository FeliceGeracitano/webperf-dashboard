export class Expression {
  query: any;
  exp(fn: any): any;
  field(name: any): any;
  tag(name: any): any;
  value(value: any): any;
}
export const FieldType: {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  BOOLEAN: number;
  FLOAT: number;
  INTEGER: number;
  STRING: number;
};
export class InfluxDB {
  constructor(options: any);
  schema: any;
  pool: any;
  options: any;
  alterRetentionPolicy(name: any, options: any): any;
  createContinuousQuery(name: any, query: any, database: any): any;
  createDatabase(databaseName: any): any;
  createRetentionPolicy(name: any, options: any): any;
  createUser(username: any, password: any, admin: any): any;
  defaultDB(): any;
  dropContinuousQuery(name: any, database: any): any;
  dropDatabase(databaseName: any): any;
  dropMeasurement(measurement: any, database: any): any;
  dropRetentionPolicy(name: any, database: any): any;
  dropSeries(options: any): any;
  dropUser(username: any): any;
  getDatabaseNames(): any;
  getMeasurements(database: any): any;
  getQueryOpts(params: any, method: any): any;
  getSeries(options: any): any;
  getUsers(): any;
  grantAdminPrivilege(username: any): any;
  grantPrivilege(username: any, privilege: any, database: any): any;
  ping(timeout: any): any;
  query(query: any, options: any): any;
  queryRaw(query: any, options: any): any;
  revokeAdminPrivilege(username: any): any;
  revokePrivilege(username: any, privilege: any, database: any): any;
  setPassword(username: any, password: any): any;
  showContinousQueries(database: any): any;
  showRetentionPolicies(database: any): any;
  writeMeasurement(measurement: any, points: any, options: any): any;
  writePoints(points: any, options: any): any;
}
export class Measurement {
  parts: any;
  db(db: any): any;
  name(name: any): any;
  policy(retentionPolicy: any): any;
}
export const Precision: {
  Hours: string;
  Microseconds: string;
  Milliseconds: string;
  Minutes: string;
  Nanoseconds: string;
  Seconds: string;
};
export class Raw {
  constructor(value: any);
  value: any;
  getValue(): any;
}
export function ResultError(message: any): any;
export namespace ResultError {
  function captureStackTrace(p0: any, p1: any): any;
  const stackTraceLimit: number;
}
export namespace escape {
  function measurement(p0: any): any;
  function quoted(p0: any): any;
  function stringLit(p0: any): any;
  function tag(p0: any): any;
}
export function parseMeasurement(q: any): any;
export function parseWhere(q: any): any;
export function toNanoDate(timestamp: any): any;
