import fs from 'fs';
/**
 * Dynamiclly load all webEngines
 */
class DynamicLoader {
  /**
   * return all Module(Class) in the given path
   * @param {*} dir
   * @param {*} filenameFilterCb
   * @param {*} recursive
   *
   * @return {a}
   */
  static loadModulesFromPath(dir, filenameFilterCb, recursive=true) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(filename) {
      const filepath = dir + '/' + filename;
      const stat = fs.statSync(filepath);
      if (stat && stat.isDirectory() && recursive) {
        /* Recurse into a subdirectory */
        results = results.concat(DynamicLoader.loadModulesFromPath(filepath,
            filenameFilterCb, recursive));
      } else {
        /* Is a file */
        if (filenameFilterCb(filename)) {
          results.push(require(filepath).default);
        }
      }
    });
    return results;
  }

  /**
   * return all Module(Class) in the given path
   * @param {*} dir
   * @param {*} filenameFilterCb
   * @param {*} recursive
   *
   * @return {a}
   */
  static loadAllFileList(dir, filenameFilterCb, recursive=true) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(filename) {
      const filepath = dir + '/' + filename;
      const stat = fs.statSync(filepath);
      if (stat && stat.isDirectory() && recursive) {
        /* Recurse into a subdirectory */
        results = results.concat(DynamicLoader.loadAllFileList(filepath,
            filenameFilterCb, recursive));
      } else {
        /* Is a file */
        if (filenameFilterCb(filename, filepath)) {
          results.push(
              {
                id: filename,
                path: filepath,
              });
        }
      }
    });
    return results;
  }
}

export default DynamicLoader;
