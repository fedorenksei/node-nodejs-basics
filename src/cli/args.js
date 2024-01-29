const parseArgs = () => {
  const result = [];
  let prop;
  process.argv.forEach((arg, index) => {
    if (index <= 1) return;
    if (index % 2 === 0) {
      prop = arg.replace(/^--/, "");
    } else {
      result.push(`${prop} is ${arg}`);
    }
  });
  console.log(result.join(", "));
};

parseArgs();
