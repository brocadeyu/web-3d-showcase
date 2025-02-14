const sleep: (t: number) => Promise<void> = (t) => new Promise((resolve) => setTimeout(resolve, t))

export { sleep }
