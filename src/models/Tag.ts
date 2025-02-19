export default class Tag {
  constructor(
    public name: string = "",
    public color: string = ""
  ) {}
}

export function isTag(obj: unknown): obj is Tag {
  return (<Tag>obj).name != undefined && (<Tag>obj).color != undefined;
}