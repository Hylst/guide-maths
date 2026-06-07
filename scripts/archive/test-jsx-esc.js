const { transformSync } = require('esbuild');
const res = transformSync('let a = <p>$3 \\times 3$</p>;', { loader: 'jsx' });
console.log(res.code);
