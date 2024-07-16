export const ErrorCodes = {
  SOCKET_ERROR: 10000,
  CLIENT_VERSION_MISMATCH: 10001,
  UNKNOWN_HANDLER_ID: 10002,
  PACKET_DECODE_ERROR: 10003,
  PACKET_STRUCTURE_MISMATCH: 10004,
  MISSING_FIELDS: 10005,
  USER_NOT_FOUND: 10006,
  INVALID_PACKET: 10007,
  INVALID_SEQUENCE: 10008,
  GAME_NOT_FOUND: 10009,
  // 추가적인 에러 코드들
};

const createMultiples = (num) => {
  const array = [];
  const n = 20;
  for (let i = 1; i <= n; i++) {
    array.push(num * i);
  }
  return array;
};

function solution(arr) {
  let arr1;
  let arr2;
  let initial = true;
  let temp;
  for (let i = 0; i < arr.length - 1; i++) {
    console.log(i);
    arr1 = createMultiples(temp);
    if (initial === true) {
      arr1 = createMultiples(arr[i]);
      initial = false;
    }

    arr2 = createMultiples(arr[i + 1]);
    let j = 0;
    let k = 0;
    let index = 0;
    let isLcmFound = false;

    while (!isLcmFound) {
      if (arr1[j] === arr2[k]) {
        temp = arr1[j];
        isLcmFound = true;
      }
      if (arr1[j] > arr2[k]) {
        k++;
      } else if (arr2[k] > arr1[j]) {
        j++;
      }
    }
  }
}
