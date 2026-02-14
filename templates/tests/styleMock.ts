const styles = new Proxy<Record<string, string>>(
  {},
  {
    get: (_target, prop: string | symbol): string => String(prop)
  }
);

export default styles;
