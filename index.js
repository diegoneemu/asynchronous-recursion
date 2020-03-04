/* const getSentenceFragment = (offset = 0) => {
  const pageSize = 3;
  const sentence = [..."hello world"];
  // console.log(offset, offset + pageSize);

  return {
    data: sentence.slice(offset, offset + pageSize),
    nextPage:
      offset + pageSize < sentence.length ? offset + pageSize : undefined
  };
}; */

// iterative aproach
/* const getSentence = () => {
  let offset = 0,
    aggregateData = [];

  while (true) {
    const fragment = getSentenceFragment(offset);
    aggregateData = aggregateData.concat(fragment.data);
    if (fragment.nextPage) {
      offset = fragment.nextPage;
    } else {
      break;
    }
  }
  return aggregateData;
}; */

// Recursive approach
/* const getSentenceRecursive = (offset = 0) => {
  const fragment = getSentenceFragment(offset);

  // console.log(fragment);

  if (fragment.nextPage) {
    return fragment.data.concat(getSentenceRecursive(fragment.nextPage));
  } else {
    return fragment.data;
  }
}; */

// Asynchronous recursion with callbacks
/* const getSentenceFragment = (offset, callback) => {
  const pageSize = 3;
  const sentence = [..."hello world"];
  setTimeout(
    () =>
      callback({
        data: sentence.slice(offset, offset + pageSize),
        nextPage:
          offset + pageSize < sentence.length ? offset + pageSize : undefined
      }),
    500
  );
};

const getSentence = (offset, callback) => {
  getSentenceFragment(offset, fragment => {
    if (fragment.nextPage) {
      getSentence(fragment.nextPage, nexFragment => {
        callback(fragment.data.concat(nexFragment));
      });
    } else {
      callback(fragment.data);
    }
  });
}; */

// Asynchronous recursion with promises
/* const getSentenceFragment = (offset = 0) =>
  new Promise((resolve, reject) => {
    const pageSize = 3;
    const sentence = [..."hello world"];
    setTimeout(
      () =>
        resolve({
          data: sentence.slice(offset, offset + pageSize),
          nextPage:
            offset + pageSize < sentence.length ? offset + pageSize : undefined
        }),
      500
    );
  });

const getSentence = (offset = 0) =>
  getSentenceFragment(offset).then(fragment => {
    if (fragment.nextPage) {
      return getSentence(fragment.nextPage).then(nextFragmet =>
        fragment.data.concat(nextFragmet)
      );
    } else {
      return fragment.data;
    }
  }); */

// Asynchronous recursion with async / await
const getSentenceFragment = async (offset = 0) => {
  const pageSize = 3;
  const sentence = [..."hello world"];

  await wait(500);

  return {
    data: sentence.slice(offset, offset + pageSize),
    nextPage:
      offset + pageSize < sentence.length ? offset + pageSize : undefined
  };
};

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const getSentence = async function(offset = 0) {
  const fragment = await getSentenceFragment(offset);

  if (fragment.nextPage) {
    return fragment.data.concat(await getSentence(fragment.nextPage));
  } else {
    return fragment.data;
  }
};

console.log(getSentence().then(sentence => sentence));
