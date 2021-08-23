/**
 *
 *  Hat tip - sirrobert and richardgill
 * https://github.com/tailwindlabs/tailwindcss/issues/1010#issuecomment-841721415
 *
 * https://github.com/richardgill/tailwind-override/blob/master/packages/tailwind-override/src/core.ts
 *
 * @param  {...string[]} classStrings
 * @returns
 */

export function mergeTailwindClasses(...classStrings) {
  let classHash = {};
  classStrings.map(str => {
    str &&
      str.split(/\s+/g).map(token => (classHash[token.split("-")[0]] = token));
  });
  return Object.values(classHash).sort().join(" ");
}
