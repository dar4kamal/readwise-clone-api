export default async function <T extends Error>(
  Fn: any,
  args: any[],
  errorMessage = 'The servers have gone offline, Please Try again later.',
) {
  try {
    return await Fn.apply(this, args);
  } catch (error) {
    console.error(error);
    throw new Error(errorMessage) as T;
  }
}
