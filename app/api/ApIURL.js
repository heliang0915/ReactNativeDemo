/**
 * API URL
 * User: heliang
 * Date: 2017/8/8.
 */
// const HOST="http://192.168.0.101:8080";
const HOST="http://10.10.10.153:8080";
const BASE_API="http://api.zhuishushenqi.com";
const BASE_CHAPTER_API="http://chapter2.zhuishushenqi.com";
// 获取书籍信息
const BOOK_INFO_URL=(bookId)=>`${BASE_API}/book/${bookId}`;
// 获取所有章节
const BOOK_CHAPTERS_URL=(bookId)=>`${BASE_API}/mix-atoc/${bookId}?view=chapters`;
const BOOK_CHAPTERS_CONTENT_URL=(chapterUrl)=>`${BASE_CHAPTER_API}/chapter/${encodeURIComponent(chapterUrl)}`;
const INDEX_BOOK_API=HOST+"/books";
export {INDEX_BOOK_API,BOOK_INFO_URL,BOOK_CHAPTERS_URL,BOOK_CHAPTERS_CONTENT_URL}


