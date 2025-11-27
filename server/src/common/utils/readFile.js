export const readFileHtml = (path, callback) => {
  fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
    if (err) {
      callback(err);
      throw err;
    } else {
      callback(null, html);
    }
  });
};
