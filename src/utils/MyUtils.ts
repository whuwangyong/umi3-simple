import { random } from 'lodash';

/**
 * 千位分隔符格式化大数
 * 匹配每三位数字的位置，然后用逗号分隔
 * @param number
 * @returns
 */
export function formatBigNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 生成随机日期时间
 * @param start 起止日期
 * @param end
 * @returns
 */
export function getRandomDateTime(start: string, end: string) {
  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();
  const randomDate = Math.random() * (endDate - startDate) + startDate;

  const randomHour = Math.floor(Math.random() * 24); // 随机小时（0-23）
  const randomMinute = Math.floor(Math.random() * 60); // 随机分钟（0-59）
  const randomSecond = Math.floor(Math.random() * 60); // 随机秒钟（0-59）
  const randomMillisecond = Math.floor(Math.random() * 1000); // 随机毫秒（0-999）

  const randomDateTime = new Date(randomDate);
  randomDateTime.setHours(randomHour, randomMinute, randomSecond, randomMillisecond);

  return new Date(randomDateTime);
}

/**
 * 生成随机长度的字符串
 * @param length
 * @returns
 */
export function getRandomString(length: number) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = random(0, charset.length - 1);
    randomString += charset[randomIndex];
  }
  return randomString;
}
