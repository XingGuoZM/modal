/**
 * 动态加载image的方法，添加了资源加载超时逻辑
 * @path {String} 图片地址
 * @timeout {String} 超时时长
 */
const cache = {};
function loadImage(path, timeout = 3000) {
  // 主promise
  const mainPromise = new Promise((resolve, reject) => {
    // 是否已经加载过
    const isLoad = !!cache[path];
    if (isLoad) {
      // 如果已经加载则不重复加载
      resolve({
        stat: 'loaded',
        message: `${path}已经加载过`,
      });
    } else {
      const img = new Image();
      img.src = path;

      if (img.complete) {
        // 图片已经加载过了，可以使用图片
        resolve({
          stat: 'ok',
          message: `${path}加载完成`,
        });
      } else {
        // 成功回调
        img.onload = function () {
          // 图片首次加载完成，可以使用图片
          resolve({
            stat: 'ok',
            message: `${path}加载完成`,
          });
        };

        // 图片加载失败回调
        img.onerror = function () {
          // 图片加载失败
          cache[path] = false;
          reject(new Error(`${path} 资源加载失败`));
        };
      }
      // 把加载过的图片缓存起来
      cache[path] = true;
    }
  });

  // 超时promise
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`${path} 资源加载超时`));
      // 图片未加载完，调用弹窗的逻辑
    }, timeout);
  });

  return Promise.race([mainPromise, timeoutPromise]);
}

/**
 * 加载子应用js资源
 * @param subApp 子应用数组
 */
function loadImageList(imageUrlList, timeout = 3000) {
  const promiseArr = [];
  for (let index = 0; index < imageUrlList.length; index++) {
    const imageUrl = imageUrlList[index];
    promiseArr.push(loadImage(imageUrl, timeout));
  }
  return Promise.all(promiseArr);
}

export { loadImageList };
